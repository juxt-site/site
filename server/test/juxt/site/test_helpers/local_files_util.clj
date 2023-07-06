;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.local-files-util
  (:require
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [clojure.pprint :refer [pprint]]
   [clojure.java.io :as io]
   [juxt.site.install.common-install-util :as ciu]))

(defn get-root-dir []
  ;; Just assume where we're calling the tests from for now, but allow
  ;; an override in future.
  (io/file ".."))

(defn install-bundles!
  ([names uri-map parameter-map]
   (let [root-dir (get-root-dir)
         graph (ciu/unified-installer-map (io/file root-dir "installers") uri-map)
         bundles (edn/read-string (slurp (io/file root-dir "installers/bundles.edn")))]
     (doseq [n names
             :let [bundle (get bundles n)
                   _ (when-not bundle (throw (ex-info (format "Bundle not found: %s" n) {:bundle n})))
                   resources (some-> bundles (get n) :juxt.site/installers)]]
       (install/converge!
        *xt-node*
        (install/map-uris resources uri-map)
        graph parameter-map)))))

(defn converge! [resources uri-map parameter-map]
  (let [graph (ciu/unified-installer-map (io/file (get-root-dir) "installers") uri-map)]
    (install/converge! *xt-node* resources graph parameter-map)))
