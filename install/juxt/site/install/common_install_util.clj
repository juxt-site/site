;; Copyright © 2023, JUXT LTD.

(ns juxt.site.install.common-install-util
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.tools.logging :as log]
   [clojure.walk :refer [prewalk postwalk]]
   [selmer.parser :as selmer]
   [clojure.set :as set]
   [clojure.edn :as edn]))

(defn namespaced-name [kw]
  (str
   (when-let [ns (namespace kw)]
     (str ns "/"))
   (name kw)))

;; In the render-form-templates function below, we want to protect
;; anything that may contain a Selmer template from being rendered
;; now. There must be a better way, but for now, wrapping the program
;; in a type will do.

(defn render-with-required-check [template m]
  (when-let [missing (try
                       (seq
                        (set/difference
                         (set (map namespaced-name (selmer/known-variables template)))
                         (set (keys m))))
                       (catch Exception e
                         (throw (ex-info "DEBUG" {:template template} e))))]
    (throw
     (ex-info
      (format "Required template variables missing: %s" (str/join ", " missing))
      {:template template
       :missing missing
       :all m
       :keys (set (keys m))})))
  (selmer/render template m))

(defprotocol Unwrap
  (unwrap [_]))

(deftype Template [s]
  Unwrap
  (unwrap [_] s))

(deftype Pretty [s]
  Unwrap
  (unwrap [_] s))

(extend-type String
  Unwrap
  (unwrap [o] o))

(defn deref-param [param params]
  (if-let [[_ val] (find params param)]
    val
    (throw (ex-info "No such parameter" {:parameter param}))))

(defn lookup-root [resource graph parameter-map]
  (when (:juxt.site/target-uri (:juxt.site/target-uri resource))
    (throw (ex-info "HERE" {})))
  (assert (map? resource) (format "resource should be map: %s" (pr-str resource)))
  (let [target-uri (:juxt.site/target-uri resource)
        uri-maybe-template (cond-> target-uri
                             (instance? Template target-uri) unwrap)
        concrete-id
        (->
         (render-with-required-check uri-maybe-template (merge parameter-map (:juxt.site/parameters resource)))
         (try
           (catch Exception e
             (throw
              (ex-info
               "Failed to render"
               {:resource resource
                :target-uri target-uri
                :uri-maybe-template uri-maybe-template
                :parameter-map parameter-map
                :cause e} e)))))]
    (if-let [v (or (get graph concrete-id) (get graph uri-maybe-template))]
      (assoc v :juxt.site/uri concrete-id :juxt.site/target-uri uri-maybe-template)
      (throw
       (ex-info
        (format "Resource identified by '%s' could not be resolved" uri-maybe-template)
        {:resource resource
         :target-uri target-uri
         :uri-maybe-template uri-maybe-template
         :concrete-id concrete-id
         :graph graph
         :parameter-map parameter-map
         :parameters (:juxt.site/parameters resource)})))))

(defn lookup-dependency [dependency-spec graph parameter-map parent]
  (let [k
        (cond
          (:juxt.site/parameter-ref dependency-spec)
          (-> (:juxt.site/parameter-ref dependency-spec)
                (deref-param parameter-map)
                (try (catch Exception cause (throw
                                             (ex-info
                                              "Failed to lookup dependency"
                                              {:parent parent
                                               :dependency-spec dependency-spec} cause)))))

          (:juxt.site/target-uri dependency-spec) (:juxt.site/target-uri dependency-spec)

          :else (throw (ex-info "Invalid dependency-spec" {:dependency-spec dependency-spec})))

        concrete-id (cond
                      (:juxt.site/parameter-ref dependency-spec) k
                      (:juxt.site/target-uri dependency-spec)
                      (render-with-required-check k (merge parameter-map (:juxt.site/parameters dependency-spec))))]

    (if-let [v (or
                (get graph concrete-id) ; try the concrete-id first, in case it's declared
                (get graph k) ; if not, try to find a resource installer with a templated key
                )]
      (assoc v :juxt.site/uri concrete-id :juxt.site/target-uri k)
      (throw
       (ex-info
        (format "Unsatisfied dependency between '%s' and '%s'" (:juxt.site/uri parent) k)
        {:k k
         :parameter-map parameter-map
         :dependency-spec dependency-spec
         :graph (keys graph)})))))

