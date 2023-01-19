;; Copyright © 2023, JUXT LTD.

(ns remove-packages
  (:require
   [rewrite-clj.node :as n]
   [rewrite-clj.zip :as z]
   [clojure.string :as str]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [jsonista.core :as json]
   [clojure.walk :refer [postwalk]]
   [juxt.site.package :as pkg]))

(def READERS
  {'juxt.pprint (fn [x] (with-out-str (pprint x)))
   'juxt.json (fn [x] (json/write-value-as-string x))})

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

(defn replace-string-uris [s uri-map]
  (str/replace
   s
   #"(https://.*?example.org)(.*)"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn map-uris
  [o uri-map]
  (postwalk
   (fn [x]
     (cond-> x
       (string? x)
       (replace-string-uris uri-map)))
   o))

(defn rewrite-uris [source uri-map]
    (-> (z/of-string source)
        #_(z/find z/next (fn [zloc] (and
                                     (= :token (n/tag (z/node zloc)))
                                     (string? (n/sexpr (z/node zloc))))))

        (z/postwalk
         (fn [zloc] (and
                     (= :token (n/tag (z/node zloc)))
                     (string? (n/sexpr (z/node zloc)))))
         (fn [loc]
           (z/edit loc (fn [s]
                         (str/replace
                          s
                          #"(https://.*?example.org)(.*)"
                          (fn [[_ host path]] (str (get uri-map host host) path)))))))
        z/root
        n/string))

#_(do
  (rewrite-uris
   (slurp "packages/juxt/site/password-based-user-identity/installers/example.org/actions/register-password-based-user-identity.edn")
   (pkg/normalize-uri-map NORMALIZE_AUTH_SERVER)))

(doseq [[n uri-map] PACKAGES_IN_SCOPE
        :let [uri-map (pkg/normalize-uri-map uri-map)
              root (io/file "packages" n)]
        host-root (.listFiles (io/file root "installers"))
        sourcefile (file-seq host-root)
        :let [path (.toPath sourcefile)
              relpath (.toString (.relativize (.toPath host-root) path))
              [_ urlpath] (re-matches #"(.+)\.edn" relpath)]
        :when (and (.isFile sourcefile) urlpath)
        :let [urlpath (if-let [[_ stem] (re-matches #"(.*/)\{index\}" urlpath)]
                        stem
                        urlpath)
              id (map-uris (format "https://%s/%s" (.getName host-root) urlpath) uri-map)
              [_ destpath] (re-matches #"https://(.*)" id)
              destfile (io/file "installers" (str destpath ".edn"))
              ]]
  #_[id destfile]
  (.mkdirs (.getParentFile destfile))
  (spit destfile (rewrite-uris (slurp sourcefile) uri-map)))
