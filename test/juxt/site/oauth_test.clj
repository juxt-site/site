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
            converge!
            AUTH_SERVER RESOURCE_SERVER]]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest register-client-test
  (install-resource-groups!
   ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"
    "authorization-code-length" 12
    "jti-length" 12})

  (testing "Register client with generated client-id"
    (let [result
          (install-resource-with-operation!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/operations/register-client"
           {:juxt.site/client-type "public"
            :juxt.site/redirect-uris-as-csv "https://test-app.example.test/callback"})
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
            :juxt.site/redirect-uris-as-csv "https://test-app.example.test/callback"})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (:juxt.site/client-secret doc))))

  ;; TODO: Test with multiple redirect-uris

  (testing "Re-registering the same client-id will fail"
    (let [input {:juxt.site/client-id "test-app"
                 :juxt.site/client-type "public"
                 :juxt.site/redirect-uris-as-csv "https://test-app.example.test/callback"}]
      (install-resource-with-operation!
       "https://auth.example.test/_site/subjects/system"
       "https://auth.example.test/operations/register-client"
       input)

      (is
       (=
        {:juxt.site/type "https://meta.juxt.site/types/client"
         :juxt.site/client-id "test-app"
         :juxt.site/client-type "public"
         :juxt.site/redirect-uris #{"https://test-app.example.test/callback"}
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
    "keypair" "https://auth.example.test/keypairs/test-kp-123"
    "authorization-code-length" 12
    "jti-length" 12})

  ;; Register an application
  ;; TODO: Only temporary while moving init below pkg
  (install-resource-with-operation!
   "https://auth.example.test/_site/subjects/system"
   "https://auth.example.test/operations/register-client"
   {:juxt.site/client-id "test-app"
    :juxt.site/client-type "confidential"
    :juxt.site/redirect-uris-as-csv "https://test-app.example.test/callback"
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

  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})

  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"
    "juxt/site/login-form"
    "juxt/site/example-users"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" (str "https://auth.example.test/keypairs/" "test-kp-123")
    "authorization-code-length" 12
    "jti-length" 12})

  (install-resource-groups!
   ["juxt/site/example-apps"]
   AUTH_SERVER
   {"client-type" "public"
    "origin" "https://test-app.test.com"
    "resource-server" "https://data.example.test"
    "authorization-server" "https://auth.example.test"
    "redirect-uris-as-csv" "https://test-app.test.com/redirect.html"})

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
              "response_types_supported" ["code" "token"]
              "response_modes_supported" ["query" "fragment"]
	      "grant_types_supported" ["authorization_code" "implicit" "refresh_token"]
              "token_endpoint_auth_signing_alg_values_supported" ["RS256"]
	      "token_endpoint_auth_methods_supported" ["none" "client_secret_post"]
              "code_challenge_methods_supported" ["S256"]}
             (json/read-value body)))))

  ;; TODO: Errors

  ;; Subsequent tests require a login
  (let [login-result
        (login/login-with-form!
         *handler*
         "username" "alice"
         "password" "garden"
         :juxt.site/uri "https://auth.example.test/login-with-form")

        session-token (:juxt.site/session-token login-result)
        _ (is session-token)]

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

            _ (is (= 303 status))
            _ (is (= "https://test-app.test.com" (get headers "access-control-allow-origin")))

            {:strs [location]} headers

            [_ location-uri fragment] (re-matches #"(https://.+?)#(.*)" location)

            _ (is (= "https://test-app.test.com/redirect.html" location-uri))

            fragment-params (codec/form-decode fragment)

            _ (is (= state (get fragment-params "state")))
            _ (is (= "bearer" (get fragment-params "token_type")))

            access-token (get fragment-params "access_token")
            _ (is access-token)

            db (xt/db *xt-node*)

            _ (is (= "test-kp-123" (jwt/get-kid access-token)))

            kp (jwt/lookup-keypair db "test-kp-123")
            _ (is (:xt/id kp))

            jwt (jwt/verify-jwt access-token kp)

            {:strs [alg kid typ]} (:header jwt)
            _ (is (= "RS256" alg))
            _ (is (= "test-kp-123" kid))
            _ (is (= "at+jwt" typ))

            {:strs [aud iss]
             client-id "client_id"} (:claims jwt)

            _ (is (= "https://auth.example.test" iss))
            _ (is (= "https://data.example.test" aud))
            _ (is (= "test-app" client-id))]))

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

            _ (is (= 303 status))
            _ (is (= "https://test-app.test.com" (get headers "access-control-allow-origin")))

            {:strs [location]} headers

            [_ location-uri query-string] (re-matches #"(https://.+?)\?(.*)" location)

            _ (is (= "https://test-app.test.com/redirect.html" location-uri))

            query-params (codec/form-decode query-string)

            _ (is (= state (get query-params "state")))

            code (get query-params "state")
            _ (is code)

            ;; TODO: Test various combinations to tease out all the possible errors

            token-request-payload
            (codec/form-encode
             {"grant_type" "authorization_code"
              "code" code
              "redirect_uri" "https://test-app.test.com/redirect.html"
              "client_id" "test-app"})

            token-request
            {:ring.request/method :post
             :juxt.site/uri "https://auth.example.test/oauth/token"
             :ring.request/headers
             {"content-type" "application/x-www-form-urlencoded"
              "content-length" (str (count (.getBytes token-request-payload)))}
             :ring.request/body (io/input-stream (.getBytes token-request-payload))}

            {:ring.response/keys [status headers body] :as response}
            (*handler* token-request)

            _ (is (= "https://test-app.test.com" (get headers "access-control-allow-origin")))

            _ (is (= 200 status))

            token-response-payload-as-json (json/read-value body)
            _ (is (map? token-response-payload-as-json))

            access-token (get token-response-payload-as-json "access_token")
            _ (is access-token)

            refresh-token (get token-response-payload-as-json "refresh_token")
            _ (is refresh-token)

            expires-in (get token-response-payload-as-json "expires_in")
            _ (is expires-in)
            _ (is (= (* 15 60) expires-in))

            db (xt/db *xt-node*)

            _ (is (= "test-kp-123" (jwt/get-kid access-token)))

            kp (jwt/lookup-keypair db "test-kp-123")
            _ (is (:xt/id kp))

            decoded-jwt (jwt/verify-jwt access-token kp)

            {:strs [alg kid typ]} (:header decoded-jwt)
            _ (is (= "RS256" alg))
            _ (is (= "test-kp-123" kid))
            _ (is (= "at+jwt" typ))

            {:strs [aud iss]
             client-id "client_id"} (:claims decoded-jwt)

            _ (is (= "https://auth.example.test" iss))
            _ (is (= "https://data.example.test" aud))
            _ (is (= "test-app" client-id))]

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

                _ (is (= 200 status))
                _ (is (= "application/json" (get headers "content-type")))
                {:strs [iss aud active]
                 client-id "client_id"} (json/read-value body)
                _ (is active)
                _ (is (= "https://auth.example.test" iss))
                _ (is (= "https://data.example.test" aud))
                _ (is (= "https://data.example.test" aud))
                _ (is (= "test-app" client-id))]))

        (testing "refresh-token"
          (let [token-request-payload
                (codec/form-encode
                 {"grant_type" "refresh_token"
                  "refresh_token" refresh-token})
                token-request
                {:ring.request/method :post
                 :juxt.site/uri "https://auth.example.test/oauth/token"
                 :ring.request/headers
                 {"content-type" "application/x-www-form-urlencoded"
                  "content-length" (str (count (.getBytes token-request-payload)))}
                 :ring.request/body (io/input-stream (.getBytes token-request-payload))}

                {:ring.response/keys [status headers body]}
                (*handler* token-request)

                _ (is (= 200 status))

                _ (is (= "application/json" (get headers "content-type")))
                _ (is body)

                token-response-payload-as-json (json/read-value body)
                _ (is (map? token-response-payload-as-json))

                access-token (get token-response-payload-as-json "access_token")
                _ (is access-token)

                expires-in (get token-response-payload-as-json "expires_in")
                _ (is expires-in)
                _ (is (= (* 15 60) expires-in))

                db (xt/db *xt-node*)

                _ (is (= "test-kp-123" (jwt/get-kid access-token)))

                kp (jwt/lookup-keypair db "test-kp-123")
                _ (is (:xt/id kp))

                decoded-jwt (jwt/verify-jwt access-token kp)

                {:strs [alg kid typ]} (:header decoded-jwt)
                _ (is (= "RS256" alg))
                _ (is (= "test-kp-123" kid))
                _ (is (= "at+jwt" typ))

                {:strs [aud iss]
                 client-id "client_id"} (:claims decoded-jwt)

                _ (is (= "https://auth.example.test" iss))
                _ (is (= "https://data.example.test" aud))
                _ (is (= "test-app" client-id))]))))))


