;; Copyright © 2023, JUXT LTD.

(ns juxt.site.auth-server-test
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

(deftest cors-headers
 (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})

 (install-resource-groups!
  ["juxt/site/oauth-authorization-server"
   "juxt/site/login-form"
   "juxt/site/example-users"]
  AUTH_SERVER
  {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
   "keypair" "https://auth.example.test/keypairs/test-kp-123"})

 (install-resource-groups!
  ["juxt/site/example-apps"]
  AUTH_SERVER
  {"client-type" "public"
   "origin" "https://test-app.test.com"
   "resource-server" "https://data.example.test"
   "redirect-uri" "https://test-app.test.com/redirect.html"})

 (let [login-result
       (login/login-with-form!
        *handler*
        "username" "alice"
        "password" "garden"
        :juxt.site/uri "https://auth.example.test/login-with-form")

       session-token (:juxt.site/session-token login-result)
       _ (assert session-token)

       response (with-session-token session-token
                  (oauth/authorize-response!
                   "https://auth.example.test/oauth/authorize"
                   {"client_id" "test-app"
                    ;; TODO: Aren't we meant to put in a response-type or something?
                    :state "123"}))]

   (is (= 303 (:ring.response/status response)))

   (is (= "https://test-app.test.com"
          (get-in response [:ring.response/headers "access-control-allow-origin"])))

   ;; Post this to token
   )
 )

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
