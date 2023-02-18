;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.local-files-util
  (:require
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [clojure.pprint :refer [pprint]]
   [clojure.java.io :as io]
   [clojure.walk :refer [postwalk]]
   [clojure.string :as str]))

(def READERS
  {'juxt.pprint (fn [x] (install/->Pretty x))
   'juxt.template (fn [s] (install/->Template s))})

(defn unified-installer-files [uri-map]
  (let [root (io/file "installers")]
    (for [installer-file (file-seq root)
          :when (.isFile installer-file)
          :let [filepath (.toPath installer-file)
                relpath (.toString (.relativize (.toPath root) filepath))
                [_ auth+path1 path2] (re-matches #"(.+?)(?:_index)?\.edn" relpath)
                url (str "https://" auth+path1 path2)
                url (install/uri-map-replace url uri-map)]]
      {:url url
       :filepath (.toString filepath)
       :relpath relpath
       :auth-path (str auth+path1 path2)
       ;; TODO: Try using a delay for performance, but measure
       :content (->>
                 (edn/read-string {:readers READERS} (slurp installer-file))
                 (postwalk (install/make-uri-map-replace-walk-fn uri-map)))})))

(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  [uri-map]
  (into {} (map (juxt :url :content) (unified-installer-files uri-map))))

(defn install-resource-groups!
  ([xt-node names uri-map parameter-map]
   (assert xt-node)
   (let [graph (unified-installer-map uri-map)
         groups (edn/read-string (slurp (io/file "installers/groups.edn")))]
     (doall
      (for [n names
            :let [resources (some-> groups (get n) :juxt.site/resources)]]
        (install/converge!
         xt-node
         (install/map-uris resources uri-map)
         graph parameter-map))))))
