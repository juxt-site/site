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
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [clojure.java.io :as io]
   [juxt.site.jwt :as jwt]))

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

  ;; TODO: Analyse the performance cost of install-resource-groups!
  ;; Perhaps optimise by only creating the installer graph once and
  ;; passing it in as a parameter.

  (converge!
   ["https://auth.example.test/clients/test-app"]
   RESOURCE_SERVER
   {"client-type" "public"
    "origin" "https://test-app.example.test"
    "resource-server" "https://data.example.test"
    "redirect-uris" ["https://test-app.example.test/callback"]
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
    "scope" #{"https://auth.example.test/scopes/system/read"}}))

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
          :client "https://auth.example.test/clients/test-app"})]

    (testing "Permissions are required for access"
      (oauth/with-bearer-token access-token
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

;;deftest put-user-test
#_(with-fixtures

  (let [session-token (login/login-with-form! "alice" "garden")]
    (oauth/acquire-access-token!
     ;; the read-only-app should not be able to put-user
     {:session-token session-token
      :client "https://auth.example.test/clients/read-only-app"
      :grant-type "implicit"})

    #_(with-session-token session-token
      (oauth/implicit-authorize!
       "https://auth.example.test/oauth/authorize"
       ;; the test-app has global scope
       {"client_id" "test-app"})))



  ;; TODO: Can a client-id be a URI?
  #_(let [session-token (login/login-with-form! "alice" "garden")

          {test-app-access-token "access_token"}
          (with-session-token session-token
            (oauth/implicit-authorize!
             "https://auth.example.test/oauth/authorize"
             ;; the test-app has global scope
             {"client_id" "test-app"}))

          {read-only-app-access-token "access_token"}
          (with-session-token session-token
            ;; TODO: How to request a scope? See oauth_grants_test.clj
            (oauth/acquire-access-token!
             "https://auth.example.test/oauth/authorize"
             ;; the read-only-app should not be able to put-user
             {:client "read-only-app"}))]

      (converge!
       ["https://auth.example.test/role-assignments/alice-System"]
       RESOURCE_SERVER
       {})

      (testing "Add Terry"
        (oauth/with-bearer-token test-app-access-token
          (let [payload (.getBytes (pr-str {:xt/id "https://data.example.test/users/terry"}))
                request {:juxt.site/uri "https://data.example.test/_site/users"
                         :ring.request/method :post
                         :ring.request/headers
                         {"content-type" "application/edn"
                          "content-length" (str (count payload))}
                         :ring.request/body (io/input-stream payload)}
                response (*handler* request)]

            (is (= 200 (:ring.response/status response))))))

      (testing "Terry has been added to database"
        (oauth/with-bearer-token read-only-app-access-token
          (let [request {:juxt.site/uri "https://data.example.test/_site/users.json"
                         :ring.request/method :get}
                {:ring.response/keys [status headers body]} (*handler* request)]

            (is (= 200 status))
            (is (= "application/json" (get headers "content-type")))
            (is (= [{"xt/id" "https://data.example.test/users/alice"}
                    {"xt/id" "https://data.example.test/users/bob"}
                    {"xt/id" "https://data.example.test/users/carlos"}
                    {"xt/id" "https://data.example.test/users/terry"}]
                   (json/read-value body))))))

      ;; Inspect the token, to see if it has some scope

      ;; Seems that we don't have the correct scope in the token.
      ;; Let's see if it's to do with our use of the implicit flow.
      ;; Let's use the authorization_code flow and see what the result is.
      ;; If it contains scope, all good. If it doesn't, this is wrong.
      ;; The access-token should contain the scope if the client is limited in scope.
      ;; A client might be written in such a way to alter behaviour (show/hide details) based on the scope.
      ;; It is important that such a client can introspect the scope in the access-token.
      ;; If it is nil, the client should assume that is has global scope.
      ;; Either way, we must fix the implicit flow.

      ;; Plus, let's have some tests around scope in the JWT

      (let [jwt (jwt/decode-jwt read-only-app-access-token)
            jti (get-in jwt [:claims "jti"])]
        {:jwt jwt
         :token-in-db (repl/e (str "https://auth.example.test/access-tokens/" jti))}
        )

      ;;
      #_(json/read-value
         (:ring.response/body
          (with-session-token session-token
            (*handler*
             (oauth/make-token-info-request {"token" read-only-app-access-token})))))

      ;; This shouldn't work
      #_(testing "Add Ursula"
          (oauth/with-bearer-token read-only-app-access-token
            (let [payload (.getBytes (pr-str {:xt/id "https://data.example.test/users/ursula"}))
                  request {:juxt.site/uri "https://data.example.test/_site/users"
                           :ring.request/method :post
                           :ring.request/headers
                           {"content-type" "application/edn"
                            "content-length" (str (count payload))}
                           :ring.request/body (io/input-stream payload)}
                  response (*handler* request)]

              (select-keys response [:ring.response/status :ring.response/headers])
              ;; What is the scope of the read-only-app-access-token?

              ;;(jwt/decode-jwt read-only-app-access-token)
              ;;(is (= 200 (:ring.response/status response)))
              )))

      ;; TODO: Check that the read-only-app cannot add Ursula

      ))
