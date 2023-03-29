;; Copyright © 2022, JUXT LTD.

(ns juxt.site.form-based-auth-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [malli.core :as malli]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER]]
   [juxt.site.test-helpers.local-files-util :refer [install-resource-groups!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest login-with-form-test
  (install-resource-groups!
   ["juxt/site/bootstrap"
    "juxt/site/sessions"
    "juxt/site/login-form"
    "juxt/site/user-model"
    "juxt/site/password-based-user-identity"
    "juxt/site/oauth-authorization-server"
    "juxt/site/example-users"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/test-kp-123"
    "authorization-code-length" 12
    "jti-length" 12})

  (let [result (login/login-with-form! "ALICE" "garden")]
    (is result)))
