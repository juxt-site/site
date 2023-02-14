;; Copyright © 2023, JUXT LTD.

(ns juxt.installer-tree
  (:require
   [clojure.edn :as edn]
   [selmer.parser :as selmer]
   [clojure.walk :refer [prewalk postwalk]]
   [clojure.set :as set]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [cheshire.core :as json]))

(def READERS
  {'juxt.pprint (fn [x] (with-out-str (pprint x)))
   'juxt.json (fn [x] (json/generate-string x))})

(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https://.*?example.org)(.*)"
   (fn [[_ host path]] (str (get uri-map host host) path))))

;; TODO: Could this be replaced with a lazy version that visited the files directly?
(defn unified-installer-map
  "This converts the existing package structure into a unified map of
  installers."
  [uri-map]
  (let [root (io/file "installers")]
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
           (postwalk #(cond-> % (string? %) (uri-map-replace uri-map)))))]))))

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

(defn render-with-required-check [template parameter-map]
  (when-let [missing (seq
                      (set/difference
                       (set (map namespaced-name (selmer/known-variables template)))
                       (set (keys parameter-map))))]
    (throw (ex-info (format "Required template variables missing: %s" (str/join ", " missing)) {:missing missing :all parameter-map :keys (set (keys parameter-map))})))
  (selmer/render template parameter-map))

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

(defn installer-seq [ids graph parameter-map]
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
            (conj acc (-> node (assoc :juxt.site/init-data init-data)))))
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

;; Just for testing
(defn ^:temp installer-tree []
  (pprint
   (resource-installers
    ["https://auth.example.org/_site/do-operation"
     "https://auth.example.org/_site/subjects/system"
     "https://auth.example.org/_site/operations/create-operation"
     "https://auth.example.org/_site/operations/grant-permission"
     "https://auth.example.org/_site/permissions/system/bootstrap"
     "https://auth.example.org/_site/operations/install-not-found"
     "https://auth.example.org/_site/permissions/system/install-not-found"
     "https://auth.example.org/_site/not-found"
     "https://auth.example.org/_site/operations/get-not-found"
     "https://auth.example.org/_site/permissions/get-not-found"]
    {"https://auth.example.org" "https://auth.site.test"}
    {})))
