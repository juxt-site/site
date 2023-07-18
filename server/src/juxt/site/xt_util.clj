;; Copyright © 2023, JUXT LTD.

(ns juxt.site.xt-util
  (:require
   [xtdb.db :as xt.db]
   [xtdb.codec :refer [crux->xt]]
   [clojure.set :as set]))

(defn tx-exception-doc
  "Return the internal XTDB error document for an uncommitted
  transaction."
  [xt-node tx-id]
  (let [document-store (:document-store xt-node)]
    (with-open [tx-log (xt.db/open-tx-log (:tx-log xt-node) (dec tx-id) {})]
      (let [m
            (->> tx-log
                 iterator-seq
                 first                    ; narrow to this tx-id
                 :xtdb.tx.event/tx-events ; pull out events
                 (map #(get % 2)) ; get the document-hash of each event
                 set
                 (xt.db/fetch-docs document-store)
                 vals
                 (filter :crux.db.fn/exception)
                 first
                 crux->xt
                 )]
        (-> m (set/rename-keys
               {:crux.db.fn/failed? :juxt.site.xt/failed?
                :crux.db.fn/exception :juxt.site.xt/exception
                :crux.db.fn/message :juxt.site.xt/message
                :crux.db.fn/ex-data :juxt.site.xt/ex-data}))
        ))))


(defn tx-event-docs
  "Return the Site event log entries, one per operation, for the given
  transaction. This relies on internal implementation details which
  may in future by surfaced to the XTDB API."
  [xt-node tx-id]
  (let [document-store (:document-store xt-node)]
    (with-open [tx-log (xt.db/open-tx-log (:tx-log xt-node) (dec tx-id) {})]
      (let [tx-events
            (->> tx-log
                 iterator-seq
                 first                    ; narrow to this tx-id
                 :xtdb.tx.event/tx-events ; pull out events
                 (map #(get % 2)) ; get the document-hash of each event
                 set
                 (xt.db/fetch-docs document-store)
                 vals
                 (keep :crux.db.fn/tx-events))
            tx-docs
            (->> tx-events
                 (mapcat
                  (fn [events]
                    (keep (fn [[tx-op _ doc-hash]]
                            (when (= tx-op :crux.tx/put)
                              doc-hash)) events)))
                 set
                 (xt.db/fetch-docs document-store))]
        (mapv
         (fn [tx-ops]
           (some (fn [[tx-op _ val-id]]
                   (let [doc (get tx-docs val-id)]
                     (when (and (= :crux.tx/put tx-op)
                                (= (:juxt.site/type doc) "https://meta.juxt.site/types/event"))
                       doc)))
                 tx-ops)) tx-events)))))
