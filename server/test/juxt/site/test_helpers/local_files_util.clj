;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.local-files-util
  (:require
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [juxt.site.install.common-install-util :as ciu]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [clojure.java.io :as io]
   [juxt.site.operations :as operations]
   [juxt.site.xt-util :as xtu]))

(defn get-root-dir []
  ;; Just assume where we're calling the tests from for now, but allow
  ;; an override in future.
  (io/file ".."))

(defn get-installers-dir []
  (io/file (get-root-dir) "installers"))

(defn bundles [dir]
  (edn/read-string (slurp (io/file dir "installers/bundles.edn"))))

(defn spec->installer-seq [spec uri-map bundles graph]
  (let [[bundle-name params] (if (vector? spec) spec [spec {}])
        bundle (get bundles bundle-name)
        _ (when-not bundle (throw (ex-info (format "Bundle not found: %s" bundle-name) {:bundle bundle-name})))
        resources (some-> bundles
                          (get bundle-name)
                          :juxt.site/installers
                          (install/map-uris uri-map))]
    (->>
     (ciu/installer-seq graph params resources)
     (map :juxt.site/init-data))))

(defn graph [dir uri-map]
  (ciu/unified-installer-map dir uri-map))

(defn install-bundles*
  [specs uri-map]
  (assert *xt-node*)
  (let [graph (graph (get-installers-dir) uri-map)
        bundles (bundles (get-root-dir))]
    (mapv
     (fn [spec]
       (let [installer-seq (spec->installer-seq spec uri-map bundles graph)
             db (xtu/db *xt-node*)
             tx-ops (operations/installer-seq->tx-ops nil db installer-seq)]
         tx-ops
         ))
     specs
     )))

(defn install-bundles!
  [specs uri-map]
  (assert *xt-node*)
  (let [graph (graph (get-installers-dir) uri-map)
        bundles (bundles (get-root-dir))]
    (mapv
     (fn [spec]
       (let [installer-seq (spec->installer-seq spec uri-map bundles graph)
             db (xtu/db *xt-node*)
             tx-ops (operations/installer-seq->tx-ops nil db installer-seq)]
         (operations/apply-ops! *xt-node* tx-ops)))
     specs)))
