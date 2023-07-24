;; Copyright © 2023, JUXT LTD.

(ns juxt.site.debug-test
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [juxt.site.test-helpers.install :refer [perform-operation!]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles! converge!]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]))

(use-fixtures :once system-xt-fixture handler-fixture)

(comment
  (with-fixtures
    (install-bundles!
     ["juxt/site/bootstrap"]
     RESOURCE_SERVER {})

    (converge!
     [{:juxt.site/base-uri "https://auth.example.test"
       :juxt.site/installer-path "/keypairs/{{kid}}"
       :juxt.site/parameters {"kid" "test-kid"}}]
     RESOURCE_SERVER
     {})

    (install-bundles!
     ["juxt/site/sessions"
      "juxt/site/oauth-token-endpoint"
      "juxt/site/oauth-authorization-endpoint"]
     RESOURCE_SERVER
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
      "authorization-code-length" 12
      "jti-length" 12})

    (perform-operation!
     *xt-node*
     {:juxt.site/subject-uri "https://auth.example.test/_site/subjects/system"
      :juxt.site/operation-uri "https://auth.example.test/operations/oauth/register-application"
      :juxt.site/input
      {:juxt.site/client-id "test-app"
       :juxt.site/client-type "confidential"
       :juxt.site/resource-server "https://data.example.test"
       :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}})

    ;; Now we need some mechanism to authenticate with the authorization server in
    ;; order to authorize applications and acquire tokens.
    (install-bundles!
     ["juxt/site/login-form" "juxt/site/user-model" "juxt/site/password-based-user-identity"
      "juxt/site/example-users" "juxt/site/protection-spaces"]
     AUTH_SERVER
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

    (install-bundles!
     ["juxt/site/api-operations"
      "juxt/site/system-api"
      "juxt/site/openapi"
      "juxt/site/system-api-openapi"]
     RESOURCE_SERVER {})

    (repl/ls)))
