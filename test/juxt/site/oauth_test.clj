;; Copyright © 2022, JUXT LTD.

(ns juxt.site.oauth-test
  (:require
   [clojure.test :refer [deftest is use-fixtures testing]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.test.util
    :refer [system-xt-fixture
            with-session-token with-bearer-token
            with-fixtures *handler* *xt-node* handler-fixture
            install-resource-groups!
            install-resource-with-operation!
            AUTH_SERVER RESOURCE_SERVER]]
   [xtdb.api :as xt]))

(defn bootstrap []
  (install-resource-groups!
   ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"
    "authorization-code-length" 12
    "jti-length" 12}))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(deftest register-client-test
  (testing "Register client with generated client-id"
    (let [result
          (install-resource-with-operation!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/operations/oauth/register-client"
           {:juxt.site/client-type "public"
            :juxt.site/redirect-uris ["https://test-app.example.test/callback"]})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (nil? (:juxt.site/client-secret doc)))))

  (testing "Register client with generated client-id and client-secret"
    (let [result
          (install-resource-with-operation!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/operations/oauth/register-client"
           {:juxt.site/client-type "confidential"
            :juxt.site/redirect-uris ["https://test-app.example.test/callback"]})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (:juxt.site/client-secret doc))))

  ;; TODO: Test with multiple redirect-uris

  (testing "Re-registering the same client-id will succeed"
    (let [input {:juxt.site/client-id "test-app"
                 :juxt.site/client-type "public"
                 :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}]
      (install-resource-with-operation!
       "https://auth.example.test/_site/subjects/system"
       "https://auth.example.test/operations/oauth/register-client"
       input)

      (is
       (=
        {:xt/id "https://auth.example.test/clients/test-app"
         :juxt.site/type "https://meta.juxt.site/types/client"
         :juxt.site/client-id "test-app"
         :juxt.site/client-type "public"
         :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}
        (xt/entity (xt/db *xt-node*) "https://auth.example.test/clients/test-app")))

      (install-resource-with-operation!
       "https://auth.example.test/_site/subjects/system"
       "https://auth.example.test/operations/oauth/register-client"
       input)))

  (testing "Registration succeeds even if no such scope"
    ;; We limit scope to existing ones upon use, rather than
    ;; up-front. This is a common pattern with XT and Site. We don't
    ;; force upon the user the task of sorting the insertion of
    ;; resources in topographical dependency order.
    (is
     (install-resource-with-operation!
      "https://auth.example.test/_site/subjects/system"
      "https://auth.example.test/operations/oauth/register-client"
      {:juxt.site/client-type "public"
       :juxt.site/redirect-uris ["https://test-app.example.test/callback"]
       :juxt.site/scope ["https://auth.example.test/scopes/dummy"]}))))

(deftest authorization-server-metadata
  ;; token-info is public
  (testing "RFC 8414: Authorization Server Metadata"
    (let [{:ring.response/keys [status headers body]}
          (*handler* {:ring.request/method :get
                      :juxt.site/uri "https://auth.example.test/.well-known/oauth-authorization-server"})]
      (is (= 200 status))
      (is (= "application/json" (get headers "content-type")))
      (is (= {"issuer" "https://auth.example.test"
              "authorization_endpoint" "https://auth.example.test/oauth/authorize"
              "token_endpoint" "https://auth.example.test/oauth/token"
              "jwks_uri" "https://auth.example.test/.well-known/jwks.json"
              "scopes_supported"
	      ["https://auth.example.test/scopes/system/read"
	       "https://auth.example.test/scopes/system/write"]
              "response_types_supported" ["code" "token"]
              "response_modes_supported" ["query" "fragment"]
	      "grant_types_supported" ["authorization_code" "implicit" "refresh_token"]
              "token_endpoint_auth_signing_alg_values_supported" ["RS256"]
	      "token_endpoint_auth_methods_supported" ["none" "client_secret_post"]
              "code_challenge_methods_supported" ["S256"]}
             (json/read-value body))))))

(deftest scope-test
  (is (=
       {:juxt.site/description "Read system info"
        :juxt.site/operations
        #{"https://auth.example.test/operations/get-users"
          "https://auth.example.test/operations/get-operations"},
        :juxt.site/type "https://meta.juxt.site/types/scope",
        :xt/id "https://auth.example.test/scopes/system/read"}
       (repl/e "https://auth.example.test/scopes/system/read"))))

;; This test might not really belong here.
(deftest get-subject-test
  ;; Register an application
  ;; TODO: Only temporary while moving init below pkg
  (install-resource-with-operation!
   "https://auth.example.test/_site/subjects/system"
   "https://auth.example.test/operations/oauth/register-client"
   {:juxt.site/client-id "test-app"
    :juxt.site/client-type "confidential"
    :juxt.site/resource-server "https://data.example.test"
    :juxt.site/redirect-uris ["https://test-app.example.test/callback"]})

  ;; Now we need some mechanism to authenticate with the authorization server in
  ;; order to authorize applications and acquire tokens.
  (install-resource-groups!
   ["juxt/site/login-form" "juxt/site/user-model" "juxt/site/password-based-user-identity"
    "juxt/site/example-users" "juxt/site/protection-spaces"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

  (install-resource-groups! ["juxt/site/whoami"] RESOURCE_SERVER {})

  (let [login-result
        (login/login-with-form!
         *handler*
         "username" "alice"
         "password" "garden"
         :juxt.site/uri "https://auth.example.test/login-with-form")

        session-token (:juxt.site/session-token login-result)
        _ (assert session-token)

        {access-token "access_token"}
        (with-session-token session-token
          (oauth/implicit-authorize!
           "https://auth.example.test/oauth/authorize"
           {"client_id" "test-app"}))]

    (with-bearer-token access-token
      (let [{:ring.response/keys [headers body]}
            (*handler*
             {:juxt.site/uri "https://data.example.test/whoami"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/json"}})]

        (is (= "Alice"
               (-> body
                   json/read-value
                   (get-in ["juxt.site/subject"
                            "juxt.site/user-identity"
                            "juxt.site/user"
                            "name"
                            ]))))
        (is (= "application/json" (get headers "content-type")))
        (is (= "https://data.example.test/whoami.json" (get headers "content-location"))))

      (let [{:ring.response/keys [status headers]}
            (*handler*
             {:juxt.site/uri "https://data.example.test/whoami.html"
              :ring.request/method :get
              :ring.request/headers
              {"authorization" (format "Bearer %s" access-token)
               }})]
        (is (= 200 status))
        (is (= "text/html;charset=utf-8" (get headers "content-type")))))))
