;; Copyright © 2023, JUXT LTD.

(ns juxt.site.events-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.operations :as operations]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.install.common-install-util :as ciu]
   [juxt.site.test-helpers.install :as install]
   [xtdb.api :as xt]
   [clojure.edn :as edn]
   [clojure.java.io :as io]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest events-test
  (let [bundle-name "juxt/site/bootstrap"
        root-dir (io/file "..")
        uri-map RESOURCE_SERVER
        graph (ciu/unified-installer-map (io/file root-dir "installers") uri-map)
        bundles (edn/read-string (slurp (io/file root-dir "installers/bundles.edn")))
        bundle (get bundles bundle-name)
        _ (when-not bundle (throw (ex-info (format "Bundle not found: %s" bundle-name) {:bundle bundle-name})))
        resources (some-> bundles (get bundle-name) :juxt.site/installers)
        resources (install/map-uris resources uri-map)
        parameter-map {}
        installer-seq (ciu/installer-seq graph parameter-map resources)
        db (xt/db *xt-node*)
        tx-ops (operations/bundle->tx-ops nil db {:name nil :installers installer-seq})
        new-db (operations/apply-ops! *xt-node* tx-ops)
        events (->> (xt/q
                     new-db
                     '{:find [(pull e [*])]
                       :where [[e :juxt.site/type "https://meta.juxt.site/types/event"]]})
                    (map first)
                    (sort-by (juxt :xtdb.api/tx-id :juxt.site/tx-event-index)))]

    (is (= 14 (count events)))))
