;; Copyright © 2022, JUXT LTD.

(ns juxt.site.system-api-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :refer [with-session-token] :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-resource-groups! converge!]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [clojure.java.io :as io]
   [juxt.site.jwt :as jwt]
   [xtdb.api :as xt]))

;; Welcome to the System API test suite

;; TODO: Write an explanation of the testing strategy used in this
;; namespace.

;; TODO: Investigate use of test-ns-hook to run ns tests with both
;; implicit and authorization code grants. Until then, let's just use
;; 'authorization code'.

(defn bootstrap []
  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})
  (install-resource-groups! ["juxt/site/system-api"] RESOURCE_SERVER {})

  ;; Need some test users and a way for them to authenticate
  (install-resource-groups!
   ["juxt/site/login-form" "juxt/site/example-users"]
   RESOURCE_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

  ;; Install an authorization server
  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"]
   RESOURCE_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"
    "authorization-code-length" 12
    "jti-length" 12})

  ;; Alice has the System role which confers access to put-user
  (converge!
   ["https://auth.example.test/role-assignments/alice-System"]
   RESOURCE_SERVER
   {})

  ;; ... whereas Bob has the SystemReadonly role which doesn't
  (converge!
   ["https://auth.example.test/role-assignments/bob-SystemReadonly"]
   RESOURCE_SERVER
   {})

  ;; TODO: Analyse the performance cost of install-resource-groups!
  ;; Perhaps optimise by only creating the installer graph once and
  ;; passing it in as a parameter.

  (converge!
   ["https://auth.example.test/clients/global-scope-app"]
   RESOURCE_SERVER
   {"client-type" "public"
    "origin" "https://global-scope-app.example.test"
    "resource-server" "https://data.example.test"
    "redirect-uris" ["https://global-scope-app.example.test/callback"]
    "authorization-server" "https://auth.example.test"
    "scope" nil})

  (converge!
   ["https://auth.example.test/clients/read-only-app"]
   RESOURCE_SERVER
   {"client-type" "public"
    "origin" "https://read-only-app.example.test"
    "resource-server" "https://data.example.test"
    "redirect-uris" ["https://read-only-app.example.test/callback"]
    "authorization-server" "https://auth.example.test"
    "scope" #{"https://auth.example.test/scopes/system/read"}})

  (converge!
   ["https://auth.example.test/clients/read-write-app"]
   RESOURCE_SERVER
   {"client-type" "public"
    "origin" "https://read-write-app.example.test"
    "resource-server" "https://data.example.test"
    "redirect-uris" ["https://read-write-app.example.test/callback"]
    "authorization-server" "https://auth.example.test"
    "scope" #{"https://auth.example.test/scopes/system/read"
              "https://auth.example.test/scopes/system/write"}}))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(deftest system-api-test

  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :session-token session-token
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :client "https://auth.example.test/clients/global-scope-app"})]

    (testing "Access achieved with correct permissions and role assignment"
      (oauth/with-bearer-token access-token
        (let [response
              (*handler*
               {:juxt.site/uri "https://data.example.test/_site/operations"
                :ring.request/method :get
                :ring.request/headers
                {"accept" "application/json"}})]

          (is (= "application/json" (get-in response [:ring.response/headers "content-type"])))
          (is (= 200 (:ring.response/status response)))

          (let [json (some-> response :ring.response/body json/read-value)]
            (is json)
            (is (<= 8 (count json)))
            json))))))

(deftest openapi-json-test
  (let [{:ring.response/keys [status headers body]}
        (*handler*
         {:ring.request/method :get
          :juxt.site/uri "https://data.example.test/_site/openapi.json"})]
    (is (= 200 status))
    (is (= "application/json" (get headers "content-type")))
    (let [json (json/read-value body)]
      (is (= 2 (count (get-in json ["paths" "/users"])))))))

;; So we need a system-api call that will allow us to add a
;; user. We'll still need the site tool to bootstrap users, but it
;; shouldn't be necessary to use the tool for adding new users once
;; the system has been bootstrapped.

;; TODO: Can a client-id be a URI?

;;
(deftest put-user-test

  (let [session-token (login/login-with-form! "alice" "garden")

        {global-scope-access-token "access_token"}
        (oauth/acquire-access-token!
         ;; the read-only-app should not be able to put-user
         {:grant-type "authorization_code"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client "https://auth.example.test/clients/global-scope-app"})

        {read-only-access-token "access_token"}
        (oauth/acquire-access-token!
         ;; the read-only-app should not be able to put-user
         {:grant-type "implicit"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client "https://auth.example.test/clients/read-only-app"})

        {read-write-access-token "access_token"}
        (oauth/acquire-access-token!
         ;; the read-only-app should not be able to put-user
         {:grant-type "implicit"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client "https://auth.example.test/clients/read-write-app"})]

    (testing "Add Hannah"
      (oauth/with-bearer-token read-write-access-token
        (let [payload (.getBytes (pr-str {:xt/id "https://data.example.test/users/hannah"}))
              request {:juxt.site/uri "https://data.example.test/_site/users"
                       :ring.request/method :post
                       :ring.request/headers
                       {"content-type" "application/edn"
                        "content-length" (str (count payload))}
                       :ring.request/body (io/input-stream payload)}
              response (*handler* request)]

          (is (= 200 (:ring.response/status response))))))

    (testing "Hannah has been added to database"
      (oauth/with-bearer-token read-write-access-token
        (let [request {:juxt.site/uri "https://data.example.test/_site/users.json"
                       :ring.request/method :get}
              {:ring.response/keys [status headers body]} (*handler* request)]

          (is (= 200 status))
          (is (= "application/json" (get headers "content-type")))
          (is (= [{"xt/id" "https://data.example.test/users/alice"}
                  {"xt/id" "https://data.example.test/users/bob"}
                  {"xt/id" "https://data.example.test/users/carlos"}
                  {"xt/id" "https://data.example.test/users/hannah"}]
                 (json/read-value body))))))

    (oauth/with-bearer-token read-only-access-token
      (let [payload (.getBytes (pr-str {:xt/id "https://data.example.test/users/rebecca"}))
            request {:juxt.site/uri "https://data.example.test/_site/users"
                     :ring.request/method :post
                     :ring.request/headers
                     {"content-type" "application/edn"
                      "content-length" (str (count payload))}
                     :ring.request/body (io/input-stream payload)}
            {:ring.response/keys [status headers body]} (*handler* request)]

        (is (= 403 status))))))
