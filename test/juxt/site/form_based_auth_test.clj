;; Copyright © 2022, JUXT LTD.

(ns juxt.site.form-based-auth-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [malli.core :as malli]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.test.util
    :refer [*handler* with-fixtures with-system-xt with-handler install-packages! AUTH_SERVER]]))

(use-fixtures :each with-system-xt with-handler)

(deftest login-with-form-test
  (install-packages!
   ["bootstrap"
    "sessions"
    "login-form"
    "user-model"
    "password-based-user-identity"
    "oauth-authorization-server"
    "example-users"]
   AUTH_SERVER)

  (let [result (login/login-with-form!
                *handler*
                :juxt.site/uri "https://auth.example.test/login"
                "username" "ALICE"
                "password" "garden")]
    (is (malli/validate [:map [:juxt.site/session-token :string]] result))))
