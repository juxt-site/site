;; Copyright © 2022, JUXT LTD.

(ns juxt.site.oauth-test
  (:require
   [clojure.java.io :as io]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [jsonista.core :as json]
   [juxt.site.jwt :as jwt]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.site.util :refer [make-nonce]]
   [juxt.test.util
    :refer [system-xt-fixture
            with-session-token with-bearer-token
            with-fixtures *handler* *xt-node* handler-fixture
            install-resource-groups!
            install-resource-with-operation!
            AUTH_SERVER RESOURCE_SERVER]]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest register-client-test
  (install-resource-groups!
   ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"})

  (testing "Register client with generated client-id"
    (let [result
          (install-resource-with-operation!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/operations/register-client"
           {:juxt.site/client-type "public"
            :juxt.site/redirect-uri "https://test-app.example.test/callback"})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (nil? (:juxt.site/client-secret doc)))))

  (testing "Register client with generated client-id and client-secret"
    (let [result
          (install-resource-with-operation!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/operations/register-client"
           {:juxt.site/client-type "confidential"
            :juxt.site/redirect-uri "https://test-app.example.test/callback"})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (:juxt.site/client-secret doc))))

  (testing "Re-registering the same client-id will fail"
    (let [input {:juxt.site/client-id "test-app"
                 :juxt.site/client-type "public"
                 :juxt.site/redirect-uri "https://test-app.example.test/callback"}]
      (install-resource-with-operation!
       "https://auth.example.test/_site/subjects/system"
       "https://auth.example.test/operations/register-client"
       input)

      (is
       (=
        {:juxt.site/type "https://meta.juxt.site/types/client"
         :juxt.site/client-id "test-app"
         :juxt.site/client-type "public"
         :juxt.site/redirect-uri "https://test-app.example.test/callback"
         :xt/id "https://auth.example.test/clients/test-app"}
        (xt/entity (xt/db *xt-node*) "https://auth.example.test/clients/test-app")))

      (is
       (thrown?
        clojure.lang.ExceptionInfo
        (install-resource-with-operation!
         "https://auth.example.test/_site/subjects/system"
         "https://auth.example.test/operations/register-client"
         input))))))

(deftest get-subject-test

  ;; Build the authorization server (https://auth.example.test)
  (install-resource-groups!
   ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"})

  ;; Register an application
  ;; TODO: Only temporary while moving init below pkg
  (install-resource-with-operation!
   "https://auth.example.test/_site/subjects/system"
   "https://auth.example.test/operations/register-client"
   {:juxt.site/client-id "test-app"
    :juxt.site/client-type "confidential"
    :juxt.site/redirect-uri "https://test-app.example.test/callback"
    :juxt.site/resource-server "https://data.example.test"})

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
          (oauth/authorize!
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

(deftest access-token-grants-test

  (let [redirect-uri "https://test-app.test.com/redirect.html"
        init-kid "test-kp-123"]

    (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})

    (install-resource-groups!
     ["juxt/site/oauth-authorization-server"
      "juxt/site/login-form"
      "juxt/site/example-users"]
     AUTH_SERVER
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
      "keypair" (str "https://auth.example.test/keypairs/" init-kid)})

    (install-resource-groups!
     ["juxt/site/example-apps"]
     AUTH_SERVER
     {"client-type" "public"
      "origin" "https://test-app.test.com"
      "resource-server" "https://data.example.test"
      "authorization-server" "https://auth.example.test"
      "redirect-uri" redirect-uri})

    ;; token-info is public
    (testing "RFC 8414: Authorization Server Metadata"
      (let [{:ring.response/keys [status headers body]}
            (*handler* {:ring.request/method :get
                        :juxt.site/uri "https://auth.example.test/.well-known/oauth-authorization-server"})]
        (assert (is (= 200 status)))
        (assert (is (= "application/json" (get headers "content-type"))))
        (assert (is (= {"issuer" "https://auth.example.test",
                        "authorization_endpoint" "https://auth.example.test/oauth/authorize",
                        "token_endpoint" "https://auth.example.test/oauth/token",
                        "jwks_uri" "https://auth.example.test/.well-known/jwks.json"}
                       (json/read-value body))))))

    ;; TODO: Errors

    ;; Subsequent tests require a login
    (let [login-result
          (login/login-with-form!
           *handler*
           "username" "alice"
           "password" "garden"
           :juxt.site/uri "https://auth.example.test/login-with-form")

          session-token (:juxt.site/session-token login-result)
          _ (assert session-token)]

      (testing "token response"
        (let [state (make-nonce 10)

              authorization-request
              {:ring.request/method :get
               :juxt.site/uri "https://auth.example.test/oauth/authorize"
               :ring.request/query
               (codec/form-encode
                {"response_type" "token"
                 "client_id" "test-app"
                 "state" state
                 })}

              {:ring.response/keys [status headers]}
              (with-session-token session-token
                (*handler* authorization-request))

              _ (assert (is (= 303 status)))
              _ (assert (is (= "https://test-app.test.com" (get headers "access-control-allow-origin"))))

              {:strs [location]} headers

              [_ location-uri fragment] (re-matches #"(https://.+?)#(.*)" location)

              _ (assert (is (= redirect-uri location-uri)))

              fragment-params (codec/form-decode fragment)

              _ (assert (is (= state (get fragment-params "state"))))
              _ (assert (is (= "bearer" (get fragment-params "token_type"))))

              access-token (get fragment-params "access_token")
              _ (assert (is access-token))

              db (xt/db *xt-node*)

              _ (assert (is (= init-kid (jwt/get-kid access-token))))

              kp (jwt/lookup-keypair db init-kid)
              _ (assert (is (:xt/id kp)))

              jwt (jwt/verify-jwt access-token kp)

              {:strs [alg kid typ]} (:header jwt)
              _ (assert (is (= "RS256" alg)))
              _ (assert (is (= init-kid kid)))
              _ (assert (is (= "at+jwt" typ)))

              {:strs [aud iss]
               client-id "client_id"} (:claims jwt)

              _ (assert (is (= "https://auth.example.test" iss)))
              _ (assert (is (= "https://data.example.test" aud)))
              _ (assert (is (= "test-app" client-id)))]))

      (testing "code response"
        (let [state (make-nonce 10)

              authorization-request
              {:ring.request/method :get
               :juxt.site/uri "https://auth.example.test/oauth/authorize"
               :ring.request/query
               (codec/form-encode
                {"response_type" "code"
                 "client_id" "test-app"
                 "state" state})}

              {:ring.response/keys [status headers]}
              (with-session-token session-token
                (*handler* authorization-request))

              _ (assert (is (= 303 status)))
              _ (assert (is (= "https://test-app.test.com" (get headers "access-control-allow-origin"))))

              {:strs [location]} headers

              [_ location-uri query-string] (re-matches #"(https://.+?)\?(.*)" location)

              _ (assert (is (= redirect-uri location-uri)))

              query-params (codec/form-decode query-string)

              _ (assert (is (= state (get query-params "state"))))

              code (get query-params "state")
              _ (assert (is code))

              ;; TODO: Test various combinations to tease out all the possible errors

              token-request-payload
              (codec/form-encode
               {"grant_type" "authorization_code"
                "code" code
                "redirect_uri" redirect-uri
                "client_id" "test-app"})

              token-request
              {:ring.request/method :post
               :juxt.site/uri "https://auth.example.test/oauth/token"
               :ring.request/headers
               {"content-type" "application/x-www-form-urlencoded"
                "content-length" (str (count (.getBytes token-request-payload)))}
               :ring.request/body (io/input-stream (.getBytes token-request-payload))
               }

              {:ring.response/keys [status headers body]}
              (with-session-token session-token
                (*handler* token-request))

              _ (assert (is (= "https://test-app.test.com" (get headers "access-control-allow-origin"))))

              _ (assert (is (= 200 status)))

              token-response-payload-as-json (json/read-value body)
              _ (assert (is (map? token-response-payload-as-json)))

              access-token (get token-response-payload-as-json "access_token")
              _ (assert (is access-token))

              expires-in (get token-response-payload-as-json "expires_in")
              _ (assert (is expires-in))
              _ (assert (is (= (* 15 60) expires-in)))

              db (xt/db *xt-node*)

              _ (assert (is (= init-kid (jwt/get-kid access-token))))

              kp (jwt/lookup-keypair db init-kid)
              _ (assert (is (:xt/id kp)))

              decoded-jwt (jwt/verify-jwt access-token kp)

              {:strs [alg kid typ]} (:header decoded-jwt)
              _ (assert (is (= "RS256" alg)))
              _ (assert (is (= init-kid kid)))
              _ (assert (is (= "at+jwt" typ)))

              {:strs [aud iss]
               client-id "client_id"} (:claims decoded-jwt)

              _ (assert (is (= "https://auth.example.test" iss)))
              _ (assert (is (= "https://data.example.test" aud)))
              _ (assert (is (= "test-app" client-id)))]

          (testing "token-info endpoint"
            (let [{:ring.response/keys [status headers body]}
                  (with-session-token session-token
                    (*handler*
                     (let [body (codec/form-encode {"token" access-token})]
                       {:ring.request/method :post
                        :juxt.site/uri "https://auth.example.test/token-info"
                        :ring.request/headers
                        {"content-type" "application/x-www-form-urlencoded"
                         "content-length" (str (count (.getBytes body)))}
                        :ring.request/body (io/input-stream (.getBytes body))})))

                  _ (assert (is (= 200 status)))
                  _ (assert (is (= "application/json" (get headers "content-type"))))
                  {:strs [iss aud active]
                   client-id "client_id"} (json/read-value body)
                  _ (assert active)
                  _ (assert (is (= "https://auth.example.test" iss)))
                  _ (assert (is (= "https://data.example.test" aud)))
                  _ (assert (is (= "https://data.example.test" aud)))
                  _ (assert (is (= "test-app" client-id)))])))))))
