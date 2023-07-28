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

(defn lookup-root [installer-spec graph parameters]
  (assert (map? installer-spec) (format "Installer spec should be a map: %s" (pr-str installer-spec)))
  (let [template-uri (str (:juxt.site/base-uri installer-spec) (:juxt.site/installer-path installer-spec))
        uri
        (->
         (render-with-required-check
          template-uri
          parameters)
         (try
           (catch Exception e
             (throw
              (ex-info
               "Failed to render"
               {:installer-spec installer-spec
                :template-uri template-uri
                :parameters parameters
                :cause e} e)))))]
    (if-let [v (or (get graph uri) (get graph template-uri))]
      (assoc v :juxt.site/uri uri)

      (throw
       (ex-info
        (format "Resource identified by '%s' could not be resolved" template-uri)
        {:installer-spec installer-spec
         :template-uri template-uri
         :uri uri
         ;;:graph graph
         :parameters parameters})))))

;; TODO: Rewrite, and replace dependency-spec with string
;; NOTE: There is only one known example of a map-based dependency-spec and
;; that looks like it would work with simple template expansion
(defn lookup-dependency [dependency graph parameters parent]
  (let [concrete-id (render-with-required-check dependency parameters)]
    (if-let [v (or
                (get graph concrete-id) ; try the concrete-id first, in case it's declared
                (get graph dependency) ; if not, try to find a resource installer with a templated key
                )]
      (assoc v :juxt.site/uri concrete-id :juxt.site/parameters parameters)
      (throw
       (ex-info
        (format "Unsatisfied dependency between '%s' and '%s'" (:juxt.site/uri parent) dependency)
        {:parameters parameters
         :concrete-id concrete-id
         :dependency dependency
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

(defn installer-seq-pt1
  "Given a graph of installer templates indexed by a (possibly templated) uri,
  and a set of user-provided parameters, lookup each installer spec in
  the graph, along with any dependencies, to create a set of installer
  templates."
  [graph user-parameters installer-specs]
  (->> installer-specs
       (mapcat
        (fn [installer-spec]
          (let [installer-parameters (:juxt.site/parameters installer-spec)
                expanded-installer-parameters (render-form-templates installer-parameters user-parameters)
                combined-parameters (merge user-parameters expanded-installer-parameters)
                root (lookup-root installer-spec graph combined-parameters)]

            (reverse
             (tree-seq
              some?
              (fn [parent]
                (assert parent)
                (for [dep (:deps parent)
                      :let [child (lookup-dependency dep graph combined-parameters parent)]]
                  (-> child
                      (assoc :juxt.site/ultimate-dependant installer-spec)
                      (assoc :deps (:deps child)))))
              (assoc root :juxt.site/parameters combined-parameters))))))))

(defn installer-seq
  "Given a graph of installer templates indexed by a (possibly templated) uri,
  and a set of user-provided parameters, return a sequence of concrete
  installers."
  [graph user-parameters installer-specs]
  (assert (every? some? installer-specs) (format "Some ids were nil: %s" (pr-str installer-specs)))
  (->> installer-specs
       (installer-seq-pt1 graph user-parameters)
       (reduce
        (fn [{:keys [seen-uri-set] :as acc}
             {:keys [juxt.site/uri install juxt.site/parameters] :as installer}]
          (if-not (contains? seen-uri-set uri)
            (let [init-data
                  (try
                    (render-form-templates install (assoc (merge user-parameters parameters) "$id" uri))
                    (catch clojure.lang.ExceptionInfo cause
                      (throw
                       (ex-info
                        (format "Failed to render init-data for '%s'" uri)
                        {:juxt.site/uri uri
                         :installer installer
                         :installer-parameters parameters
                         :user-parameters user-parameters
                         :cause cause}
                        cause))))]
              (when (nil? init-data)
                (throw (ex-info "Nil init data" {:juxt.site/uri uri})))
              (-> acc
                  (update :installers conj (-> installer
                                               (assoc :juxt.site/init-data init-data)
                                               (dissoc :install)))
                  (update :seen-uri-set conj uri)))
            acc))
        {:seen-uri-set #{}
         :installers []})
       :installers))


(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https?://.*?example.org)([\p{Alnum}-]+)*"
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

(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  [root uri-map]
  (->>
   (doall
    (for [dir (.listFiles root)
          :when (.isDirectory dir)
          installer-file (file-seq dir)
          :when (.isFile installer-file)
          :let [filepath (.toPath installer-file)
                relpath (.toString (.relativize (.toPath root) filepath))
                [_ auth path1 path2] (re-matches #"([^/]+)(.+?)(?:_index)?\.edn" relpath)]
          :when auth ; checks we match an edn file, there could be other notes in here
          :let [url (str "https://" auth path1 path2)
                url (uri-map-replace url uri-map)
                content (try
                          (->
                           (postwalk (make-uri-map-replace-walk-fn uri-map) (edn/read-string {:readers READERS} (slurp installer-file)))
                           (merge {:juxt.site.installer-graph/filepath (.toString filepath)
                                   :juxt.site.installer-graph/authority auth
                                   :juxt.site.installer-graph/path (str path1 path2)}))
                          (catch Exception e
                            (throw (ex-info "Failure with url" {:url url
                                                                :auth auth
                                                                :path1 path1
                                                                :path2 path2} e))))]]

      [url content]))
   (into {})))
