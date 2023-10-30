;; Copyright © 2022, JUXT LTD.

(ns juxt.site.form-based-auth-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.session-scope :refer [lookup-session-details]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login :refer [with-session-token]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [xtdb.api :as xt]))

(defn bootstrap-fixture [f]
  (install-bundles!
   ["juxt/site/bootstrap"
    "juxt/site/oauth-scope"
    "juxt/site/unprotected-resources"
    "juxt/site/protection-spaces"
    "juxt/site/sessions"
    "juxt/site/oauth-token-endpoint"
    "juxt/site/login-form"
    "juxt/site/logout"
    "juxt/site/user-model"
    "juxt/site/password-based-user-identity"
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "/session-scopes/form-login-session"
      "session-scope-authority" "https://auth.example.test"
      "authorization-code-length" 12
      "jti-length" 12}]

    "juxt/site/example-users"]
   RESOURCE_SERVER)
  (f))

(use-fixtures :each system-xt-fixture handler-fixture bootstrap-fixture)

(deftest login-with-form-test
  (let [result (login/login-with-form! "ALICE" "garden")]
    (is result)))

(deftest logout-test
  (let [token (login/login-with-form! "ALICE" "garden")]
    (is (map? (lookup-session-details (xt/db *xt-node*) token)))
    (with-session-token token
      (login/logout!))
    (is (nil? (lookup-session-details (xt/db *xt-node*) token)))))
