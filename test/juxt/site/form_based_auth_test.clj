;; Copyright © 2022, JUXT LTD.

(ns juxt.site.form-based-auth-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [malli.core :as malli]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.test.util
    :refer [*handler* with-fixtures system-xt-fixture handler-fixture install-packages! AUTH_SERVER]]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest login-with-form-test
  (install-packages!
   ["juxt/site/bootstrap"
    "juxt/site/sessions"
    "juxt/site/login-form"
    "juxt/site/user-model"
    "juxt/site/password-based-user-identity"
    "juxt/site/oauth-authorization-server"
    "juxt/site/example-users"]
   AUTH_SERVER)

  (let [result (login/login-with-form!
                *handler*
                :juxt.site/uri "https://auth.example.test/login"
                "username" "ALICE"
                "password" "garden")]
    (is (malli/validate [:map [:juxt.site/session-token :string]] result))))
