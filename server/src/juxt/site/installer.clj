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

(defn call-operation-with-init-data! [xt-node init-data]
  (when-not init-data (throw (ex-info "No init data" {})))

  (if-let [subject-id (:juxt.site/subject-id init-data)]

    (let [db (xt/db xt-node)
          _ (assert (:juxt.site/subject-id init-data))
          _ (log/infof
             "Calling operation %s by subject %s: input id %s"
             (:juxt.site/operation-id init-data)
             subject-id
             (:xt/id init-data))

          subject (when (:juxt.site/subject-id init-data)
                    (xt/entity db (:juxt.site/subject-id init-data)))

          _ (when-not subject
              (throw
               (ex-info
                (format "No such subject found in database for %s" subject-id)
                {:subject-id subject-id})))

          operation (xt/entity db (:juxt.site/operation-id init-data))
          _ (when-not operation
              (throw
               (ex-info
                (format "No such operation found in database for %s" (:juxt.site/operation-id init-data))
                {:operation-id (:juxt.site/operation-id init-data)})))]

      (try
        (:juxt.site/operation-result
         (operations/do-operation!
          (cond-> {:juxt.site/xt-node xt-node
                   :juxt.site/db db
                   :juxt.site/subject subject
                   :juxt.site/operation operation}

            (:juxt.site/input init-data)
            (merge {:juxt.site/received-representation
                    {:juxt.http/content-type "application/edn"
                     :juxt.http/body (.getBytes (pr-str (:juxt.site/input init-data)))}}))))
        (catch Exception cause
          (throw (ex-info "Failed to perform operation" {:init-data init-data} cause)))))

    ;; Go direct! (but only on certain conditions)
    #_(do
      #_(println "init-data: %s" (pr-str init-data))
      (throw
       (ex-info
        (format "Should not install this without a subject/operation: %s" (get-in init-data [:juxt.site/input :xt/id]))
        {})))
    (do
        (assert (get-in init-data [:juxt.site/input :xt/id]))
        (log/infof
         "Installing id %s"
         (get-in init-data [:juxt.site/input :xt/id]))
        (put! xt-node (:juxt.site/input init-data)))))

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
          (call-operation-with-init-data! xt-node init-data)]
      (when (and puts (not (contains? (set puts) uri)))
        (throw (ex-info "Puts does not contain uri" {:juxt.site/uri uri :puts puts})))
      {:juxt.site/uri uri :status :installed :result result})
    (catch Throwable cause
      (throw
       (ex-info
        (format "Failed to converge uri: '%s'" uri)
        {:juxt.site/uri uri}
        cause)))))