#_(with-fixtures
  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})

  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"
    "juxt/site/login-form"
    "juxt/site/example-users"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" (str "https://auth.example.test/keypairs/" "test-kp-123")})

  (install-resource-groups!
   ["juxt/site/example-apps"]
   AUTH_SERVER
   {"client-type" "public"
    "origin" "https://test-app.test.com"
    "resource-server" "https://data.example.test"
    "authorization-server" "https://auth.example.test"
    "redirect-uris-as-csv" "https://test-app.test.com/redirect.html,https://test-app.example.com/oauth-redirect.html"})

  (repl/e "https://auth.example.test/clients/test-app"))


;;with-fixtures

(deftest oauth-errors-test

  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})

  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"
    "juxt/site/login-form"
    "juxt/site/example-users"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" (str "https://auth.example.test/keypairs/" "test-kp-123")
    ;; "The authorization server SHOULD document the size of any
    ;; value it issues." — RFC 6749 Section 4.2.2
    "jti-length" 16
    "authorization-code-length" 10})

  (converge!
   ["https://auth.example.test/clients/public-app"]
   AUTH_SERVER
   {"client-type" "public"
    "origin" "https://public-app.test.com"
    "resource-server" "https://data.example.test"
    "authorization-server" "https://auth.example.test"
    "redirect-uris-as-csv" "https://public-app.test.com/redirect.html"})

  (let [login-result
        (login/login-with-form!
         *handler*
         "username" "alice"
         "password" "garden"
         :juxt.site/uri "https://auth.example.test/login-with-form")

        session-token (:juxt.site/session-token login-result)
        _ (is session-token)

        state (make-nonce 10)

        authorization-request
        (fn [m]
          {:ring.request/method :get
           :juxt.site/uri "https://auth.example.test/oauth/authorize"
           :ring.request/query
           (codec/form-encode
            (assoc m "state" state)
            )})]

    #_(testing "good implicit"
      (let [{:ring.response/keys [status headers]}
            (with-session-token session-token
              (*handler*
               (authorization-request
                {"response_type" "token"
                 "client_id" "public-app"})))

            _ (is (= 303 status))

            {:strs [location access-control-allow-origin]} headers

            _ (is (= "https://public-app.test.com" access-control-allow-origin))
            [_ location-uri fragment] (re-matches #"(https://.+?)#(.*)" location)
            _ (is (= "https://public-app.test.com/redirect.html" location-uri))]

        (is fragment)))

    #_(testing "good authorization_code"
      (let [{:ring.response/keys [status headers body] :as response}
            (with-session-token session-token
              (*handler*
               (authorization-request
                {"response_type" "code"
                 "client_id" "public-app"
                 })))

            {:strs [location access-control-allow-origin]} headers
            _ (is (= "https://public-app.test.com" access-control-allow-origin))

            [_ location-uri query] (re-matches #"(https://.+?)\?(.*)" location)
            query-params (codec/form-decode query)
            ]


        (is (= state (get query-params "state")))
        (is (= 20 (count (get query-params "code"))))
        (is (= "https://public-app.test.com/redirect.html" location-uri))
        ))

    (testing "client-not-registered"
      (let [{:ring.response/keys [status headers body]}
            (with-session-token session-token
              (*handler*
               (authorization-request
                {"response_type" "foo"
                 "client_id" "public-app2"
                 })))]
        (is (= 400 status))
        ;; Why is this not HTML?
        (is (= "text/plain;charset=utf-8" (get headers "content-type")))
        ;; Is there no description or hint we could add here?
        (is (= "Bad Request\r\n" (String. body)))
        ))

    ;; Test for bad response-type, bad redirect-uri, bad scope

    ))
