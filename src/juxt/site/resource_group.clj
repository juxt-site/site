;; Copyright © 2022, JUXT LTD.

(ns juxt.site.resource-group
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.tools.logging :as log]
   [clojure.walk :refer [prewalk postwalk]]
   [juxt.site.actions :as actions]
   [ring.util.codec :as codec]
   [selmer.parser :as selmer]
   [xtdb.api :as xt]
   [clojure.set :as set]))

(defn put! [xt-node & ms]
  (assert xt-node)
  (->>
   (xt/submit-tx
    xt-node
    (for [m ms]
      (let [vt (:xtdb.api/valid-time m)]
        [:xtdb.api/put (dissoc m :xtdb.api/valid-time) vt])))
   (xt/await-tx xt-node)))

(defn to-regex [uri-template]
   (re-pattern
    (str/replace
     uri-template
     #"\{([^\}]+)\}"
     (fn replacer [[_ group]]
       (format "(?<%s>[^/#\\?]+)" (str/replace group "-" ""))))))

#_(let [k "https://auth.example.org/{prefix}/clients/{client-id}"]
  (to-regex k)
  (when-let [matches (re-matches (to-regex k)
                                 "https://auth.example.org/openid/clients/abc123")]
    (zipmap
     (map second (re-seq #"\{([\p{Alpha}-]+)\}" k))
     (map codec/url-decode (next matches)))
    ))

(defn lookup [id graph]
  (or
   (when-let [v (get graph id)] (assoc v :id id))
   (some (fn [[k v]]
           (when-let [matches (re-matches (to-regex k) id)]
             (assoc v
                    :id id
                    :params
                    (zipmap
                     (map second (re-seq #"\{([\p{Alpha}-]+)\}" k))
                     (map codec/url-decode (next matches))))))
         graph)))

;; In the render-form-templates function below, we want to protect
;; anything that may contain a Selmer template from being rendered
;; now. There must be a better way, but for now, wrapping the program
;; in a type will do.

(defprotocol Unwrap
  (unwrap [_]))

(deftype DoNotRender [s]
  Unwrap
  (unwrap [_] s))

(defn wrap-as-template [[k v]]
  [k (->DoNotRender v)])

(defn namespaced-name [kw]
  (str
   (when-let [ns (namespace kw)]
     (str ns "/"))
   (name kw)))

(defn render-with-required-check [template m]
  (when-let [missing (seq
                      (set/difference
                       (set (map namespaced-name (selmer/known-variables template)))
                       (set (keys m))))]
    (throw (ex-info (format "Required template variables missing: %s" (str/join ", " missing)) {:missing missing :all m :keys (set (keys m))})))
  (selmer/render template m))

(defn render-form-templates [form params]
  (->> form
       (prewalk
        (fn [x]
          (cond-> x
            (and (vector? x) (= (first x) :juxt.site.sci/program)) wrap-as-template
            (string? x) (render-with-required-check params))))
       ;; Unwrap the templates
       (postwalk
        (fn [x]
          (cond-> x
            (instance? DoNotRender x) unwrap)))))

(defn- node-dependencies
  "Return the dependency ids for the given node, with any parameters expanded
  out."
  [node parameter-map]
  (let [{:keys [deps params]} node]
    (when (seq deps)
      ;; Dependencies may be templates, with parameters
      ;; that correspond to the uri-template pattern of
      ;; the id.
      (map #(render-with-required-check % (merge parameter-map params)) deps))))

(defn ids->nodes [ids graph parameter-map]
  (assert (every? some? ids) (format "Some ids were nil: %s" (pr-str ids)))
  (->> ids
       (mapcat
        (fn [id]
          (let [root (lookup id graph)]
            (when-not root
              (throw
               (ex-info
                (format "Resource identified by '%s' could not be resolved" id)
                {:id id
                 :ids ids
                 :graph graph
                 :parameter-map parameter-map})))
            ;; From each id, find all descendants
            (tree-seq
             some?
             (fn [parent]
               (assert parent)
               (for [child-id (node-dependencies parent parameter-map)
                     :let [child (lookup child-id graph)
                           _ (when-not child
                               (throw
                                (ex-info
                                 (format "Unsatisfied dependency between '%s' and '%s'" (:juxt.site/source parent) child-id)
                                 {:dependant parent
                                  :dependency child-id
                                  :graph (keys graph)})))]]
                 child))
             root))))
       ;; to get depth-first order
       reverse
       ;; to dedupe
       distinct
       ;; (perf: note the reduce is done after the distinct to avoid duplicating
       ;; work)
       (reduce
        (fn [acc {:keys [id install params] :as node}]
          (let [init-data (render-form-templates install (assoc (merge parameter-map params) "$id" id))]
            (when (nil? init-data)
              (throw (ex-info "Nil init data" {:id id})))
            (conj acc (-> node (assoc :juxt.site/init-data init-data)))))
        [])))

(defn call-action-with-init-data! [xt-node init-data]
  (when-not init-data (throw (ex-info "No init data" {})))

  (if-let [subject-id (:juxt.site/subject-id init-data)]

    (let [db (xt/db xt-node)
          _ (assert (:juxt.site/subject-id init-data))
          _ (log/infof
             "Calling action %s by subject %s: input id %s"
             (:juxt.site/action-id init-data)
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
        (:juxt.site/action-result
         (actions/do-action!
          (cond->
              {:juxt.site/xt-node xt-node
               :juxt.site/db db
               :juxt.site/subject subject
               :juxt.site/action (:juxt.site/action-id init-data)}

              (:juxt.site/input init-data)
              (merge {:juxt.site/received-representation
                      {:juxt.http/content-type "application/edn"
                       :juxt.http/body (.getBytes (pr-str (:juxt.site/input init-data)))}}))))
        (catch Exception cause
          (throw (ex-info "Failed to perform action" {:init-data init-data} cause)))))

    ;; Go direct!
    (do
      (assert (get-in init-data [:juxt.site/input :xt/id]))
      (log/infof
       "Installing id %s"
       (get-in init-data [:juxt.site/input :xt/id]))
      (put! xt-node (:juxt.site/input init-data)))))

(defn converge!
  "Given a set of resource ids and a dependency graph, create resources and their
  dependencies. A resource id that is a keyword is a proxy for a set of
  resources that are included together but where there is no common dependant."
  [xt-node ids graph parameter-map]

  (assert (map? parameter-map) "Parameter map arg must be a map")
  (assert (every? (fn [[k v]] (and (string? k) (string? v))) parameter-map) "All keys in parameter map must be strings")

  (let [nodes (ids->nodes ids graph parameter-map)]
    (->> nodes
         (mapv
          (fn [{id :id
                init-data :juxt.site/init-data
                error :error :as node}]
            (assert id)
            (when error (throw (ex-info "Cannot proceed with error resource" {:id id :error error})))
            (when-not init-data
              (throw
               (ex-info
                "Node does not contain init-data"
                {:id id :node node})))

            (try
              (let [{:juxt.site/keys [puts] :as result}
                    (call-action-with-init-data! xt-node init-data)]
                (when (and puts (not (contains? (set puts) id)))
                  (throw (ex-info "Puts does not contain id" {:id id :puts puts})))
                {:id id :status :installed :result result})
              (catch Throwable cause
                (throw (ex-info (format "Failed to converge id: '%s'" id) {:id id} cause))
                ;;{:id id :status :error :error cause}
                )))))))

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
          #"(https://.*?example.org)(.*)"
          (fn [[_ host path]] (str (get uri-map host host) path)))))
     o)))
