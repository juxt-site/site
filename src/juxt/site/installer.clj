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
                (format "No subject found in database for %s" subject-id)
                {:subject-id subject-id})))]

      (try
        (:juxt.site/operation-result
         (operations/do-operation!
          (cond->
              {:juxt.site/xt-node xt-node
               :juxt.site/db db
               :juxt.site/subject subject
               :juxt.site/operation (:juxt.site/operation-id init-data)}

              (:juxt.site/input init-data)
              (merge {:juxt.site/received-representation
                      {:juxt.http/content-type "application/edn"
                       :juxt.http/body (.getBytes (pr-str (:juxt.site/input init-data)))}}))))
        (catch Exception cause
          (throw (ex-info "Failed to perform operation" {:init-data init-data} cause)))))

    ;; Go direct!
    (do
      (assert (get-in init-data [:juxt.site/input :xt/id]))
      (log/infof
       "Installing id %s"
       (get-in init-data [:juxt.site/input :xt/id]))
      (put! xt-node (:juxt.site/input init-data)))))

(defn call-installer
  [xt-node
   {id :id
    init-data :juxt.site/init-data
    error :error :as installer}]
  (assert id)
  (when error (throw (ex-info "Cannot proceed with error resource" {:id id :error error})))
  (when-not init-data
    (throw
     (ex-info
      "Installer does not contain init-data"
      {:id id :installer installer})))

  (try
    (let [{:juxt.site/keys [puts] :as result}
          (call-operation-with-init-data! xt-node init-data)]
      (when (and puts (not (contains? (set puts) id)))
        (throw (ex-info "Puts does not contain id" {:id id :puts puts})))
      {:id id :status :installed :result result})
    (catch Throwable cause
      (throw (ex-info (format "Failed to converge id: '%s'" id) {:id id} cause))
      ;;{:id id :status :error :error cause}
      )))
