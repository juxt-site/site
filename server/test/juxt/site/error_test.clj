;; Copyright © 2023, JUXT LTD.

(ns juxt.site.error-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.repl :as repl]
   [clojure.java.io :as io]))

(defn install-bundles-fixture [f]
  (install-bundles!
   ["juxt/site/bootstrap"
    "juxt/site/api-operations"
    "juxt/site/users-api"]
   RESOURCE_SERVER)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture install-bundles-fixture)

(deftest no-bearer-token-test
  (let [response
        (*handler*
         {:juxt.site/uri "https://data.example.test/_site/users"
          :ring.request/method :get})]
    (is (= 401 (:ring.response/status response)))))

;; Install users
#_(with-fixtures

  (install-bundles!
   ["juxt/site/example-users"]
   RESOURCE_SERVER)

  (repl/ls)

  )
