;; Copyright © 2023, JUXT LTD.

(ns juxt.site.install.common-install-util
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.tools.logging :as log]
   [clojure.walk :refer [prewalk postwalk]]
   [selmer.parser :as selmer]
   [clojure.set :as set]
   [clojure.edn :as edn]
   [clojure.java.io :as io]))

(defn namespaced-name [kw]
  (str
   (when-let [ns (namespace kw)]
     (str ns "/"))
   (name kw)))

;; In the render-form-templates function below, we want to protect
;; anything that may contain a Selmer template from being rendered
;; now. There must be a better way, but for now, wrapping the program
;; in a type will do.

(defn- render-params-missing?
  [installer-path m]
  (try
    (seq
     (set/difference
      (set (map namespaced-name (selmer/known-variables installer-path)))
      (set (keys m))))
    (catch Exception e
      (throw (ex-info "DEBUG" {:template installer-path} e)))))

(defn render-with-required-check [spec m]
  (when-let [missing (set/intersection (render-params-missing? (:juxt.site/installer-path spec) m)
                                       (render-params-missing? (:juxt.site/base-uri spec) m))]
    (throw
     (ex-info
      (format "Required template variables missing: %s" (str/join ", " missing))
      {:spec spec
       :missing missing
       :all m
       :keys (set (keys m))})))
  (update (update spec :juxt.site/installer-path #(selmer/render % m)) :juxt.site/base-uri #(selmer/render % m)))

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
        {:juxt.site/keys [base-uri installer-path]}
        (->
         (render-with-required-check
          installer-spec
          parameters)
         (try
           (catch Exception e
             (throw
              (ex-info
               "Failed to render"
               {:installer-spec installer-spec
                :template-uri template-uri
                :parameters parameters
                :cause e} e)))))
        uri (str base-uri installer-path)]
    (if-let [v (or (get graph uri) (get graph template-uri))]
      (assoc v :juxt.site/uri uri :juxt.site/base-uri base-uri :juxt.site/installer-path installer-path)

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
  (let [concrete-spec (render-with-required-check dependency parameters)
        concrete-id (str (:juxt.site/base-uri concrete-spec) (:juxt.site/installer-path concrete-spec))]
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
         ;;:graph (keys graph)
         }
        )))))

(defn- render-optional-parameters
  "Given a map and a selection of parameters either renders optional
  parameters or removes them from the map if the parameter is not available"
  [form params]
  (reduce (fn [acc [k v]]
            (if (:optional (meta v))
              (if (render-params-missing? (:value v) params)
                acc
                (assoc acc k (selmer/render (:value v) params)))
              (assoc acc k v)))
          {}
          form))

;; installer-seq

(defn render-string-with-required-check [template m]
  (when-let [missing (render-params-missing? template m)]
    (throw
     (ex-info
      (format "Required template variables missing: %s" (str/join ", " missing))
      {:template template
       :missing missing
       :all m
       :keys (set (keys m))})))
  (selmer/render template m))


(defn render-form-templates [form params]
  (->> form
       (prewalk
        (fn [x]
          (cond-> x
            (instance? juxt.site.install.common_install_util.Pretty x) (-> unwrap (render-form-templates params) (->Pretty))
            (string? x) (render-string-with-required-check params)
            ;; Optional key value pairs are removed if the parameter is not provided.
            (map? x) (render-optional-parameters params))))
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
       (map
        (fn [installer-spec]
          (let [installer-parameters (:juxt.site/parameters installer-spec)
                expanded-installer-parameters (render-form-templates installer-parameters user-parameters)
                combined-parameters (merge user-parameters expanded-installer-parameters)
                root (lookup-root installer-spec graph combined-parameters)]

            (assoc root
                   :juxt.site/parameters combined-parameters
                   :juxt.site/dependencies
                   (doall
                    (for [dep (:deps root)]
                      (render-with-required-check dep combined-parameters)))))))))

(defn installer-seq
  "Given a graph of installer templates indexed by a (possibly templated) uri,
  and a set of user-provided parameters, return a sequence of concrete
  installers."
  [graph user-parameters installer-specs]
  (assert (every? some? installer-specs) (format "Some ids were nil: %s" (pr-str installer-specs)))
  (->> installer-specs
       (installer-seq-pt1 graph user-parameters)
       (reduce
        (fn [acc
             {:keys [juxt.site/uri install juxt.site/parameters] :as installer}]
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
                                              (dissoc :install))))))
        {:installers []})
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

