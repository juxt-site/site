;; Copyright © 2023, JUXT LTD.

(ns juxt.test.util
  (:require
   [clojure.pprint :refer [pprint]]
   [juxt.site.handler :as h]
   [juxt.site.main :as main]
   [juxt.site.local-files-util :as local]
   [juxt.site.install :as install]
   [juxt.site.installer :as installer]
   [xtdb.api :as xt])
  (:import
   (xtdb.api IXtdb)))

(def ^:dynamic *opts* {})
(def ^:dynamic ^IXtdb *xt-node*)
(def ^:dynamic *handler*)

(defmacro with-xt [& body]
  `(with-open [node# (xt/start-node *opts*)]
     (binding [*xt-node* node#]
       ~@body)))

(defn xt-fixture [f]
  (with-xt (f)))

(defmacro with-system-xt [& body]
  `(with-open [node# (xt/start-node *opts*)]
     (binding [*xt-node* node#
               main/*system* {:juxt.site.db/xt-node node#}]
       ~@body)))

(defn system-xt-fixture [f]
  (with-system-xt (f)))

(defn submit-and-await! [transactions]
  (->>
   (xt/submit-tx *xt-node* transactions)
   (xt/await-tx *xt-node*)))

(defn make-handler [opts]
  ((apply comp
          (remove
           #{h/wrap-healthcheck
             h/wrap-ring-1-adapter}
           (h/make-pipeline opts)))
   identity))

(defmacro with-handler [& body]
  `(binding [*handler* (make-handler {:juxt.site/xt-node *xt-node*})]
     ~@body))

(defn handler-fixture [f]
  (with-handler (f)))

(defn install-resource-with-operation! [subject operation document]
  (installer/call-operation-with-init-data!
   *xt-node*
   {:juxt.site/subject-id subject
    :juxt.site/operation-id operation
    :juxt.site/input document}))

(defmacro with-fixtures [& body]
  `((clojure.test/join-fixtures (-> *ns* meta :clojure.test/each-fixtures))
    (fn [] ~@body)))

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
  `(let [dlg# *handler*
         token# ~token]
     (when-not token#
       (throw (ex-info "with-session-token called without a valid session token" {})))
     (binding [*handler*
               (fn [req#]
                 (dlg# (assoc-session-token req# token#)))]
       ~@body)))

(defn assoc-bearer-token [req token]
  (update-in
   req
   [:ring.request/headers "authorization"]
   (fn [existing-value]
     (let [new-value (format "Bearer %s" token)]
       (when (and existing-value (not= existing-value new-value))
         (throw
          (ex-info
           "To avoid confusion when debugging, assoc-bearer-token will not override an already set authorization header"
           {:new-value {"authorization" new-value}
            :existing-value {"authorization" existing-value}})))
       new-value))))

(defmacro with-bearer-token [token & body]
  `(let [dlg# *handler*
         token# ~token]
     (when-not token#
       (throw (ex-info "with-bearer-token called without a bearer token" {})))
     (binding [*handler*
               (fn [req#]
                 (dlg# (assoc-bearer-token req# token#)))]
       ~@body)))

(defn install-resource-groups!
  [names uri-map parameter-map]
  (local/install-resource-groups! *xt-node* names uri-map parameter-map))

(defn converge! [resources uri-map parameter-map]
  (let [graph (install/map-uris (local/unified-installer-map) uri-map)]
    (install/converge! *xt-node* resources graph parameter-map)))

;; This are the uri-maps used by the tests

(def AUTH_SERVER {"https://auth.example.org" "https://auth.example.test"})

(def RESOURCE_SERVER {"https://auth.example.org" "https://auth.example.test"
                      "https://data.example.org" "https://data.example.test"})
