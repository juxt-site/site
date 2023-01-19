;; Copyright © 2023, JUXT LTD.

(ns juxt.test.util
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
  (let [root (io/file "installers")]
    (into
     {}
     (for [installer-file (file-seq root)
           :when (.isFile installer-file)
           :let [filepath (.toPath installer-file)
                 relpath (.toString (.relativize (.toPath root) filepath))
                 [_ auth+path] (re-matches #"(.+)\.edn" relpath)
                 url (str "https://" auth+path)]]
       [url (edn/read-string {:readers READERS} (slurp installer-file))]))))

(defn install-packages! [names uri-map]
  (let [graph (map-uris (unified-installer-map) uri-map)
        groups (edn/read-string (slurp (io/file "installers/groups.edn")))]
    (doall
     (for [n names
           :let [resources (some-> groups (get n) :juxt.site/resources)]]
       (pkg/converge!
          *xt-node*
          (map-uris resources uri-map)
          graph {})))))

(def AUTH_SERVER {"https://auth.example.org" "https://auth.example.test"})

(def RESOURCE_SERVER {"https://auth.example.org" "https://auth.example.test"
                      "https://data.example.org" "https://data.example.test"})
