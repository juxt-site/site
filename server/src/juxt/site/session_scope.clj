;; Copyright © 2022, JUXT LTD.

(ns juxt.site.session-scope
  (:require
   [ring.middleware.cookies :refer [cookies-request]]
   [xtdb.api :as xt]
   [juxt.site.repl :as repl]
   [juxt.site.xt-util :as xtu]
   [clojure.tools.logging :as log]))

(defn lookup-session-details [db session-token-id!]
  (let [lookup #(xtu/entity db %)
        session-details
        (first
         (xt/q db '{:find [(pull session-token [*])
                           (pull session [*])]
                    :keys [juxt.site/session-token
                           juxt.site/session]
                    :where
                    [[session-token :juxt.site/type "https://meta.juxt.site/types/session-token"]
                     [session-token :juxt.site/session-token token-id]
                     [session-token :juxt.site/session session]]
                    :in [token-id]}
               session-token-id!))
        subject (some-> session-details :juxt.site/session :juxt.site/subject lookup)]

    (cond-> session-details
      ;; Since subject is common and special, we promote it to the top-level
      ;; context. However, it is possible to have a session without having
      ;; established a subject (for example, while authenticating).
      subject (assoc :juxt.site/subject-uri (:xt/id subject)
                     :juxt.site/subject subject))))

(defn wrap-session-scope [h]
  (fn [{db :juxt.site/db,
        uri :juxt.site/uri,
        resource :juxt.site/resource,
        :as req}]

    (let [scope-id (:juxt.site/session-scope resource)

          scope (when scope-id (xtu/entity db scope-id))

          cookie-name (when scope (:juxt.site/cookie-name scope))

          session-token-id!
          (when cookie-name
            (-> (assoc req :headers (get req :ring.request/headers))
                cookies-request
                :cookies (get cookie-name) :value))

          _ (when session-token-id! (log/debugf "session-token-id is %s" session-token-id!))

          session-details
          (when session-token-id!
            (lookup-session-details db session-token-id!))

          _ (when session-details
              (log/debugf "Session details for %s is %s" uri (pr-str session-details)))]

      (h (cond-> req
           scope (assoc :juxt.site/session-scope scope)
           session-token-id! (assoc :juxt.site/session-token-id! session-token-id!)
           session-details (into session-details))))))