;; installer-seq

(defn render-form-templates [form params]
  (->> form
       (prewalk
        (fn [x]
          (cond-> x
            (instance? juxt.site.install.common_install_util.Pretty x) (-> unwrap (render-form-templates params) (->Pretty))
            (string? x) (render-with-required-check params))))
       ;; Unwrap the templates
       (postwalk
        (fn [x]
          (cond-> x
            (instance? juxt.site.install.common_install_util.Template x) unwrap
            (instance? juxt.site.install.common_install_util.Pretty x) (-> unwrap pprint with-out-str))))))

(defn installer-seq [resources graph parameter-map]
  (assert (every? some? resources) (format "Some ids were nil: %s" (pr-str resources)))

  (->> resources
       (mapcat
        (fn [resource]
          (let [resource (if (string? resource) {:juxt.site/target-uri resource} resource)
                resource-parameters (:juxt.site/parameters resource)
                root (some-> (lookup-root resource graph (merge parameter-map resource-parameters))
                             (into resource))]

            ;; From each id, find all descendants
            (tree-seq
             some?
             (fn [parent]
               (assert parent)
               (for [dep (:deps parent)
                     :let [child (lookup-dependency
                                  (if (string? dep) {:juxt.site/target-uri dep} dep)
                                  graph parameter-map parent)]]
                 (-> child
                     ;; We don't need this right now, and it gets in
                     ;; the way of the clojure.core/distinct below.
                     ;; We can always restore it another time and do
                     ;; some more convoluted logic for the
                     ;; clojure.core/distinct.
                     ;;(assoc :juxt.site/dependant true)
                     (assoc :deps (:deps child)))))
             (assoc root :deps (:deps root))))))
       ;; to get depth-first order
       reverse
       ;; to dedupe
       distinct
       ;; (perf: note the reduce is done after the distinct to avoid duplicating
       ;; work)
       (reduce
        (fn [acc {:keys [juxt.site/uri install juxt.site/parameters] :as installer}]
          (let [init-data
                (try
                  (render-form-templates install (assoc (merge parameter-map parameters) "$id" uri))
                  (catch clojure.lang.ExceptionInfo cause
                    (throw
                     (ex-info
                      (format "Failed to render init-data for '%s'" uri)
                      {:juxt.site/uri uri
                       :installer installer
                       :cause cause}
                      cause))))]
            (when (nil? init-data)
              (throw (ex-info "Nil init data" {:juxt.site/uri uri})))
            (conj acc (-> installer
                          (assoc :juxt.site/init-data init-data)
                          (dissoc :install)))))
        [])))


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

      (instance? juxt.site.install.common_install_util.Template node)
      (->Template (uri-map-replace (unwrap node) uri-map))

      (instance? juxt.site.install.common_install_util.Pretty node)
      (->Pretty (postwalk walk-fn (unwrap node)))

      :else node)))

(def READERS
  {'juxt.pprint (fn [x] (->Pretty x))
   'juxt.template (fn [s] (->Template s))})

(defn unified-installer-files [root uri-map]
  (for [installer-file (file-seq root)
        :when (.isFile installer-file)
        :let [filepath (.toPath installer-file)
              relpath (.toString (.relativize (.toPath root) filepath))
              [_ auth+path1 path2] (re-matches #"(.+?)(?:_index)?\.edn" relpath)
              url (str "https://" auth+path1 path2)
              url (uri-map-replace url uri-map)]]
    {:url url
     :filepath (.toString filepath)
     :relpath relpath
     :auth-path (str auth+path1 path2)
     ;; TODO: Try using a delay for performance, but measure
     :content (->>
               (edn/read-string {:readers READERS} (slurp installer-file))
               (postwalk (make-uri-map-replace-walk-fn uri-map)))}))

(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  [root uri-map]
  (into {} (map (juxt :url :content) (unified-installer-files root uri-map))))
