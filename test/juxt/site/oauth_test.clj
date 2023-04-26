;; Copyright © 2022, JUXT LTD.

(ns juxt.site.oauth-test
  (:require
   [clojure.test :refer [deftest is use-fixtures testing]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.installer :refer [call-operation-with-init-data!]]
   [juxt.site.test-helpers.local-files-util :refer [install-installer-groups! converge!]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [xtdb.api :as xt]))

(defn bootstrap []
  (install-installer-groups!
   ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "kid" "test-kid"
    "authorization-code-length" 12
    "jti-length" 12})

  (converge!
   ["https://auth.example.test/scopes/test/read"]
   AUTH_SERVER
   {"description" "Read stuff"
    "operations-in-scope" #{}}))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(deftest register-client-test
  (testing "Register client with generated client-id"
    (let [result
          (call-operation-with-init-data!
           *xt-node*
           {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
            :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
            :juxt.site/input {:juxt.site/client-type "public"
                              :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (nil? (:juxt.site/client-secret doc)))))

  (testing "Register client with generated client-id and client-secret"
    (let [result
          (call-operation-with-init-data!
           *xt-node*
           {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
            :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
            :juxt.site/input {:juxt.site/client-type "confidential"
                              :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (:juxt.site/client-secret doc))))

  ;; TODO: Test with multiple redirect-uris

  (testing "Re-registering the same client-id will succeed"
    (let [input {:juxt.site/client-id "test-app"
                 :juxt.site/client-type "public"
                 :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}]
      (call-operation-with-init-data!
       *xt-node*
       {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
        :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
        :juxt.site/input input})

      (is
       (=
        {:xt/id "https://auth.example.test/clients/test-app"
         :juxt.site/type "https://meta.juxt.site/types/client"
         :juxt.site/client-id "test-app"
         :juxt.site/client-type "public"
         :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}
        (xt/entity (xt/db *xt-node*) "https://auth.example.test/clients/test-app")))

      (call-operation-with-init-data!
       *xt-node*
       {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
        :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
        :juxt.site/input input})))

  (testing "Registration succeeds even if no such scope"
    ;; We limit scope to existing ones upon use, rather than
    ;; up-front. This is a common pattern with XT and Site. We don't
    ;; force upon the user the task of sorting the insertion of
    ;; resources in topographical dependency order.
    (is
     (call-operation-with-init-data!
      *xt-node*
      {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
       :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
       :juxt.site/input {:juxt.site/client-type "public"
                         :juxt.site/redirect-uris ["https://test-app.example.test/callback"]
                         :juxt.site/scope #{"https://auth.example.test/scopes/dummy"}}}))))

(deftest authorization-server-metadata
  ;; oauth-authorization-server is public
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
	     ["https://auth.example.test/scopes/test/read"]
             "response_types_supported" ["code" "token"]
             "response_modes_supported" ["query" "fragment"]
	     "grant_types_supported" ["authorization_code" "implicit" "refresh_token"]
             "token_endpoint_auth_signing_alg_values_supported" ["RS256"]
	     "token_endpoint_auth_methods_supported" ["none" "client_secret_post"]
             "code_challenge_methods_supported" ["S256"]}
            (json/read-value body))))))

#_(with-fixtures
  (call-operation-with-init-data!
   *xt-node*
   {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
    :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
    :juxt.site/input
    {:juxt.site/client-id "test-app"
     :juxt.site/client-type "confidential"
     :juxt.site/resource-server "https://data.example.test"
     :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}})

  (install-resource-groups!
   ["juxt/site/login-form" "juxt/site/user-model" "juxt/site/password-based-user-identity"
    "juxt/site/example-users" "juxt/site/protection-spaces"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
             { ;;:grant-type "authorization_code"
              :grant-type "implicit"
              :authorize-uri "https://auth.example.test/oauth/authorize"
              :session-token session-token
              :client "https://auth.example.test/clients/test-app"})]
    (jwt/decode-jwt access-token)))
