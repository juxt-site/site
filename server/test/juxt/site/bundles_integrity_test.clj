;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bundles-integrity-test
  (:require
   [clojure.test :refer [deftest is use-fixtures testing]]
   [clojure.edn :as edn]
   [clojure.java.io :as io]))

(defn get-root-dir []
  ;; Just assume where we're calling the tests from for now, but allow
  ;; an override in future.
  (io/file ".."))

(defn get-installers-dir []
  (io/file (get-root-dir) "installers"))

(defn bundles [dir]
  (edn/read-string (slurp (io/file dir "bundles.edn"))))

(defn get-violations []
  (->>
   (bundles (get-installers-dir))
   (mapcat (fn [[k v]]
             (for [i (:juxt.site/installers v)]
               [i k])))
   (group-by first)
   (map (fn [[i v]]
          (let [bundles (mapv second v)]
            {:installer i
             :count (count bundles)
             :bundles bundles})))
   (remove #(-> % :count (= 1)))))

(deftest zero-violations-test
  (is (empty? (get-violations))))
