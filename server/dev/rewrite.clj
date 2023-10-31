;; Copyright © 2023, JUXT LTD.

(ns rewrite
  (:require
   [rewrite-clj.node :as n]
   [rewrite-clj.zip :as z]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.edn :as edn]))

(set! *print-namespace-maps* false)

(defn modify-file
  "Call function f with the string contents of the given file"
  [file f]
  (let [file (io/file file)]
    (as-> file %
      (slurp %)
      (f %))))

(defn rewrite-file
  [file f]
  (let [file (io/file file)]
    (as-> file %
      (modify-file % f)
      (spit file %))))

(defn alter-dependency [dep-uri]
  (let [[_ host path] (re-matches #"(https?://.*?)/_site(/.*)" dep-uri)]
    (n/map-node
     [(n/keyword-node :juxt.site/package)
      (n/spaces 1)
      (n/token-node (format "https://repo.juxt.site%s" path))
      (n/newline-node "\n")
      (n/spaces 3)
      (n/keyword-node :juxt.site/host)
      (n/spaces 1)
      (n/token-node host)])))

(defn zloc-map [f zloc]
  (if zloc
    (cons (f zloc) (zloc-map f (z/right zloc)))
    nil))

(defn zloc-reduce [f acc zloc]
  (if zloc
    (zloc-reduce f (f acc zloc) (z/right zloc))
    acc))

(defn zloc-walk [f acc zloc]
  (zloc-reduce
   (fn [acc z]
     (if (z/down z)
       (zloc-walk f acc (z/down z))
       (f acc z)))
   acc
   zloc))

;; We will definitely want different kinds of walks, a further abstraction, such as L-fold upwards walks etc

(defn determine-fn-type [fn-sym]
  ;; TODO manually add more
  (case fn-sym
    clojure.string/lower-case :string
    :any))

(defn guess-sexpr-type [sexpr]
  (cond
    (symbol? sexpr)
    ;;TODO Search for references! we can use them to get more information
    ;; Maybe that should be done in a different pass...
    ;; This may be complex due to scoping
    :any
    
    (string? sexpr)
    ;; TODO can we get better details about the string? zLike for example, the regex match of a uri?
    :string
    
    (map? sexpr)
    (into [:map] (mapv
                  (fn [[k v]]
                    [k (guess-sexpr-type v)])
                  sexpr))

    (vector? sexpr)
    ;; TODO improve this 
    [:vector (guess-sexpr-type (first sexpr))]

    (list? sexpr)
    ;; Assume fn
    ;; TODO Based on the function maybe we can determine the type without reference 
    (determine-fn-type (first sexpr))

    (boolean? sexpr)
    :boolean
    
    :else
    :any))

(defn guess-zloc-type [template zloc nextloc]
  (into template
        {:next (z/sexpr nextloc)
         :next-type (guess-sexpr-type (z/sexpr nextloc))}))

(defn determine-zloc-context [template zloc parentloc]
  ;; TODO we can improve this by an 'unwinding' algorithm
  (into template
        {:parent (z/sexpr parentloc)
         :parent-type
         (cond
           (z/map? parentloc)
           "map"

           (and (z/vector? parentloc)
                (= 3 (count (z/sexpr parentloc)))
                (= (z/sexpr zloc) (second (z/sexpr parentloc))))
           ;; Part of a datalog triple?
           "datalog-triple"

           :else
           ;; TODO destructuring, use in variable to function
           "unknown")}))

(defn analyze-keyword-loc [zloc]
  ;; TODO shouldn't just be parent and the next (which should really say right) 
  (-> {:position (z/position zloc)}
      (determine-zloc-context zloc (z/up zloc))
      (guess-zloc-type zloc (z/next zloc))))

(defn propose-schema [instances]
  ;; TODO expand
  (reduce
   (fn [acc k]
     (cond
       (not= acc :any) acc
       :else (:next-type k)))
   :any
   instances))

(defn analyze-juxt-site-keywords [zloc]
  (update-vals
   (zloc-walk
    (fn [acc z]
      (let [sexpr (z/sexpr z)]
        (if (and (keyword? sexpr) (= "juxt.site" (namespace sexpr)))
          (update acc sexpr #(conj % (analyze-keyword-loc z)))
          acc)))
    {}
    zloc)
   (fn [instances]
     {:count (count instances)
      :instances instances
      :proposed-schema (propose-schema instances)})))


(defn analyze-file [file]
  "
Analyze a file for juxt.site keyword references, and understand the references in context
Algorithm works as follows:
 Collect all juxt.site keywords and for each juxt.site keyword
   1. Understand and define what the context is E.G., is this a datalog triple, a simple assignment, a destructuring, etc
      1a. This can be done by analysis of the structure of the expression
      1b. References to symbols means that further context must be understood, so one will need to look up the context until more symbol references are made by looking backwards ('unwinding') until we can derive the type.
      1c. It is likely we will need a concept of subcontexts
   2. Store that information
   3. Propose a malli schema for that keyword
      3a. Default is :any
      3b. References to juxt.site keywords result in the need for a :ref

"
  (let [fs (slurp (io/file file))
        zloc (z/of-string fs {:track-position? true})]
    ;; (z/sexpr (z/right (z/down zloc)))
    (analyze-juxt-site-keywords zloc)
    
    #_(zloc-walk
       (fn [acc z]
         (if (symbol? (z/sexpr z))
           (conj acc (z/sexpr z))
           acc))
       []
       zloc)))

;; (analyze-file "../installers/data.example.org/_site/bundles.edn")

;; Todoc debug this
;; (analyze-juxt-site-keywords "src/juxt/site/handler.clj")

(defn dep-string->specs [dep-string]
  (let [[_ _ base & suffix] (str/split dep-string #"/")
        suffix (str "/" (str/join "/" suffix))]
    {:juxt.site/base-uri (case base
                           "data.example.org" "https://data.example.org"
                           "auth.example.org" "https://auth.example.org"
                           (throw (ex-info "Invalid Base Uri"
                                           {:base base})))
     :juxt.site/installer-path suffix}))

(def custom-readers {'juxt.pprint #(str "#juxt.pprint " (pr-str %))
                     'juxt.include #(str "#juxt.include " (pr-str %))
                     'juxt.template #(str "#juxt.template " (pr-str %))})

(defn resource-dep-strings-to-specs [file]
  (let [fs (slurp file)
        edn-struct (edn/read-string {:readers custom-readers} fs)
        deps (:deps edn-struct)
        new-deps (vec (for [dep deps]
                        (dep-string->specs dep)))
        old-deps-str (clojure.pprint/cl-format nil "[~{\"~a~^\"\n  ~}" deps)]
    (spit file (str/replace fs (str old-deps-str "\"]") (str/replace (pr-str new-deps) "}" "}\n")))))

#_(resource-dep-strings-to-specs "../installers/auth.example.org/applications/petstore.edn")

(defn get-bundle [bundle-name]
  (get (edn/read-string (slurp "../installers/bundles.edn")) bundle-name))

(defn remove-http-base-uri [base-uri]
  (str/replace base-uri "https://" ""))

(defn bundle-update-installers-deps-strings-to-specs [bundle-name]
  (doall (for [{:juxt.site/keys [base-uri installer-path] :as installer}
               (:juxt.site/installers (get-bundle bundle-name))]
           (resource-dep-strings-to-specs (str "../installers/" (remove-http-base-uri base-uri) installer-path ".edn")))))

#_(bundle-update-installers-deps-strings-to-specs "demo/petstore/operations")

(comment
  (alter-dependency "https://core.example.org/_site/packages/juxt/site/bootstrap"))

(comment
  (doseq [f (file-seq (io/file "packages"))
          :when (and (.isFile f) (= (.getName f) "index.edn"))]
    (try
      (rewrite-file
       f
       (fn [s]
         (if-let [deps (as-> s %
                         (z/of-string %)
                         (z/find-value % z/next :juxt.site/dependencies))]
           (as-> deps %
             (z/next %)
             (z/map (fn [zloc] (z/edit zloc alter-dependency)) %)
             ((comp n/string z/root) %))
           s)))
      (catch Throwable e
        (throw (ex-info "Failed with file" {:file f} e))
        ))
    ))
