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

(defn perform-operation!
  [xt-node {subject-uri :juxt.site/subject-uri,
            operation-uri :juxt.site/operation-uri,
            input :juxt.site/input,
            :as op-data}]
  (assert xt-node)
  (let [db (xt/db xt-node)
        subject (xt/entity db subject-uri)
        _ (when-not subject
            (throw
             (ex-info
              (format "No such subject found in database for %s" subject-uri)
              {:subject-uri subject-uri})))

        operation (xt/entity db operation-uri)
        _ (when-not operation
            (throw
             (ex-info
              (format "No such operation found in database for %s" operation-uri)
              {:operation-uri operation-uri})))]

    (try
      (:juxt.site/operation-result
       (operations/perform-ops!
        {:juxt.site/xt-node xt-node}
        [(cond-> {:juxt.site/subject-uri subject-uri
                  :juxt.site/operation-uri operation-uri
                  :juxt.site/operation operation
                  :juxt.site/db db}
           input
           (merge {:juxt.site/received-representation
                   {:juxt.http/content-type "application/edn"
                    :juxt.http/body (.getBytes (pr-str input))}}))]))
      (catch Exception cause
        (throw (ex-info "Failed to perform operation" {:init-data op-data} cause))))))

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
