;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.local-files-util
  (:require
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [clojure.pprint :refer [pprint]]
   [clojure.java.io :as io]
   [juxt.site.install.common-install-util :as ciu]))

(defn install-resource-groups!
  ([names uri-map parameter-map]
   (let [graph (ciu/unified-installer-map (io/file "installers") uri-map)
         groups (edn/read-string (slurp (io/file "installers/groups.edn")))]
     (doseq [n names
             :let [resources (some-> groups (get n) :juxt.site/resources)]]
       (install/converge!
        *xt-node*
        (install/map-uris resources uri-map)
        graph parameter-map)))))

(defn converge! [resources uri-map parameter-map]
  (let [graph (ciu/unified-installer-map (io/file "installers") uri-map)]
    (install/converge! *xt-node* resources graph parameter-map)))
