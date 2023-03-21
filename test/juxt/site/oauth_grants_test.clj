;; Copyright © 2023, JUXT LTD.

(ns juxt.site.oauth-grants-test
  (:require
   [clojure.test :refer [deftest is use-fixtures testing]]
   [clojure.java.io :as io]
   [jsonista.core :as json]
   [juxt.site.oauth-test :as oauth-test]
   [juxt.site.jwt :as jwt]
   [juxt.site.test-helpers.login :as login]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]
   [juxt.test.util
    :refer [system-xt-fixture
            with-session-token
            with-fixtures *handler* *xt-node* handler-fixture
            install-resource-groups!
            converge!
            AUTH_SERVER
            authorization-request]]
   [juxt.site.repl :as repl]
   [juxt.site.util :as util]))

(defn bootstrap-fixture [f]
  (install-resource-groups!
   ["juxt/site/login-form"
    "juxt/site/example-users"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

  (converge!
   ["https://auth.example.test/clients/test-app"]
   AUTH_SERVER
   {"client-type" "public"
    "origin" "https://test-app.test.com"
    "resource-server" "https://data.example.test"
    "authorization-server" "https://auth.example.test"
    "redirect-uris" ["https://test-app.test.com/redirect.html"]
    "scope" nil})

  (f))

(defn login [username password]
  (let [login-result
        (login/login-with-form!
         *handler*
         "username" username
         "password" password
         :juxt.site/uri "https://auth.example.test/login-with-form")]
    (assert (:juxt.site/session-token login-result))
    (:juxt.site/session-token login-result)))

(use-fixtures :once system-xt-fixture handler-fixture oauth-test/bootstrap-fixture bootstrap-fixture)

(deftest implicit-grant-test
  (let [session-token (login "alice" "garden")

        state (util/make-nonce 10)

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



(deftest client-not-registered-test
  (let [session-token (login "alice" "garden")
        state (util/make-nonce 10)
        {:ring.response/keys [status headers body]}
        (with-session-token session-token
          (*handler*
           (authorization-request
            {"response_type" "foo"
             "client_id" "public-app2"
             "state" state})))]
    (is (= 400 status))
    ;; Why is this not HTML?
    (is (= "text/plain;charset=utf-8" (get headers "content-type")))
    ;; Is there no description or hint we could add here?
    (is (= "Bad Request\r\n" (String. body)))))

;; If an authorization request is missing the "response_type"
;; parameter, or if the response type is not understood, the
;; authorization server MUST return an error response.
;;
;; https://www.rfc-editor.org/rfc/rfc6749#section-3.1.1
(deftest missing-response-type-error-test
  (let [session-token (login "alice" "garden")
        response
        (with-session-token session-token
          (*handler*
           (authorization-request
            {"client_id" "test-app"})))
        location (get-in response [:ring.response/headers "location"])]

    (is (= 303 (:ring.response/status response)))

    (condp re-matches location
      #"https://test-app.test.com/redirect.html\?(.*)"
      :>>
      (fn [[_ query] ]
        (let [form (codec/form-decode query)]
          (is (=  "invalid_request" (get form "error")))
          (is (= "A response_type query parameter is required." (get form "error_description") ))))
      (is false (str "Location wasn't correctly formed: " location)))))

;; TODO: Test different combinations, including errors

;; TODO: Group tests by grant-type.

(deftest invalid-authorization-code-test
  (let [token-request-payload
        (codec/form-encode
         {"grant_type" "authorization_code"
          "code" "fake"
          "redirect_uri" "https://test-app.test.com/redirect.html"
          "client_id" "test-app"})

        token-request
        {:ring.request/method :post
         :juxt.site/uri "https://auth.example.test/oauth/token"
         :ring.request/headers
         {"content-type" "application/x-www-form-urlencoded"
          "content-length" (str (count (.getBytes token-request-payload)))}
         :ring.request/body (io/input-stream (.getBytes token-request-payload))}

        {:ring.response/keys [status headers body]}
        (*handler* token-request)

        _ (is 400 status)
        _ (is (= "application/json" (get headers "content-type")))
        token-response-payload-as-json (json/read-value body)

        {error "error" error-description "error_description"}
        token-response-payload-as-json

        _ (is (= "invalid_grant" error))
        _ (is (= "Code invalid or expired" error-description))
        ]))

;; State is mandatory
(deftest authorization-missing-state-test
  (let [session-token (login "alice" "garden")
        response
        (with-session-token session-token
          (*handler*
           (authorization-request
            {"response_type" "code"
             "client_id" "test-app"})))
        location (get-in response [:ring.response/headers "location"])]

    (is (= 303 (:ring.response/status response)))
    (is location)

    (condp re-matches location
      #"https://test-app.test.com/redirect.html\?(.*)"
      :>>
      (fn [[_ query] ]
        (let [form (codec/form-decode query)]
          (is (=  "invalid_request" (get form "error")))
          (is (= "A state query parameter is required." (get form "error_description")))))
      (is false (str "Location wasn't correctly formed: " location)))))

(deftest full-authorization-code-grant-with-pkce-test
  (let [code-verifier (util/make-code-verifier 64)
        code-challenge (util/code-challenge code-verifier)

        session-token (login "alice" "garden")
        {:ring.response/keys [status headers]}
        (with-session-token session-token
          (*handler*
           (authorization-request
            {"response_type" "code"
             "client_id" "test-app"
             "state" "123"
             "code_challenge" code-challenge
             ;; TODO: Should we also support plain?
             "code_challenge_method" "S256"})))
        {:strs [location access-control-allow-origin]} headers

        _ (is (= 303 status))
        _ (is (= "https://test-app.test.com" access-control-allow-origin))

        [_ location-uri query-string] (re-matches #"(https://.+?)\?(.*)" location)
        _ (is (= "https://test-app.test.com/redirect.html" location-uri))

        {:strs [code state]} (codec/form-decode query-string)
        _ (is (= "123" state))

        _ (is (re-matches #"[a-z0-9]{5,40}" code))

        token-request-payload
        (codec/form-encode
         {"grant_type" "authorization_code"
          "code" code
          "redirect_uri" "https://test-app.test.com/redirect.html"
          "client_id" "test-app"
          "code_verifier" code-verifier})

        token-request
        {:ring.request/method :post
         :juxt.site/uri "https://auth.example.test/oauth/token"
         :ring.request/headers
         {"content-type" "application/x-www-form-urlencoded"
          "content-length" (str (count (.getBytes token-request-payload)))}
         :ring.request/body (io/input-stream (.getBytes token-request-payload))}

        {:ring.response/keys [status headers body]}
        (*handler* token-request)

        {:strs [access-control-allow-origin]} headers

        _ (is (= 200 status))
        _ (is (= "https://test-app.test.com" access-control-allow-origin))

        token-response-payload-as-json (json/read-value body)
        _ (is (map? token-response-payload-as-json))

        {access-token "access_token"
         refresh-token "refresh_token"
         expires-in "expires_in"}
        token-response-payload-as-json

        _ (is access-token)
        _ (is refresh-token)

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

    ;; TODO: Add an equivalent test for the implicit flow
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


    ))

#_(with-fixtures ;; refresh-tokens
    (let [session-token (login "alice" "garden")
          response
          (with-session-token session-token
            (*handler*
             (authorization-request
              {"client_id" "test-app"
               ;;  "The implicit grant type is used to obtain access
               ;;  tokens (it does not support the issuance of refresh
               ;;  tokens)"
               ;;
               ;;  https://www.rfc-editor.org/rfc/rfc6749#section-4.2
               "response_type" "code"
               "state" "123"})))
          location (get-in response [:ring.response/headers "location"])
          [_ _ query-string] (re-matches #"(https://.+?)\?(.*)" location)
          {:strs [code]} (codec/form-decode query-string)

          token-request-payload
          (codec/form-encode
           {"grant_type" "authorization_code"
            "code" "123sef"
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

          token-response-payload-as-json (json/read-value body)]

      token-response-payload-as-json

      ))

;; Are refresh tokens working?
;; Scopes
;; Put scope in token-info
