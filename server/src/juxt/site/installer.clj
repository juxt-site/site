;; Copyright © 2023, JUXT LTD.

(ns juxt.site.installer
  (:require
   [clojure.tools.logging :as log]
   [juxt.site.operations :as operations]
   [xtdb.api :as xt]))

(defn put! [xt-node & ms]
  (assert xt-node)
  (->>
   (xt/submit-tx
    xt-node
    (for [m ms]
      (let [vt (:xtdb.api/valid-time m)]
        [:xtdb.api/put (dissoc m :xtdb.api/valid-time) vt])))
   (xt/await-tx xt-node)))

(defn perform-operation! [xt-node {:juxt.site/keys [subject-uri operation-uri input] :as op-data}]
  (if subject-uri
    (let [db (xt/db xt-node)
          _ (log/infof "Subject %s performing operation %s" subject-uri operation-uri)
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
          (cond-> {:juxt.site/xt-node xt-node
                   :juxt.site/subject subject
                   :juxt.site/operation operation}

            input
            (merge {:juxt.site/received-representation
                    {:juxt.http/content-type "application/edn"
                     :juxt.http/body (.getBytes (pr-str input))}}))))
        (catch Exception cause
          (throw (ex-info "Failed to perform operation" {:init-data op-data} cause)))))

    ;; Go direct! (but only on certain conditions)
    (if-let [id (:xt/id input)]
      (do
        (log/infof "Installing id %s" id)
        (put! xt-node input))
      (throw (ex-info "xt/id required when no subject-uri" {})))))

(defn call-installer
  [xt-node
   {uri :juxt.site/uri
    init-data :juxt.site/init-data
    error :error :as installer}]
  (assert uri)
  (when error (throw (ex-info "Cannot proceed with error resource" {:juxt.site/uri uri :error error})))
  (when-not init-data
    (throw
     (ex-info
      "Installer does not contain init-data"
      {:juxt.site/uri uri :installer installer})))

  (try
    (let [{:juxt.site/keys [puts] :as result}
          (perform-operation! xt-node init-data)]
      (when (and puts (not (contains? (set puts) uri)))
        (throw (ex-info "Puts does not contain uri" {:juxt.site/uri uri :puts puts})))
      {:juxt.site/uri uri :status :installed :result result})
    (catch Throwable cause
      (throw
       (ex-info
        (format "Failed to converge uri: '%s'" uri)
        {:juxt.site/uri uri}
        cause)))))