(defn bundle-map [bundle uri-map opts]
  {:uri (str (get-in uri-map ["https://data.example.org"]) "/bundles/" (clojure.string/replace (clojure.string/lower-case (:title bundle)) " " "-"))
   :title (:title bundle)
   :installers (:installers bundle)
   :juxt.site/protection-space-uris #{(str (get-in uri-map ["https://auth.example.org"])
                                       "/protection-spaces/bearer")}
   :juxt.site/access-control-allow-origins
   [[".*"
     #:juxt.site{:access-control-allow-origin "*",
                 :access-control-allow-methods [:get :delete :put],
                 :access-control-allow-headers ["authorization"]}]]
   :juxt.site/rules
   '[[(allowed? subject operation resource permission)
      [subject :juxt.site/user user]
      [permission :juxt.site/role role]
      [role :juxt.site/type "https://meta.juxt.site/types/role"]
      [role-assignment
       :juxt.site/type
       "https://meta.juxt.site/types/role-assignment"]
      [role-assignment :juxt.site/role role]
      [role-assignment :juxt.site/user user]]
     [(allowed? subject operation resource permission)
      [subject :juxt.site/application app]
      [permission :juxt.site/role role]
      [role :juxt.site/type "https://meta.juxt.site/types/role"]
      [role-assignment
       :juxt.site/type
       "https://meta.juxt.site/types/role-assignment"]
      [role-assignment :juxt.site/role role]
      [role-assignment :juxt.site/application app]]]
   :juxt.site/type (str (get-in uri-map ["https://data.example.org"]) "/types/bundle")
   :juxt.site/events-base-uri (str (get uri-map "https://auth.example.org") "/_site/events/")
   :juxt.site/methods
   {:get
    {:juxt.site/operation-uri (str (get-in uri-map ["https://data.example.org"]) "/_site/operations/get-bundle-by-id")}
    :delete
    {:juxt.site/operation-uri (str (get-in uri-map ["https://data.example.org"]) "/_site/operations/delete-bundle-by-id")}}})

(def ^:dynamic *working-dir* nil)

(def READERS
  {'juxt.pprint (fn [x] (->Pretty x))
   'juxt.template (fn [s] (->Template s))
   'juxt.include (fn [path]
                   (let [f (io/file *working-dir* path)]
                     (binding [*working-dir* (.getParentFile f)]
                       (slurp f))))})

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
                           (postwalk (make-uri-map-replace-walk-fn uri-map)
                                     (binding [*working-dir* (.getParentFile installer-file)]
                                       (edn/read-string {:readers READERS} (slurp installer-file))))
                           (merge {:juxt.site.installer-graph/filepath (.toString filepath)
                                   :juxt.site.installer-graph/authority auth
                                   :juxt.site.installer-graph/path (str path1 path2)}))
                          (catch Exception e
                            (throw
                             (ex-info
                              "Failure with url"
                              {:url url
                               :auth auth
                               :path1 path1
                               :path2 path2
                               :cause (.getMessage e)}
                              e))))]]

      [url content]))
   (into {})))

;; 
;; Installer Tree Lookup
;;

(defn lookup-dependency-spec-installer-tree [spec bundles]
  (filter
   #(seq (:candidates %))
   (map
    (fn [bundle]
      (assoc bundle :candidates
             (filterv
              (fn [{:juxt.site/keys [installer-path base-uri]}]
                (and (= base-uri (:juxt.site/base-uri spec))
                     (= installer-path (:juxt.site/installer-path spec))))
              (:juxt.site/installers bundle))))
    bundles)))

(defn lookup-installer-pattern-installer-tree [pattern bundles]
  (filter
   #(seq (:candidates %))
   (map
    (fn [bundle]
      (assoc bundle :candidates
             (filterv
              (fn [{:juxt.site/keys [installer-path]}]
                (re-find (re-pattern pattern) installer-path))
              (:juxt.site/installers bundle))))
    bundles)))

(defn bundles-map->seq [bundles-map]
  (map (fn [bundle]
         (into (val bundle)
               {:title (first bundle)}))
       bundles-map))


(defn bundle-dependencies-map
  "Expects a static installer-seq, seq of available bundles"
  ([installer-seq available-bundles-map]
   (bundle-dependencies-map
    {:bundles []
     :covered-resources #{}}
    installer-seq
    available-bundles-map))
  ([acc installer-seq available-bundles-map]
   (let [available-bundles (bundles-map->seq available-bundles-map)]
     (reduce
      (fn [acc {:juxt.site/keys [dependencies] :as installer}]
        (if (seq dependencies)
          (update (reduce
                   (fn [acc2 dependency-spec]
                     (if (not ((:covered-resources acc2) dependency-spec))
                       (let [candidate-bundles (lookup-dependency-spec-installer-tree dependency-spec available-bundles)]
                         (cond
                           (not (seq candidate-bundles))
                           (throw (ex-info "Couldn't find resource dependency"
                                           {:dependency-spec dependency-spec
                                            :acc acc2}))
                           
                           (= 1 (count candidate-bundles))
                           (let [candidate-name (:title (first candidate-bundles))]
                             (if (seq (filter
                                       (fn [bundle-name]
                                         (= candidate-name bundle-name))
                                       (:bundles acc2)))
                               acc2
                               (-> acc2
                                   (update :covered-resources #(conj % dependency-spec))
                                   (update :bundles #(conj % candidate-name)))))

                           :else
                           (throw (ex-info
                                   "uncovered dependency found to have multiple candidate bundles"
                                   {:dependency-spec dependency-spec
                                    :candidates candidate-bundles}))))
                       acc2))
                   acc
                   dependencies)
                  :covered-resources
                  #(conj % installer))
          (update acc :covered-resources #(conj % installer))))
      acc
      installer-seq))))
