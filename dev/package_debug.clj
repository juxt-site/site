;; Copyright © 2023, JUXT LTD.

(ns package-debug
  (:require
   [clojure.string :as str]
   [juxt.site.package :as pkg]
   [juxt.test.util :as util]
   [jsonista.core :as json]
   [clojure.pprint :refer [pprint]]
   [clojure.walk :refer [postwalk]]
   [clojure.java.io :as io]
   [clojure.edn :as edn]))

#_(util/with-xt
  (pkg/install-package-from-filesystem!
   "packages/juxt/site/system-api"
   util/*xt-node*
   {"https://core.example.org" "https://core.example.org"
    "https://example.org" "https://example.org"
    "https://auth.example.org" "https://auth.example.org"}))

;; Let's visit all files and build one big dependency graph - then converge



;; TODO: Get system-api test working again, but not via packages, via a packages_shim proxy
