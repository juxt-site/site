;; Copyright © 2023, JUXT LTD.

(ns rewrite
  (:require
   [rewrite-clj.node :as n]
   [rewrite-clj.zip :as z]
   [clojure.java.io :as io]))

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

(defn collect-juxt-site-keywords [s]
  (map
   (comp #(keyword "juxt.site" %) name keyword)
   (re-seq #":juxt.site\/[^\s]+" s)))

(defn keyword-locs [zloc kw]
  (when-let [nextloc (z/find-value zloc z/next kw)]
    (cons nextloc (keyword-locs (z/next nextloc) kw))))

(defn determine-fn-type [fn-sym]
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
  (-> {:position (z/position zloc)}
      (determine-zloc-context zloc (z/up zloc))
      (guess-zloc-type zloc (z/next zloc))))

(defn assess-instances-for-schema [kw-map]
  ;; TODO expand
  (assoc kw-map
         :proposed-schema
         (reduce
          (fn [acc k]
            (cond
              (not= acc :any) acc
              :else (:next-type k)))
          :any
          (:instances kw-map))))

(defn analyze-juxt-site-keywords [file]
  ;; Finds all references to keywords in a file, analyzes them
  ;; Issues with this method
  ;; 1. Only capturing direct references, what if stored in a variable and used later?
  ;; 2. Can mostly only analyze vectors and maps right now, otherwise it's difficult to deduce the type being used
  ;; 3. No guarantee of correctness, this is more speculative, and constrained
  (let [fs (slurp (io/file file))
        keywords (collect-juxt-site-keywords fs)
        zloc (z/of-string fs {:track-position? true})]
    (map
     #'assess-instances-for-schema
     (sort-by :count
              #(compare %2 %1)
              (map
               (fn [kw]
                 (let [locs
                       ;; Right now only return naive assignments
                       (map analyze-keyword-loc (keyword-locs zloc kw))]
                   {:keyword kw
                    :count (count locs)
                    :instances locs}))
               (set keywords))))))

(analyze-juxt-site-keywords "src/juxt/site/operations.clj")

(analyze-juxt-site-keywords "../installers/auth.example.org/operations/oauth/create-access-token.edn")

#_(defn analyze-juxt-site-symbols [file]
  (let [fs (slurp (io/file file))
        ]))

;; Todoc debug this
;; (analyze-juxt-site-keywords "src/juxt/site/handler.clj")

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
