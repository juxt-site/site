;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.local-files-util
  (:require
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [juxt.site.install.common-install-util :as ciu]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [clojure.java.io :as io]
   [juxt.site.operations :as operations]
   [xtdb.api :as xt]))

(defn get-root-dir []
  ;; Just assume where we're calling the tests from for now, but allow
  ;; an override in future.
  (io/file ".."))

(defn install-bundles!
  [specs uri-map]
  (assert *xt-node*)
  (let [root-dir (get-root-dir)
        graph (ciu/unified-installer-map (io/file root-dir "installers") uri-map)
        bundles (edn/read-string (slurp (io/file root-dir "installers/bundles.edn")))]
    (vec
     (for [spec specs
           :let [[bundle-name params] (if (vector? spec) spec [spec {}])
                 bundle (get bundles bundle-name)
                 _ (when-not bundle (throw (ex-info (format "Bundle not found: %s" bundle-name) {:bundle bundle-name})))
                 resources (some-> bundles
                                   (get bundle-name)
                                   :juxt.site/installers
                                   (install/map-uris uri-map))]]

       (let [db (xt/db *xt-node*)
             installer-seq (ciu/installer-seq graph params resources)
             tx-ops (operations/installer-seq->tx-ops db installer-seq)]

         (operations/apply-ops! *xt-node* tx-ops))))))
