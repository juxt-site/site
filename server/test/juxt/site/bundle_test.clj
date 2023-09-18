;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bundle-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.init :as init]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.local-files-util :as local]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [xtdb.api :as xt]
   [juxt.site.repl :as repl]
   [clojure.pprint :refer [pprint]]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest catch-missing-dependency-test
  (try
    (local/install-bundles!
     [["juxt/site/bootstrap" {}]
      "juxt/site/endpoints-api"]
     (get init/CONFIG "uri-map"))
    (catch Exception e
      (is (= "https://auth.example.test/operations/get-api-endpoints"
             (:dependency (ex-data e)))))))

(deftest put-bundle-test
  (local/install-bundles!
   [["juxt/site/bootstrap" {}]]
   (get init/CONFIG "uri-map"))

  )
