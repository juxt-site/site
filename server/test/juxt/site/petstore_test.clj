;; Copyright © 2022, JUXT LTD.

(ns juxt.site.petstore-test
  (:require
   [clojure.java.io :as io]
   [clojure.test :refer [deftest is are use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*] :as client]
   [clojure.walk :refer [postwalk]]
   [juxt.site.install.common-install-util :as ciu]))

(defn install-openapi! []
  (install-bundles!
   ["juxt/site/system-api-openapi"
    "juxt/site/login-form"
    "juxt/site/example-users"
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
        "authorization-code-length" 12
        "jti-length" 12}]
    "juxt/site/oauth-token-endpoint"]
   (get CONFIG "uri-map")))

(defn install-petstore! []
  (let [openapi-file (io/file "../demo/petstore/openapi.json")
        openapi (json/read-value (slurp openapi-file))
        data-base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])

        _
        (with-bearer-token *admin-token*
          (let [mapped-openapi (update-in openapi ["servers" 0 "url"] #(str data-base-uri %))
                mapped-openapi
                (postwalk (ciu/make-uri-map-replace-walk-fn
                           (get CONFIG "uri-map"))
                          mapped-openapi)]
            (client/install-openapi! mapped-openapi)))]
    (install-bundles!
     ["demo/petstore/operations"
      ;; Alice is a Petstore Owner
      ["juxt/site/user-role-assignment"
       {"username" "alice"
        "rolename" "SiteAdmin"}]
      ["juxt/site/user-role-assignment"
       {"username" "alice"
        "rolename" "PetstoreOwner"}]
      "juxt/site/system-test-clients"
      ["juxt/site/application-role-assignment"
       {"clientid" "site-cli"
        "rolename" "SiteSystemQuery"}]]
     (get CONFIG "uri-map"))))

(defn install-openapi-fixture [f]
  (install-openapi!)
  (install-petstore!)
  (f))

(use-fixtures :each system-xt-fixture handler-fixture init-fixture admin-token-fixture install-openapi-fixture)

(deftest get-petstore-test
  (let [{:ring.response/keys [status body]}
        (*handler*
         {:juxt.site/uri "https://data.example.test/petstore/openapi.json"
          :ring.request/method :get})]
    
    (is (= status 200))
    (is (= "Swagger Petstore - OpenAPI 3.0"
           (-> body
               json/read-value
               (get-in ["info" "title"]))))
    (is (= "https://data.example.test/petstore"
           (-> body
               json/read-value
               (get-in ["servers" 0 "url"]))))))

(deftest add-pet-test
  (let [dog {:id 10 :name "doggie"}
        session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "password"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client (str "https://auth.example.test/applications/global-scope-app")
          :username "alice"
          :password "garden"})]
    (with-bearer-token access-token
      (let [payload (json/write-value-as-bytes dog json/keyword-keys-object-mapper)
            request {:juxt.site/uri "https://data.example.test/petstore/pet"
                     :ring.request/method :post
                     :ring.request/headers
                     {"content-type" "application/json"
                      "content-length" (str (count payload))
                      "accept" "application/json"}
                     :ring.request/body (io/input-stream payload)}
            response (*handler* request)]
        (is (= 200 (:ring.response/status response)))))))

(deftest get-pet-test
  (let [dog {:id 10 :name "doggie" :status "available"}
        session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "password"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client (str "https://auth.example.test/applications/global-scope-app")
          :username "alice"
          :password "garden"})]
    (with-bearer-token access-token
      (let [payload (json/write-value-as-bytes dog json/keyword-keys-object-mapper)
            request {:juxt.site/uri "https://data.example.test/petstore/pet"
                     :ring.request/method :post
                     :ring.request/headers
                     {"content-type" "application/json"
                      "content-length" (str (count payload))
                      "accept" "application/json"}
                     :ring.request/body (io/input-stream payload)}
            _ (*handler* request)
            request {:juxt.site/uri "https://data.example.test/petstore/pet/10"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (= dog (dissoc (json/read-value body json/keyword-keys-object-mapper) :xt/id)))
        ))))


(deftest find-by-status-test
  (let [dogs [{:id 1 :name "doggie" :status "available"}
              {:id 2 :name "doggie2" :status "pending"}
              {:id 3 :name "doggie3" :status "available"}]
        session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "password"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client (str "https://auth.example.test/applications/global-scope-app")
          :username "alice"
          :password "garden"})]
    (with-bearer-token access-token
      (doall (for [dog dogs]
               (let [payload (json/write-value-as-bytes dog json/keyword-keys-object-mapper)
                     request {:juxt.site/uri "https://data.example.test/petstore/pet"
                              :ring.request/method :post
                              :ring.request/headers
                              {"content-type" "application/json"
                               "content-length" (str (count payload))
                               "accept" "application/json"}
                              :ring.request/body (io/input-stream payload)}
                     _ (*handler* request)])))
        
        (let [request {:juxt.site/uri "https://data.example.test/petstore/pet/findByStatus"
                       :ring.request/method :get
                       :ring.request/headers
                       {"accept" "application/json"}}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status))
          (is (= [(first dogs) (nth dogs 2)]
                 (map #(dissoc % :xt/id) (json/read-value body json/keyword-keys-object-mapper))))
          ))))
