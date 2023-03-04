;; Copyright © 2023, JUXT LTD.

(ns juxt.site.auth-server-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [ring.util.codec :as codec]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.util :refer [make-nonce]]
   [juxt.site.jwt :as jwt]
   [juxt.test.util
    :refer [system-xt-fixture with-session-token
            *handler* *xt-node* handler-fixture
            with-fixtures install-resource-groups!
            AUTH_SERVER]]
   [xtdb.api :as xt]
   [clojure.java.io :as io]))

(use-fixtures :each system-xt-fixture handler-fixture)

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
                _ (assert (is (= "test-app" client-id)))]

            ;; TODO: Test against token-info

            ))

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

            decoded-jwt)))))

;; Metadata test

;;deftest introspection-test

#_(with-fixtures
    (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})
    (install-resource-groups!
     ["juxt/site/oauth-authorization-server"]
     AUTH_SERVER
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
      "keypair" "https://auth.example.test/keypairs/test-kp-123"}
     )

    (let [{:ring.response/keys [status headers body]}
          (*handler* {:juxt.site/uri "https://auth.example.test/.well-known/oauth-authorization-server"
                      :ring.request/method :get})
          json (json/read-value body)]

      (assert (is (= 200 status)))

      #_(assert
         (is (=
              {"issuer" "https://auth.example.test"}
              json)))

      json



      )

    (let [{:ring.response/keys [status headers body]}
          (*handler* {:juxt.site/uri  "https://auth.example.test/.well-known/jwks.json"
                      :ring.request/method :get})
          json (json/read-value body)]
      (assert (is (= 200 status)))
      json

      ))
