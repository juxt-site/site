;; Copyright © 2022, JUXT LTD.

(ns juxt.site.system-api-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.test.util
    :refer [system-xt-fixture with-session-token with-bearer-token
            *handler* handler-fixture
            with-fixtures
            install-resource-groups! install-resource-with-operation! converge!
            AUTH_SERVER RESOURCE_SERVER]]
   [xtdb.api :as xt]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest system-api-test

  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})
  (install-resource-groups! ["juxt/site/system-api"] RESOURCE_SERVER {})

  (testing "Users API endpoint cannot be accessed anonymously"
    (let [response
          (*handler*
           {:juxt.site/uri "https://data.example.test/_site/users"
            :ring.request/method :get})]
      (is (= 401 (:ring.response/status response)))
      (is (= "Bearer" (get-in response [:ring.response/headers "www-authenticate"])))))

  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"
    "juxt/site/login-form"
    "juxt/site/example-users"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"
    "authorization-code-length" 12
    "jti-length" 12})

  (install-resource-groups!
   ["juxt/site/example-apps"]
   AUTH_SERVER
   {"client-type" "public"
    "origin" "https://test-app.example.test"
    "resource-server" "https://data.example.test"
    "redirect-uris-as-csv" "https://test-app.example.test/callback"
    "authorization-server" "https://auth.example.test"})

  (let [login-result
        (login/login-with-form!
         *handler*
         "username" "alice"
         "password" "garden"
         :juxt.site/uri "https://auth.example.test/login-with-form")

        session-token (:juxt.site/session-token login-result)
        _ (assert session-token)

        {access-token "access_token"}
        (with-session-token
          session-token
          (oauth/authorize!
           "https://auth.example.test/oauth/authorize"
           {"client_id" "test-app"}))]

    (testing "Permissions are required for access"
      (with-bearer-token access-token
        (let [response
              (*handler*
               {:juxt.site/uri "https://data.example.test/_site/users"
                :ring.request/method :get
                :ring.request/headers
                {"accept" "application/json"}})]

          ;; This access token is not sufficient, so we get a 403
          (is (= 403 (:ring.response/status response))))))

    (converge!
     ["https://auth.example.test/role-assignments/alice-SystemReadonly"]
     AUTH_SERVER
     {})

    (testing "Access achieved with correct permissions and role assignment"
      (with-bearer-token access-token
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
