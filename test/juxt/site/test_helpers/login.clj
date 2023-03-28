;; Copyright © 2022, JUXT LTD.

(ns juxt.site.test-helpers.login
  (:require
   [clojure.java.io :as io]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [juxt.site.test-helpers.handler :refer [*handler*]]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]))

(defn login-with-form!
  "Return a session id (or nil) given a map of fields."
  [username password]
  (let [form (codec/form-encode {"username" username "password" password})
        body (.getBytes form)
        req {:juxt.site/uri "https://auth.example.test/login-with-form"
             :ring.request/method :post
             :ring.request/headers
             {"content-length" (str (count body))
              "content-type" "application/x-www-form-urlencoded"}
             :ring.request/body (io/input-stream body)}
        response (*handler* req)
        {:strs [set-cookie]} (:ring.response/headers response)
        [_ token] (when set-cookie (re-matches #"[a-z]+=(.*?);.*" set-cookie))]
    (when-not token
      (throw
       (ex-info
        (format "Login failed: %s" (String. (:ring.response/body response)))
        {:username username
         :response response})))
    token))

(defn lookup-session-details [session-token]
  (when session-token
    (let [db (xt/db *xt-node*)]
      (first
       (xt/q db '{:find [(pull session [*]) (pull scope [*])]
                  :keys [session scope]
                  :where [[e :juxt.site/type "https://meta.juxt.site/types/session-token"]
                          [e :juxt.site/session-token session-token]
                          [e :juxt.site/session session]
                          [session :juxt.site/session-scope scope]]
                  :in [session-token]}
             session-token)))))

(defn assoc-session-token [req session-token]
  (let [{:keys [scope]}
        (lookup-session-details session-token)
        {:juxt.site/keys [cookie-name]} scope]
    (when-not cookie-name
      (throw (ex-info "No cookie name determined for session-token" {:session-token session-token})))
    (assoc-in req [:ring.request/headers "cookie"] (format "%s=%s" cookie-name session-token))))

(defmacro with-session-token [token & body]
  (assert token)
  `(let [dlg# *handler*
         token# ~token]
     (when-not token#
       (throw (ex-info "with-session-token called without a valid session token" {})))
     (binding [*handler*
               (fn [req#]
                 (dlg# (assoc-session-token req# token#)))]
       ~@body)))
