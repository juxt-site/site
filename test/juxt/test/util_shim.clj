;; Copyright © 2023, JUXT LTD.

(ns juxt.test.util-shim
  (:require
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]
   [jsonista.core :as json]
   [juxt.site.handler :as h]
   [juxt.site.main :as main]
   [juxt.site.package :as pkg]
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

(defn install-resource-with-action! [subject action document]
  (pkg/call-action-with-init-data!
   *xt-node*
   {:juxt.site/subject-id subject
    :juxt.site/action-id action
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

;; These are all the resources in the packages/ directory:
(defn map-uris
  [o uri-map]
  (let [uri-map (pkg/normalize-uri-map uri-map)]
    (postwalk
     (fn [x]
       (cond-> x
         (string? x)
         (str/replace
          #"(https://.*?example.org)(.*)"
          (fn [[_ host path]] (str (get uri-map host host) path)))))
     o)))

(def READERS
  {'juxt.pprint (fn [x] (with-out-str (pprint x)))
   'juxt.json (fn [x] (json/write-value-as-string x))})

(defn index [pkg-name]
  (let [dir (io/file "packages" pkg-name)
        index-file (io/file dir "index.edn")]
    (edn/read-string {:readers READERS} (slurp index-file))))

(def NORMALIZE_AUTH_SERVER {#{"https://example.org" "https://core.example.org"} "https://auth.example.org"})
(def NORMALIZE_RESOURCE_SERVER {#{"https://auth.example.org" "https://core.example.org"} "https://auth.example.org"
                                "https://example.org" "https://data.example.org"})

(def PACKAGES_IN_SCOPE
  {
   "juxt/site/bootstrap" NORMALIZE_AUTH_SERVER
   "juxt/site/example-users" NORMALIZE_AUTH_SERVER
   "juxt/site/hospital-demo" NORMALIZE_RESOURCE_SERVER
   "juxt/site/login-form" NORMALIZE_AUTH_SERVER
   "juxt/site/oauth-authorization-server" NORMALIZE_AUTH_SERVER
   "juxt/site/openapi" NORMALIZE_AUTH_SERVER
   "juxt/site/password-based-user-identity" NORMALIZE_AUTH_SERVER
   "juxt/site/protection-spaces" NORMALIZE_AUTH_SERVER
   "juxt/site/roles" NORMALIZE_AUTH_SERVER
   "juxt/site/sessions" NORMALIZE_AUTH_SERVER
   "juxt/site/system-api" NORMALIZE_RESOURCE_SERVER
   "juxt/site/user-model" NORMALIZE_AUTH_SERVER
   "juxt/site/whoami" NORMALIZE_RESOURCE_SERVER
   })

(defn packages-resource-ids [& pkg-names]
  (mapcat
   (fn [pkg-name]
     (let [index (index pkg-name)
           resources (:juxt.site/resources index)]
       resources))
   pkg-names))

(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  []
  (into
   {}
   (let [metadata {}]
     (for [[n uri-map] PACKAGES_IN_SCOPE
           :let [root (io/file "packages" n)]
           host-root (.listFiles (io/file root "installers"))
           f (file-seq host-root)
           :let [path (.toPath f)
                 relpath (.toString (.relativize (.toPath host-root) path))
                 [_ urlpath] (re-matches #"(.+)\.edn" relpath)]
           :when (and (.isFile f) urlpath)
           :let [urlpath (if-let [[_ stem] (re-matches #"(.*/)\{index\}" urlpath)]
                           stem
                           urlpath)]]
       (map-uris
        [(format "https://%s/%s" (.getName host-root) urlpath)
         (try
           (->
            (edn/read-string {:readers READERS} (slurp f))
            (update-in [:install :juxt.site/input] merge metadata {:juxt.site.package/source (str f)})
            (assoc :juxt.site.package/source (str f)))
           (catch Exception e
             (throw (ex-info (format "Failed to load %s" f) {:file f} e))))]
        uri-map)))))

(def AUTH_SERVER {"https://auth.example.org" "https://auth.example.test"})

(def RESOURCE_SERVER {"https://auth.example.org" "https://auth.example.test"
                      "https://data.example.org" "https://data.example.test"})

(defn install-packages! [names uri-map]
  (let [graph (map-uris (unified-installer-map) uri-map)]
    (doall
     (for [n names]
       (pkg/converge!
        *xt-node*
        (map-uris
         (map-uris
          (packages-resource-ids n)
          (or (get PACKAGES_IN_SCOPE n)
              (throw (ex-info "Package isn't in scope" {:package n}))))
         uri-map)
        graph {})))))

(with-xt
  (install-packages!
   ["juxt/site/bootstrap"]
   {"https://auth.example.org" "https://auth.hospital.com"})
  )

(comment
  (with-xt
    (install-packages! ["juxt/site/bootstrap"] AUTH_SERVER)))

(comment
  (let [graph (unified-installer-map)]
    (with-xt

      ;; Bootstrap
      (pkg/converge! *xt-node*
                     (map-uris
                      (packages-resource-ids "juxt/site/bootstrap")
                      NORMALIZE_AUTH_SERVER) graph {})

      (pkg/converge!
       *xt-node*
       (map-uris
        (packages-resource-ids
         "juxt/site/roles"
         "juxt/site/protection-spaces"
         "juxt/site/openapi"

         "juxt/site/sessions"
         "juxt/site/oauth-authorization-server"
         "juxt/site/login-form"
         "juxt/site/user-model"
         "juxt/site/password-based-user-identity"
         "juxt/site/example-users"
         )
        NORMALIZE_AUTH_SERVER)
       graph
       {})

      )))
