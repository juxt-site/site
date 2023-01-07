;; Copyright © 2022, JUXT LTD.

(ns juxt.site.package-test
  (:require
   [clojure.edn :as edn]
   [clojure.test :refer [deftest is are testing]]
   [juxt.site.package :as pkg]
   [juxt.site.repl :as repl]
   [clojure.java.io :as io]))

(deftest apply-uri-map-test
  (testing "Fail when uri-map not satisfied"
    (is
     (thrown-with-msg?
      clojure.lang.ExceptionInfo
      #"uri-map is missing some required keys"
      (pkg/apply-uri-map
       (edn/read-string (slurp "packages/juxt/site/whoami/index.edn"))
       {"https://example.org" "https://example.test"})))))

;; Package resolver

#_(defprotocol PackageLoader
  (load-package [_ package-name]))

#_(defrecord LocalFilesystemPackageLoader [dir]
  PackageLoader
  (load-package [_ package-name]
    (pkg/load-package-from-filesystem (io/file dir package-name))))


;; Dependency resolution
