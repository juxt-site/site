;; Copyright © 2023, JUXT LTD.

(ns juxt.installer-tree
  (:require
   [clojure.edn :as edn]
   [selmer.parser :as selmer]
   [clojure.walk :refer [prewalk postwalk]]
   [clojure.set :as set]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]))

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

(def READERS
  {'juxt.pprint (fn [x] (->Pretty x))
   'juxt.template (fn [s] (->Template s))
   'juxt.param (fn [s] (->ParameterReference s))})

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
      (instance? Template node) (->Template (uri-map-replace (unwrap node) uri-map))
      (instance? Pretty node) (->Pretty (postwalk walk-fn (unwrap node)))
      :else node
      )))

;; TODO: Could this be replaced with a lazy version that visited the files directly?
(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  [uri-map]
  (let [root (io/file (System/getenv "SITE_HOME") "installers")]
      (into
       {}
       (for [installer-file (file-seq root)
             :when (.isFile installer-file)
             :let [filepath (.toPath installer-file)
                   relpath (.toString (.relativize (.toPath root) filepath))
                   [_ auth+path] (re-matches #"(.+)\.edn" relpath)
                   url (str "https://" auth+path)]]
         [(uri-map-replace url uri-map)
          (delay
            ;; The delay here gives us a performance improvement. We
            ;; only transform installers that are in scope.
            (->>
             (edn/read-string {:readers READERS} (slurp installer-file))
             (postwalk (make-uri-map-replace-walk-fn uri-map))
             ))]))))

(defn to-regex [uri-template]
   (re-pattern
    (str/replace
     uri-template
     #"\{([^\}]+)\}"
     (fn replacer [[_ group]]
       (format "(?<%s>[^/#\\?]+)" (str/replace group "-" ""))))))

(defn lookup [id graph]
  (or
   ;; Can I find the explicit key in the map?
   (when-let [v (some-> graph (get id) deref)] (assoc v :id id))
   ;; Can I match the explict key with a templated key in the map?
   (some (fn [[k v]]
           (when-let [matches (re-matches (to-regex k) id)]
             (assoc @v
                    :id id
                    :params
                    (zipmap
                     (map second (re-seq #"\{([\p{Alpha}-]+)\}" k))
                     (map #(java.net.URLDecoder/decode %) (next matches))))))
         graph)))

(defn namespaced-name [kw]
  (str
   (when-let [ns (namespace kw)]
     (str ns "/"))
   (name kw)))

(defn render-with-required-check [template parameter-map]

  (when-let [missing (seq
                      (set/difference
                       (set (map namespaced-name (selmer/known-variables template)))
                       (set (keys parameter-map))))]
    (throw
     (ex-info
      (format "Required template variables missing: %s" (str/join ", " missing))
      {:missing missing
       :all parameter-map
       :keys (set (keys parameter-map))})))
  (selmer/render template parameter-map))

(defn render-form-templates [form params]
  (->> form
       (prewalk
        (fn [x]
          (cond-> x
            (instance? Pretty x) (-> unwrap (render-form-templates params) (->Pretty))
            (string? x) (render-with-required-check params))))
       ;; Unwrap the templates
       (postwalk
        (fn process [x]
          (cond-> x
            (instance? Template x) unwrap
            (instance? Pretty x) (-> unwrap pprint with-out-str)
            (instance? ParameterReference x) (-> unwrap params))))))

(defn installer-seq [ids graph parameter-map]
  (assert (every? some? ids) (format "Some ids were nil: %s" (pr-str ids)))

  (->> ids
       (mapcat
        (fn [id]
          (let [root (lookup id graph)]
            (when-not root
              (throw
               (ex-info
                (format "Resource not found: %s" id)
                {:id id
                 :keys (sort (keys graph))
                 ;;:ids ids
                 ;;:graph graph

                 :parameter-map parameter-map})))
            ;; From each id, find all descendants
            (reverse                    ; to get depth-first order
             (tree-seq
              some?
              (fn [parent]
                (assert parent)
                (for [dep-id (:deps parent)
                      :let [expanded-dep-id (render-with-required-check
                                             dep-id
                                             (merge parameter-map (:params parent)))
                            dependency (lookup expanded-dep-id graph)
                            _ (when-not dependency
                                (throw
                                 (ex-info
                                  (format "Unsatisfied dependency between '%s' and '%s'" (:id parent) expanded-dep-id)
                                  {:dependant parent
                                   :dependency dep-id
                                   :expanded-dependency expanded-dep-id
                                   :graph (keys graph)})))]]
                  dependency))
              root)))))

       distinct

       (reduce
        (fn [acc {:keys [id install params] :as node}]
          (let [init-data (render-form-templates install (assoc (merge parameter-map params) "$id" id))]
            (when (nil? init-data)
              (throw (ex-info "Nil init data" {:id id})))
            (conj acc (-> node
                          (assoc :juxt.site/init-data init-data)
                          (dissoc :install)))))
        [])))

(defn normalize-uri-map [uri-map]
  (->> uri-map
       (mapcat (fn [[k v]]
                 (if (coll? k)
                   (zipmap k (repeat v))
                   [[k v]])))
       (into {})))

(defn resource-installers [resources uri-map parameter-map]
  (let [normalized-uri-map
        (normalize-uri-map uri-map)

        relocated-resources
        (mapv
         #(uri-map-replace % normalized-uri-map)
         resources)

        installer-map
        (unified-installer-map normalized-uri-map)]

    (installer-seq relocated-resources installer-map parameter-map)))
