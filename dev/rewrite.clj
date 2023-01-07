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
  (let [[_ host path] (re-matches #"(https://.*?)/_site(/.*)" dep-uri)]
    (n/map-node
     [(n/keyword-node :juxt.site/package)
      (n/spaces 1)
      (n/token-node (format "https://repo.juxt.site%s" path))
      (n/newline-node "\n")
      (n/spaces 3)
      (n/keyword-node :juxt.site/host)
      (n/spaces 1)
      (n/token-node host)])))

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
