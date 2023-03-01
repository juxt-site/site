;; Copyright © 2023, JUXT LTD.

(ns juxt.site.auth-server-metadata-test
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

;;deftest introspection-test

(with-fixtures
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

        {access-token "access_token"}
        (with-session-token
          session-token
          (oauth/authorize!
           "https://auth.example.test/oauth/authorize"
           {"client_id" "test-app"}))]

    access-token

    (repl/ls)

    (*handler* {:juxt.site/uri "https://auth.example.test/.well-known/oauth-authorization-server"
                :ring.request/method :get})

    ;; Post this to token

    )

  )

(with-fixtures(install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})

  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"})

  (let [{:ring.response/keys [status headers body]}
        (*handler* {:juxt.site/uri "https://auth.example.test/.well-known/oauth-authorization-server"
                    :ring.request/method :get})]
    {:status 200
     :body body}))
