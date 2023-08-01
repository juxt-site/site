;; Copyright © 2023, JUXT LTD.

(ns juxt.site.post-openapi-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.handler :refer [handler-fixture *handler*]]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*] :as client]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [jsonista.core :as json]
   [juxt.site.repl :as repl]
   [sci.core :as sci]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [clojure.pprint :refer [pprint]]))

(defn install-openapi! []
  (install-bundles!
   [
    ;; This installs the operation that allows us to install an OpenAPI
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

        _
        (with-bearer-token *admin-token*
          (-> openapi
              (update-in ["servers" 0 "url"] #(str data-base-uri %))
              client/install-openapi!))

        {:ring.response/keys [status body]}
        (*handler*
         {:juxt.site/uri "https://data.example.test/petstore/openapi.json"
          :ring.request/method :get})]

    (is (= status 200))

    (is (= "Swagger Petstore - OpenAPI 3.0"
           (-> body
               json/read-value
               (get-in ["info" "title"]))))))


;; This demonstrates how we can drive the development of an operation
;; with a very fast feedback-loop. This can be run in under 10ms.
(comment
  (let [openapi-file (io/file "../demo/openapi.json")
        openapi (json/read-value (slurp openapi-file))
        data-base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])
        openapi (-> openapi
                    (update-in ["servers" 0 "url"] #(str data-base-uri %)))
        resource (edn/read-string
                  {:readers {'juxt.pprint (fn [x] (with-out-str (pprint x)))}}
                  (slurp (io/file "../installers/auth.example.org/operations/post-openapi.edn")))
        program (get-in resource [:install :juxt.site/input :juxt.site/transact :juxt.site.sci/program])]

    (sci/eval-string
     program
     {:namespaces {'user {'*prepare* {:openapi openapi}
                          'pprint-str (fn [x] (with-out-str (pprint x)))}}})))
