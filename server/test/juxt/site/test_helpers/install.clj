;; Copyright © 2022, JUXT LTD.

(ns juxt.site.test-helpers.install
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.tools.logging :as log]
   [clojure.walk :refer [postwalk]]
   [juxt.site.install.common-install-util :as ciu]
   [juxt.site.operations :as operations]
   [xtdb.api :as xt]))

(defn index-by-id [installer-graph]
  (into {} (map (juxt :id identity) installer-graph)))

(defn dependency-graph [id index]
  (let [installer (get index id)
        deps (mapv #(dependency-graph % index) (:deps installer))]
    (cond-> {:id (:id installer)}
      (seq deps) (assoc :deps deps))))

(defn converge!
  "Given a set of resource ids and a dependency graph, create resources
  and their dependencies."
  [xt-node resources graph parameter-map]

  (assert (map? parameter-map) "Parameter map arg must be a map")

  (let [db (xt/db xt-node)
        installer-seq (ciu/installer-seq graph parameter-map resources)
        tx-ops (operations/installer-seq->tx-ops db installer-seq)]

    (operations/apply-ops! xt-node tx-ops)))

(defn normalize-uri-map [uri-map]
  (->> uri-map
       (mapcat (fn [[k v]]
                 (if (coll? k)
                   (zipmap k (repeat v))
                   [[k v]])))
       (into {})))

(defn map-uris
  [o uri-map]
  (let [uri-map (normalize-uri-map uri-map)]
    (postwalk
     (fn [x]
       (cond-> x
         (string? x)
         (str/replace
          #"(https?://.*?example.org)(.*)"
          (fn [[_ host path]] (str (get uri-map host host) path)))))
     o)))
