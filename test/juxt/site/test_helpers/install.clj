;; Copyright © 2022, JUXT LTD.

(ns juxt.site.test-helpers.install
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.tools.logging :as log]
   [clojure.walk :refer [prewalk postwalk]]
   [ring.util.codec :as codec]
   [selmer.parser :as selmer]
   [clojure.set :as set]
   [juxt.site.installer :as installer]))

(defn to-regex [uri-template]
  (re-pattern
   (str/replace
    uri-template
    #"\{([^\}]+)\}"
    (fn replacer [[_ group]]
      (format "(?<%s>[^/#\\?]+)" (str/replace group "-" ""))))))

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

(defprotocol Unwrap
  (unwrap [_]))

(deftype Template [s]
  Unwrap
  (unwrap [_] s))

(deftype Pretty [s]
  Unwrap
  (unwrap [_] s))

(deftype ParameterReference [s]
  Unwrap
  (unwrap [_] s))

(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https://.*?example.org)([\p{Alnum}-]+)*"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn make-uri-map-replace-walk-fn [uri-map]
  (fn walk-fn [node]
    (cond
      (string? node) (uri-map-replace node uri-map)
      (instance? Template node)
      (->Template (uri-map-replace (unwrap node) uri-map))
      (instance? Pretty node)
      (->Pretty (postwalk walk-fn (unwrap node)))
      :else node)))


(defn deref-param [param params]
  (if-let [val (params param)]
    val
    (throw (ex-info "No such parameter" {:parameter param}))))

(defn render-form-templates [form params]
  (->> form
       (prewalk
        (fn [x]
          (cond-> x
            (instance? Pretty x) (-> unwrap (render-form-templates params) (->Pretty))
            (string? x) (render-with-required-check params))))
       ;; Unwrap the templates
       (postwalk
        (fn [x]
          (cond-> x
            (instance? Template x) unwrap
            (instance? Pretty x) (-> unwrap pprint with-out-str)
            (instance? ParameterReference x) (-> unwrap (deref-param params)))))))

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

(defn installer-graph [ids graph parameter-map]
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
               (for [child-id (:deps parent)
                     :let [child (lookup child-id graph)
                           _ (when-not child
                               (throw
                                (ex-info
                                 (format "Unsatisfied dependency between '%s' and '%s'" (:id parent) child-id)
                                 {:dependant parent
                                  :dependency child-id
                                  :graph (keys graph)})))]]
                 (-> child
                     (assoc :juxt.site/dependant parent)
                     (assoc :deps (node-dependencies child parameter-map)))))
             (assoc root :deps (node-dependencies root parameter-map))))))
       ;; to get depth-first order
       reverse
       ;; to dedupe
       distinct
       ;; (perf: note the reduce is done after the distinct to avoid duplicating
       ;; work)
       (reduce
        (fn [acc {:keys [id install params] :as node}]
          (let [init-data
                (try
                  (render-form-templates install (assoc (merge parameter-map params) "$id" id))
                  (catch clojure.lang.ExceptionInfo cause
                    (throw
                     (ex-info
                      (format "Failed to render init-data for '%s'" id)
                      {:id id} cause))))]
            (when (nil? init-data)
              (throw (ex-info "Nil init data" {:id id})))
            (conj acc (-> node (assoc :juxt.site/init-data init-data)))))
        [])))

(defn index-by-id [installer-graph]
  (into {} (map (juxt :id identity) installer-graph)))

(defn dependency-graph [id index]
  (let [installer (get index id)
        deps (mapv #(dependency-graph % index) (:deps installer))]
    (cond-> {:id (:id installer)}
      (seq deps) (assoc :deps deps))))

(defn converge!
  "Given a set of resource ids and a dependency graph, create resources and their
  dependencies. A resource id that is a keyword is a proxy for a set of
  resources that are included together but where there is no common dependant."
  [xt-node ids graph parameter-map]

  (assert (map? parameter-map) "Parameter map arg must be a map")

  (->> (installer-graph ids graph parameter-map)
       (mapv #(installer/call-installer xt-node %))))

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
