;; Copyright © 2023, JUXT LTD.

(ns juxt.site.installer
  (:require
   [clojure.tools.logging :as log]
   [juxt.site.operations :as operations]
   [xtdb.api :as xt]))

(defn
  ^{:deprecated "Replace with perform-operations!"}
  perform-operation!
  [xt-node
   {:juxt.site/keys [subject-uri operation-uri input] :as op-data}]
  (assert xt-node)
  (let [db (xt/db xt-node)
        _ (log/infof "Subject %s performing operation %s" subject-uri operation-uri)
        subject (xt/entity db subject-uri)
        _ (when-not subject
            (throw
             (ex-info
              (format "No such subject found in database for %s" subject-uri)
              {:subject-uri subject-uri})))

        _ (when-not (xt/entity db operation-uri)
            (throw
             (ex-info
              (format "No such operation found in database for %s" operation-uri)
              {:operation-uri operation-uri})))

        operation (xt/entity db operation-uri)]

    (when-not operation
      (throw
       (ex-info
        (format "Operation not found: %s" operation-uri)
        {:operation-uri operation-uri})))
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
