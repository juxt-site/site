;; Copyright © 2023, JUXT LTD.

(ns juxt.site.oauth-grants-test
  (:require
   [clojure.java.io :as io]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [jsonista.core :as json]
   [juxt.site.jwt :as jwt]
   [juxt.site.oauth-test :as oauth-test]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.login :as login :refer [login-with-form! with-session-token]]
   [juxt.site.test-helpers.oauth :as oauth :refer [RESOURCE_SERVER]]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.util :as util]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]
   [clojure.string :as str]))

(defn bootstrap-fixture [f]
  (install-bundles!
   ["juxt/site/roles"
    "juxt/site/login-form"
    "juxt/site/user-model"
    ["juxt/site/system-client" {"client-id" "site-cli"}]
    "juxt/site/password-based-user-identity"
    "juxt/site/example-users"
    "juxt/site/test-scopes"
    "juxt/site/test-clients"
    "juxt/site/oauth-introspection-endpoint"]
   RESOURCE_SERVER)
  (f))

(use-fixtures
  :once
  system-xt-fixture
  handler-fixture
  oauth-test/bootstrap-fixture
  bootstrap-fixture)

(deftest implicit-grant-test
  (let [session-token (login-with-form! "alice" "garden")

        state (util/make-nonce 10)

        authorization-request
        (oauth/make-authorization-request
         "https://auth.example.test/oauth/authorize"
         {"response_type" "token"
          "client_id" "test/public-global-scope-app"
          "state" state})

        {status :ring.response/status, headers :ring.response/headers}
        (with-session-token session-token
          (*handler* authorization-request))

        _ (is (= 303 status))
        _ (is (= "https://petstore.example.com" (get headers "access-control-allow-origin")))

        {:strs [location]} headers

        [_ location-uri fragment] (re-matches #"(https://.+?)#(.*)" location)

        _ (is (= "https://public-global-scope-app.test.com/redirect.html" location-uri))

        fragment-params (codec/form-decode fragment)

        _ (is (= state (get fragment-params "state")))
        _ (is (= "bearer" (get fragment-params "token_type")))

        access-token (get fragment-params "access_token")
        _ (is access-token)

        db (xt/db *xt-node*)

        _ (is (= "test-kid" (jwt/get-kid access-token)))

        kp (jwt/lookup-keypair db "test-kid")
        _ (is (:xt/id kp))

        jwt (jwt/verify-jwt access-token kp)

        {:strs [alg kid typ]} (:header jwt)
        _ (is (= "RS256" alg))
        _ (is (= "test-kid" kid))
        _ (is (= "at+jwt" typ))

        {:strs [aud iss]
         client-id "client_id"} (:claims jwt)

        _ (is (= "https://auth.example.test" iss))
        _ (is (= "https://data.example.test" aud))
        _ (is (= "test/public-global-scope-app" client-id))]))

(deftest client-not-registered-test
  (let [session-token (login-with-form! "alice" "garden")
        state (util/make-nonce 10)
        {status :ring.response/status,
         headers :ring.response/headers,
         body :ring.response/body}
        (with-session-token session-token
          (*handler*
           (oauth/make-authorization-request
            "https://auth.example.test/oauth/authorize"
            {"response_type" "foo"
             "client_id" "test/unknown-client"
             "state" state})))]
    (is (= 400 status))
    (is (= "application/json" (get headers "content-type")))
    (is (= {"error" "invalid_client"
            "error_description" "No client registered with that client_id"}
           (json/read-value body)))))

;; If an authorization request is missing the "response_type"
;; parameter, or if the response type is not understood, the
;; authorization server MUST return an error response.
;;
;; https://www.rfc-editor.org/rfc/rfc6749#section-3.1.1

(deftest missing-response-type-error-test
  (let [session-token (login-with-form! "alice" "garden")
        response
        (with-session-token session-token
          (*handler*
           (oauth/make-authorization-request
            "https://auth.example.test/oauth/authorize"
            {"client_id" "test/public-global-scope-app"})))
        location (get-in response [:ring.response/headers "location"])]

    (is (= 303 (:ring.response/status response)))

    (condp re-matches location
      #"https://public-global-scope-app.test.com/redirect.html\?(.*)"
      :>>
      (fn [[_ query]]
        (let [form (codec/form-decode query)]
          (is (=  "invalid_request" (get form "error")))
          (is (= "A response_type parameter is required." (get form "error_description") ))))
      (is false (str "Location wasn't correctly formed: " location)))))

;; TODO: Test different combinations, including errors

;; TODO: Group tests by grant-type.

(deftest invalid-authorization-code-test
  (let [token-request-payload
        (codec/form-encode
         {"grant_type" "authorization_code"
          "code" "fake"
          "redirect_uri" "https://public-global-scope-app.test.com/redirect.html"
          "client_id" "test/public-global-scope-app"})

        token-request
        {:ring.request/method :post
         :juxt.site/uri "https://auth.example.test/oauth/token"
         :ring.request/headers
         {"content-type" "application/x-www-form-urlencoded"
          "content-length" (str (count (.getBytes token-request-payload)))}
         :ring.request/body (io/input-stream (.getBytes token-request-payload))}

        {status :ring.response/status,
         headers :ring.response/headers,
         body :ring.response/body}
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
  (let [session-token (login-with-form! "alice" "garden")
        response
        (with-session-token session-token
          (*handler*
           (oauth/make-authorization-request
            "https://auth.example.test/oauth/authorize"
            {"response_type" "code"
             "client_id" "test/public-global-scope-app"})))
        location (get-in response [:ring.response/headers "location"])]

    (is (= 303 (:ring.response/status response)))
    (is location)

    (condp re-matches location
      #"https://public-global-scope-app.test.com/redirect.html\?(.*)"
      :>>
      (fn [[_ query] ]
        (let [form (codec/form-decode query)]
          (is (=  "invalid_request" (get form "error")))
          (is (= "A state parameter is required." (get form "error_description")))))
      (is false (str "Location wasn't correctly formed: " location)))))

(deftest full-authorization-code-grant-with-pkce-test
  (let [code-verifier (util/make-code-verifier 64)
        code-challenge (util/code-challenge code-verifier)

        session-token (login-with-form! "alice" "garden")
        {status :ring.response/status, headers :ring.response/headers}
        (with-session-token session-token
          (*handler*
           (oauth/make-authorization-request
            "https://auth.example.test/oauth/authorize"
            {"response_type" "code"
             "client_id" "test/public-global-scope-app"
             "state" "123"
             "code_challenge" code-challenge
             ;; TODO: Should we also support plain?
             "code_challenge_method" "S256"})))
        {:strs [location access-control-allow-origin]} headers

        _ (is (= 303 status))
        _ (is (= "https://petstore.example.com" access-control-allow-origin))

        [_ location-uri query-string] (re-matches #"(https://.+?)\?(.*)" location)
        _ (is (= "https://public-global-scope-app.test.com/redirect.html" location-uri))

        {:strs [code state]} (codec/form-decode query-string)
        _ (is (= "123" state))

        _ (is (re-matches #"[a-z0-9]{5,40}" code))

        token-request
        (oauth/make-token-request
         "https://auth.example.test/oauth/token"
         {"grant_type" "authorization_code"
          "code" code
          "redirect_uri" "https://public-global-scope-app.test.com/redirect.html"
          "client_id" "test/public-global-scope-app"
          "code_verifier" code-verifier})

        {status :ring.response/status,
         headers :ring.response/headers,
         body :ring.response/body}
        (*handler* token-request)

        {:strs [access-control-allow-origin]} headers

        _ (is (= 200 status))
        _ (is (= "https://petstore.example.com" access-control-allow-origin))

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

        _ (is (= "test-kid" (jwt/get-kid access-token)))

        kp (jwt/lookup-keypair db "test-kid")
        _ (is (:xt/id kp))

        decoded-jwt (jwt/verify-jwt access-token kp)

        {:strs [alg kid typ]} (:header decoded-jwt)
        _ (is (= "RS256" alg))
        _ (is (= "test-kid" kid))
        _ (is (= "at+jwt" typ))

        {:strs [aud iss]
         client-id "client_id"} (:claims decoded-jwt)

        _ (is (= "https://auth.example.test" iss))
        _ (is (= "https://data.example.test" aud))
        _ (is (= "test/public-global-scope-app" client-id))]

    ;; TODO: Add an equivalent test for the implicit flow

    ;; This should be migrated in another dedicated test because it
    ;; requires client authentication
    #_(testing "access token-info endpoint"
        (let [{status :ring.response/status,
               headers :ring.response/headers,
               body :ring.response/body}
              (with-session-token session-token
                (*handler*
                 (oauth/make-token-info-request
                  "https://auth.example.test/oauth/introspect"
                  {"token" access-token})))

              _ (is (= 200 status))
              _ (is (= "application/json" (get headers "content-type")))
              {:strs [iss aud active]
               client-id "client_id"} (json/read-value body)
              _ (is active)
              _ (is (= "https://auth.example.test" iss))
              _ (is (= "https://data.example.test" aud))
              _ (is (= "https://data.example.test" aud))
              _ (is (= "test/public-global-scope-app" client-id))]))

    (testing "use refresh token"
      (let [{status :ring.response/status,
             headers :ring.response/headers,
             body :ring.response/body}
            (with-session-token session-token
              (*handler*
               (oauth/make-token-request
                "https://auth.example.test/oauth/token"
                {"grant_type" "refresh_token"
                 "refresh_token" refresh-token})))
            _ (is (= 200 status))

            {:strs [access-control-allow-origin]} headers
            _ (is (= "https://petstore.example.com" access-control-allow-origin))

            token-response-payload-as-json (json/read-value body)
            _ (is (map? token-response-payload-as-json))

            {new-access-token "access_token"
             new-refresh-token "refresh_token"
             new-expires-in "expires_in"} token-response-payload-as-json

            _ (is new-access-token)
            _ (is new-refresh-token)
            _ (is new-expires-in)
            _ (is (= (* 15 60) new-expires-in))

            _ (is (not= access-token new-access-token))

            _ (Thread/sleep 100)

            db (xt/db *xt-node*)

            _ (is (= #{} (xt/q db '{:find [(pull e [*])]
                                    :where [[e :juxt.site/type "https://meta.juxt.site/types/access-token"]
                                            [e :juxt.site/token token]]
                                    :in [token]} access-token))
                  "The original access-token should be gone")

            _ (is
               (= #{} (xt/q db '{:find [(pull e [*])]
                                 :where [[e :juxt.site/type "https://meta.juxt.site/types/refresh-token"]
                                         [e :juxt.site/token token]]
                                 :in [token]} refresh-token))
               "The old refresh-token should be gone")

            _ (is (= 1 (count (xt/q db '{:find [(pull e [*])]
                                         :where [[e :juxt.site/type "https://meta.juxt.site/types/access-token"]
                                                 [e :juxt.site/token token]]
                                         :in [token]} new-access-token)))
                  "The new access-token should exist")

            ;;
            _ (is
               (= 1 (count (xt/q db '{:find [(pull e [*])]
                                      :where [[e :juxt.site/type "https://meta.juxt.site/types/refresh-token"]
                                              [e :juxt.site/token token]]
                                      :in [token]} new-refresh-token)))
               "The new refresh-token should exist")]))))

