;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.local-files-util
  (:require
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [clojure.pprint :refer [pprint]]
   [clojure.java.io :as io]
   [jsonista.core :as json])
  )

(def READERS
  {'juxt.pprint (fn [x] (with-out-str (pprint x)))
   'juxt.json (fn [x] (json/write-value-as-string x))})

(defn unified-installer-files []
  (let [root (io/file "installers")]
    (for [installer-file (file-seq root)
          :when (.isFile installer-file)
          :let [filepath (.toPath installer-file)
                relpath (.toString (.relativize (.toPath root) filepath))
                [_ auth+path1 path2] (re-matches #"(.+?)(?:_index)?\.edn" relpath)
                url (str "https://" auth+path1 path2)]]
      {:url url
       :filepath (.toString filepath)
       :relpath relpath
       :auth-path (str auth+path1 path2)
       ;; TODO: Try using a delay for performance, but measure
       :content (edn/read-string {:readers READERS} (slurp installer-file))})))

(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  []
  (into {} (map (juxt :url :content) (unified-installer-files))))

#_(sort (keys (unified-installer-map)))

#_(= unified-installer-map1 (unified-installer-map))

#_(def unified-installer-map1 (unified-installer-map))

(defn install-resource-groups!
  ([xt-node names uri-map parameter-map]
   (assert xt-node)
   (let [graph (install/map-uris (unified-installer-map) uri-map)
         groups (edn/read-string (slurp (io/file "installers/groups.edn")))]
     (doall
      (for [n names
            :let [resources (some-> groups (get n) :juxt.site/resources)]]
        (install/converge!
         xt-node
         (install/map-uris resources uri-map)
         graph parameter-map))))))
