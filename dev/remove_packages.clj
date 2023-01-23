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
   [juxt.site.resource-group :as pkg]
   [clojure.edn :as edn]))

(def READERS
  {'juxt.pprint (fn [x] (with-out-str (pprint x)))
   'juxt.json (fn [x] (json/write-value-as-string x))})

(def NORMALIZE_AUTH_SERVER {#{"https://example.org" "https://core.example.org"} "https://auth.example.org"})
(def NORMALIZE_RESOURCE_SERVER {#{"https://auth.example.org" "https://core.example.org"} "https://auth.example.org"
                                "https://example.org" "https://data.example.org"})

(def PACKAGES_IN_SCOPE
  {"juxt/site/openid" NORMALIZE_AUTH_SERVER
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

(defn generate-installer-files []
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
                destfile (io/file "installers" (str destpath ".edn"))]]
    (.mkdirs (.getParentFile destfile))
    (spit destfile (rewrite-uris (slurp sourcefile) uri-map))))

(defn generate-resource-groups []
  (for [dir (.listFiles (io/file "packages/juxt/site"))
        :when (.isDirectory dir)
        :let [index-file (io/file dir "index.edn")]
        :when (.exists index-file)
        :let [index (edn/read-string {:readers READERS} (slurp index-file))
              uri-map (get PACKAGES_IN_SCOPE (str "juxt/site/" (.getName dir)))]
        :when uri-map
        :let [uri-map (pkg/normalize-uri-map uri-map)]]

    [(.getName dir)
     (->
      (select-keys index [:juxt.site/description :juxt.site/resources])
      (update :juxt.site/resources (fn [uris] (map-uris uris uri-map))))
     ]))

(defn save-resource-groups []
  (set! *print-namespace-maps* false)
  (spit
   "resource-groups-openid.edn"
   (with-out-str
     (pprint (into {} (generate-resource-groups))))))

;;(save-resource-groups)