;; What if we try to fake the refresh token?
(deftest fake-refresh-token-test
  (let [session-token (login-with-form! "alice" "garden")
        _ (oauth/acquire-access-token!
           {:grant-type "authorization_code"
            :authorization-uri "https://auth.example.test/oauth/authorize"
            :token-uri "https://auth.example.test/oauth/token"
            :session-token session-token
            :client "https://auth.example.test/applications/test/public-global-scope-app"
            })]
    (is (=
         {"error" "invalid_grant"
          "error_description" "Refresh token invalid or expired",}
         (oauth/refresh-token!
          {:refresh-token "fake"})))))

(deftest bad-grant-type-test
  (let [token-request
        (oauth/make-token-request
         "https://auth.example.test/oauth/token"
         {"grant_type" "BAD"
          "username" "alice"
          "password" "garden"})
        response (*handler* token-request)]
    (is (= 400 (:ring.response/status response)))
    (is (= "unsupported_grant_type"
           (get (json/read-value (:ring.response/body response)) "error")))))

;; Resource owner password credentials grant

;; Even though this grant is (highly) discouraged (see
;; https://oauth.net/2/grant-types/password/), it is sometimes useful
;; in local development. It is possible to effectively disable this
;; grant in production by not having any password-based user
;; identities in the system (e.g. having only OpenID identities). So
;; we defer the choice to the deploying user.

(deftest resource-owner-password-credentials-grant-test
  (let [token-request
        (oauth/make-token-request
         "https://auth.example.test/oauth/token"
         {"grant_type" "password"
          "username" "alice"
          "password" "garden"
          "client_id" "site-cli"})
        response (*handler* token-request)
        {access-token "access_token"} (jsonista.core/read-value (:ring.response/body response))
        db (xt/db *xt-node*)
        access-token-doc (xt/entity db (str "https://auth.example.test/access-tokens/" access-token))]

    (is (= access-token (:juxt.site/token access-token-doc)))))

(deftest client-credentials-grant-type-test
  (let [db (xt/db *xt-node*)
        client-id "test/clientA"
        test-client (xt/entity db (format "https://auth.example.test/applications/%s" client-id))
        client-secret (:juxt.site/client-secret test-client)]

    (testing "correctly authorized client"
      (let [token-request
            (-> (oauth/make-token-request
                 "https://auth.example.test/oauth/token"
                 {"grant_type" "client_credentials"})

                ;; Add the authorization header
                (assoc-in [:ring.request/headers "authorization"]
                          (format "Basic %s" (util/as-b64-str (.getBytes (str client-id ":" client-secret))))))

            response (*handler* token-request)]
        (is (= 200 (:ring.response/status response)))
        (is (= "bearer" (get (jsonista.core/read-value (:ring.response/body response)) "token_type")))))

    (testing "bad client id"
      (let [token-request
            (-> (oauth/make-token-request
                 "https://auth.example.test/oauth/token"
                 {"grant_type" "client_credentials"})

                ;; Add the authorization header
                (assoc-in [:ring.request/headers "authorization"]
                          (format "Basic %s" (util/as-b64-str (.getBytes (str "bad-client" ":" client-secret))))))

            response (*handler* token-request)]
        ;; TODO: Make this return a 401
        ;;(is (= 401 (:ring.response/status response)))
        (is (= {"error_description" "Unauthorized", "error" "invalid_client"} (jsonista.core/read-value (:ring.response/body response))))))

    (testing "bad client secret"
      (let [token-request
            (-> (oauth/make-token-request
                 "https://auth.example.test/oauth/token"
                 {"grant_type" "client_credentials"})

                ;; Add the authorization header
                (assoc-in [:ring.request/headers "authorization"]
                          (format "Basic %s" (util/as-b64-str (.getBytes (str client-id ":" "bad-client-secret"))))))

            response (*handler* token-request)]
        ;;(is (= 401 (:ring.response/status response)))
        (is (= {"error_description" "Unauthorized", "error" "invalid_client"} (jsonista.core/read-value (:ring.response/body response))))))))


(deftest unsupported-grant-type-test
  (let [token-request
        (oauth/make-token-request
         "https://auth.example.test/oauth/token"
         {"grant_type" "unsupported"})
        response (*handler* token-request)]
    (is (= 400 (:ring.response/status response)))
    (is (= {"error" "unsupported_grant_type"
            "error_description" "This grant type is not supported"}
           (jsonista.core/read-value (:ring.response/body response))))))

;; Scopes

(deftest app-with-global-scope-with-no-scope-requested
  (let [session-token (login-with-form! "alice" "garden")]
    (testing "authorization_code"
      (let [response
            (oauth/acquire-access-token!
             {:grant-type "authorization_code"
              :session-token session-token
              :authorization-uri "https://auth.example.test/oauth/authorize"
              :token-uri "https://auth.example.test/oauth/token"
              :client "https://auth.example.test/applications/test/public-global-scope-app"})]
        (is (nil? (find response "scope"))
            "Scope should not be reported in JSON response")))

    (testing "implicit"
      (let [response
            (oauth/acquire-access-token!
             {:grant-type "implicit"
              :session-token session-token
              :authorization-uri "https://auth.example.test/oauth/authorize"
              :client "https://auth.example.test/applications/test/public-global-scope-app"})]
        (is (nil? (find response "scope"))
            "Scope should not be reported in JSON response")))))

;; TODO: Refactor and support 'password' grant
(deftest app-with-global-scope-with-specific-scope-requested
  (let [session-token (login-with-form! "alice" "garden")]
    (testing "authorization_code"
      (let [{:strs [scope]}
            (oauth/acquire-access-token!
             {:grant-type "authorization_code"
              :session-token session-token
              :authorization-uri "https://auth.example.test/oauth/authorize"
              :token-uri "https://auth.example.test/oauth/token"
              :client "https://auth.example.test/applications/test/public-global-scope-app"
              :scope #{"https://auth.example.test/scopes/test/read"
                       "https://auth.example.test/scopes/test/write"
                       "https://auth.example.test/scopes/test/dummy"}})
            _ (is scope)
            scope-set (set (str/split scope #" "))]

        (is (not (contains? scope-set "https://auth.example.test/scopes/test/dummy"))
            "Non existing scope should not be returned")

        (is (= #{"https://auth.example.test/scopes/test/read"
                 "https://auth.example.test/scopes/test/write"}
               scope-set)
            "Scope should be returned as expected in JSON response")))

    (testing "implicit"
      (let [{:strs [scope]}
            (oauth/acquire-access-token!
             {:grant-type "implicit"
              :session-token session-token
              :authorization-uri "https://auth.example.test/oauth/authorize"
              :client "https://auth.example.test/applications/test/public-global-scope-app"
              :scope #{"https://auth.example.test/scopes/test/read"
                       "https://auth.example.test/scopes/test/write"
                       "https://auth.example.test/scopes/test/dummy"}})
            _ (is scope)
            scope-set (set (str/split scope #" "))]

        (is (not (contains? scope-set "https://auth.example.test/scopes/test/dummy"))
            "Non existing scope should not be returned")

        (is (= #{"https://auth.example.test/scopes/test/read"
                 "https://auth.example.test/scopes/test/write"}
               scope-set)
            "Scope should be returned as expected in JSON response")))))

;; Move this to a separate test that tests for RFC 7662 explicitly
#_(deftest scope-included-in-token-info
  (let [session-token (login-with-form! "alice" "garden")]
    (testing "authorization_code"
      (let [{access-token "access_token"}
            (oauth/acquire-access-token!
             {:grant-type "authorization_code"
              :session-token session-token
              :authorization-uri "https://auth.example.test/oauth/authorize"
              :token-uri "https://auth.example.test/oauth/token"
              :client "https://auth.example.test/applications/test/public-global-scope-app"
              :scope #{"https://auth.example.test/scopes/test/read"
                       "https://auth.example.test/scopes/test/write"
                       "https://auth.example.test/scopes/test/dummy"}})
            {:ring.response/keys [status headers body]}
            (with-session-token session-token
              (*handler*
               (oauth/make-token-info-request
                "https://auth.example.test/token-info"
                {"token" access-token})))]
        (is (= 200 status))
        (is (= "application/json" (get headers "content-type")))
        (let [{scope "scope"} (json/read-value body)]
          (is (= #{"https://auth.example.test/scopes/test/read"
                   "https://auth.example.test/scopes/test/write"}
                 ;; See
                 ;; https://datatracker.ietf.org/doc/html/rfc7662#section-2.2
                 ;; which explains that the 'scope' member of the
                 ;; introspection response is a JSON string.
                 (set (str/split scope #" ")) )))))

    (testing "implicit"
      (let [{access-token "access_token"}
            (oauth/acquire-access-token!
             {:grant-type "implicit"
              :session-token session-token
              :authorization-uri "https://auth.example.test/oauth/authorize"
              :client "https://auth.example.test/applications/test/public-global-scope-app"
              :scope #{"https://auth.example.test/scopes/test/read"
                       "https://auth.example.test/scopes/test/write"
                       "https://auth.example.test/scopes/test/dummy"}})
            {:ring.response/keys [status headers body]}
            (with-session-token session-token
              (*handler*
               (oauth/make-token-info-request
                "https://auth.example.test/token-info"
                {"token" access-token})))]
        (is (= 200 status))
        (is (= "application/json" (get headers "content-type")))
        (let [{scope "scope"} (json/read-value body)]
          (is (= #{"https://auth.example.test/scopes/test/read"
                   "https://auth.example.test/scopes/test/write"}
                 ;; See
                 ;; https://datatracker.ietf.org/doc/html/rfc7662#section-2.2
                 ;; which explains that the 'scope' member of the
                 ;; introspection response is a JSON string.
                 (set (str/split scope #" ")) )))))))

(deftest read-write-app-test
  (let [session-token (login-with-form! "alice" "garden")]
    (testing "no scope requested"
      (testing "authorization_code"
        (let [{scope "scope"}
              (oauth/acquire-access-token!
               {:grant-type "authorization_code"
                :session-token session-token
                :authorization-uri "https://auth.example.test/oauth/authorize"
                :token-uri "https://auth.example.test/oauth/token"
                :client "https://auth.example.test/applications/test/public-read-write-scope-app"})]
          (is (= #{"https://auth.example.test/scopes/test/read"
                   "https://auth.example.test/scopes/test/write"}
                 (set (str/split scope #" "))))))

      (testing "implicit"
        (let [{scope "scope"}
              (oauth/acquire-access-token!
               {:grant-type "implicit"
                :session-token session-token
                :authorization-uri "https://auth.example.test/oauth/authorize"
                :client "https://auth.example.test/applications/test/public-read-write-scope-app"})]
          (is (= #{"https://auth.example.test/scopes/test/read"
                   "https://auth.example.test/scopes/test/write"}
                 (set (str/split scope #" ")))))))

    (testing "read-app"
      (testing "authorization_code"
        (let [{scope "scope"}
              (oauth/acquire-access-token!
               {:grant-type "authorization_code"
                :session-token session-token
                :authorization-uri "https://auth.example.test/oauth/authorize"
                :token-uri "https://auth.example.test/oauth/token"
                :client "https://auth.example.test/applications/test/public-read-scope-app"
                :scope #{"https://auth.example.test/scopes/test/read"
                         "https://auth.example.test/scopes/test/write"
                         "https://auth.example.test/scopes/test/dummy"}})]
          (is (= #{"https://auth.example.test/scopes/test/read"} (set (str/split scope #" ")))
              "Scope returned should be limited by the client's scope")))

      (testing "implicit"
        (let [{scope "scope"}
              (oauth/acquire-access-token!
               {:grant-type "implicit"
                :session-token session-token
                :authorization-uri "https://auth.example.test/oauth/authorize"
                :client "https://auth.example.test/applications/test/public-read-scope-app"
                :scope #{"https://auth.example.test/scopes/test/read"
                         "https://auth.example.test/scopes/test/write"
                         "https://auth.example.test/scopes/test/dummy"}})]
          (is (= #{"https://auth.example.test/scopes/test/read"} (set (str/split scope #" ")))
              "Scope returned should be limited by the client's scope"))))

    (testing "read-write-app"
      (testing "authorization_code"
        (let [{scope "scope"}
              (oauth/acquire-access-token!
               {:grant-type "authorization_code"
                :session-token session-token
                :authorization-uri "https://auth.example.test/oauth/authorize"
                :token-uri "https://auth.example.test/oauth/token"
                :client "https://auth.example.test/applications/test/public-read-write-scope-app"
                :scope #{"https://auth.example.test/scopes/test/read"
                         "https://auth.example.test/scopes/test/write"
                         "https://auth.example.test/scopes/test/dummy"}})]
          (is (= #{"https://auth.example.test/scopes/test/read"
                   "https://auth.example.test/scopes/test/write"}
                 (set (str/split scope #" ")))
              "Scope returned should be limited by the client's scope")))

      (testing "implicit"
        (let [{scope "scope"}
              (oauth/acquire-access-token!
               {:grant-type "implicit"
                :session-token session-token
                :authorization-uri "https://auth.example.test/oauth/authorize"
                :client "https://auth.example.test/applications/test/public-read-write-scope-app"
                :scope #{"https://auth.example.test/scopes/test/read"
                         "https://auth.example.test/scopes/test/write"
                         "https://auth.example.test/scopes/test/dummy"}})]
          (is (= #{"https://auth.example.test/scopes/test/read"
                   "https://auth.example.test/scopes/test/write"}
                 (set (str/split scope #" ")))
              "Scope returned should be limited by the client's scope"))))))

;; TODO: Try different combinations of redirects

;; TODO: In another test namespace, let's test the effect of scope on
;; what we can do. Research other test namespaces that test operations.

;; TODO: Confidential clients

;; TODO: Test that JWT access-tokens contain a scope claim, where
;; expected:
#_(let [jwt (jwt/decode-jwt read-only-access-token)
            jti (get-in jwt [:claims "jti"])]
        {:jwt jwt
         :token-in-db (repl/e (str "https://auth.example.test/access-tokens/" jti))}
        )
