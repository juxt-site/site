;; Copyright © 2023, JUXT LTD.

(ns juxt.site.post-openapi-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*] :as client]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [jsonista.core :as json]
   [juxt.site.repl :as repl]
   [clojure.java.io :as io]))

(defn install-openapi! []
  (install-bundles!
   [#_["juxt/site/openapi" {}]
    ["juxt/site/openapis-api" {}]]
   (get CONFIG "uri-map")))

(defn install-openapi-fixture [f]
  (install-openapi!)
  (f))

(use-fixtures :each system-xt-fixture handler-fixture init-fixture admin-token-fixture install-openapi-fixture)

(deftest install-openapi-test
  (let [openapi-file (io/file "../demo/openapi.json")
        openapi (json/read-value (slurp openapi-file))
        data-base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])

        response-body
        (with-bearer-token *admin-token*
          (-> openapi
              (update-in ["servers" 0 "url"] (fn [url] (str data-base-uri url)))
              client/install-openapi!))]

    (is (= "7\r\n" response-body))))
