;; Copyright © 2023, JUXT LTD.

(ns juxt.site.repl-extension-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [ring.util.codec :as codec]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.test.util
    :refer [system-xt-fixture with-session-token with-bearer-token
            *handler* handler-fixture
            with-fixtures
            install-resource-groups! install-resource-with-operation!
            converge!
            AUTH_SERVER]]

   [juxt.site.install :as install]))

(use-fixtures :each system-xt-fixture handler-fixture)

;; deftest repl-extension-test

#_(with-fixtures

  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER)
  (install-resource-groups! ["juxt/site/openid"] AUTH_SERVER)

  (let [
        ;; Take this inputs from a dialog
        issuer "https://juxt.eu.auth0.com"
        client-id "d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"
        client-secret "gvk-mNdDmyaFsJwN_xVKHPH4pfrInYqJE1r8lRrn0gmoKI4us0Q5Eb7ULdruYZjD"]
    ;; Call this from a bb script
    (converge!
     ["https://auth.example.test/login-with-openid"
      "https://auth.example.test/openid/callback"]
     AUTH_SERVER
     {"issuer-configuration" (format "https://auth.example.test/openid/issuers/%s" (codec/url-encode issuer))
      "client-configuration" (format "https://auth.example.test/openid/clients/%s" client-id)
      "client-secret" client-secret}))

  (repl/ls)
  (repl/e "https://auth.example.test/openid/clients/d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK")
  )
