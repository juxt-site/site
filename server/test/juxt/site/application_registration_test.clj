;; Copyright © 2023, JUXT LTD.

(ns juxt.site.application-registration-test
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]))

(defn bootstrap []
  (install-bundles!
   ["juxt/site/bootstrap"
    "juxt/site/oauth-scope"
    "juxt/site/unprotected-resources"
    "juxt/site/protection-spaces"
    "juxt/site/selmer-templating"
    "juxt/site/user-model"
    "juxt/site/roles"
    "juxt/site/oauth-token-endpoint"
    "juxt/site/resources-api"
    "juxt/site/applications-api"
    "juxt/site/applications-endpoint"
    "juxt/site/testing/system-permissions"
    "juxt/site/testing/test-admin-client"
    "juxt/site/oauth-token-endpoint"
    ["juxt/site/keypair" {"kid" "test-kid"}]]
   RESOURCE_SERVER))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(defn get-apps []
  (let [request {:juxt.site/uri "https://data.example.test/_site/applications"
                 :ring.request/method :get
                 :ring.request/headers
                 {"accept" "application/json"}}
        response (*handler* request)
        status (:ring.response/status response)
        _ (when-not (= 200 status)
            (throw (ex-info "Unexpected response status" {:status status :response response})))]

    (json/read-value (:ring.response/body response) (json/object-mapper {:decode-key-fn keyword}))))

(deftest application-registration-test

  (oauth/with-bearer-token
    (oauth/request-token-with-client-credentials
     "https://auth.example.test/oauth/token"
     {:client-id "test-admin-client"
      :client-secret "secret"})

    (let [apps (get-apps)]
      (is (= 1 (count apps)))
      (is (= {:xt/id "https://auth.example.test/applications/test-admin-client"
              :juxt.site/resource-server "https://data.example.test"
              :juxt.site/authorization-server "https://auth.example.test"
              :juxt.site/client-type "confidential"
              :juxt.site/bundle "https://data.example.test/bundles/juxt/site/testing/test-admin-client"
              :juxt.site/type "https://meta.juxt.site/types/application"
              :juxt.site/client-id "test-admin-client"
              :juxt.site/client-secret "secret"}
             (first apps))))

    (let [payload (.getBytes (pr-str {:juxt.site/client-id "my-new-app"
                                      :juxt.site/client-type "confidential"}))
          request {:juxt.site/uri "https://data.example.test/_site/applications"
                   :ring.request/method :post
                   :ring.request/headers
                   {"content-type" "application/edn"
                    "content-length" (str (count payload))}
                   :ring.request/body (io/input-stream payload)}
          response (*handler* request)]
      (is (= 201 (:ring.response/status response))))

    (is (= [{:xt/id "https://auth.example.test/applications/my-new-app",
             :juxt.site/type "https://meta.juxt.site/types/application"
             :juxt.site/client-id "my-new-app",
             :juxt.site/client-type "confidential",

             :juxt.site/resource-server "https://data.example.test"
             :juxt.site/authorization-server "https://auth.example.test"}

            {:xt/id "https://auth.example.test/applications/test-admin-client"
             :juxt.site/type "https://meta.juxt.site/types/application"
             :juxt.site/client-id "test-admin-client"
             :juxt.site/bundle "https://data.example.test/bundles/juxt/site/testing/test-admin-client"
             :juxt.site/client-type "confidential"
             :juxt.site/resource-server "https://data.example.test"
             :juxt.site/authorization-server "https://auth.example.test"}]

           (->> (get-apps) (sort-by :xt/id) (map #(dissoc % :juxt.site/client-secret)))))))
