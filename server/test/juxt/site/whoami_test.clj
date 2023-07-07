;; Copyright © 2023, JUXT LTD.

(ns juxt.site.whoami-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.installer :refer [call-operation-with-init-data!]]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles! converge!]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]))

(defn bootstrap []
  (install-bundles!
   ["juxt/site/bootstrap"]
   RESOURCE_SERVER
   {})

  ;; Install a private-key for signing
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

  (call-operation-with-init-data!
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
   RESOURCE_SERVER {}))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(deftest get-subject-test
  ;; Register an application
  ;; TODO: Only temporary while moving init below pkg


  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         { ;;:grant-type "authorization_code"
          :grant-type "implicit"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :session-token session-token
          :client "https://auth.example.test/applications/test-app"})]

    (oauth/with-bearer-token access-token
      (let [{:ring.response/keys [headers body]}
            (*handler*
             {:juxt.site/uri "https://data.example.test/_site/whoami"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/json"}})]

        (is (= "Alice"
               (-> body
                   json/read-value
                   (get-in ["juxt.site/subject"
                            "juxt.site/user-identity"
                            "juxt.site/user"
                            "fullname"
                            ]))))
        (is (= "application/json" (get headers "content-type")))
        (is (= "https://data.example.test/_site/whoami.json" (get headers "content-location"))))

      (let [{:ring.response/keys [status headers]}
            (*handler*
             {:juxt.site/uri "https://data.example.test/_site/whoami.edn"
              :ring.request/method :get
              :ring.request/headers
              {"authorization" (format "Bearer %s" access-token)
               }})]
        (is (= 200 status))
        (is (= "application/edn" (get headers "content-type")))))))
