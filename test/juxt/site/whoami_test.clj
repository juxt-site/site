;; Copyright © 2023, JUXT LTD.

(ns juxt.site.whoami-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.installer :refer [call-operation-with-init-data!]]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-installer-groups!]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]))

(defn bootstrap []
  (install-installer-groups!
   ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"]
   RESOURCE_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "kid" "test-kid"
    "authorization-code-length" 12
    "jti-length" 12})

  (call-operation-with-init-data!
   *xt-node*
   {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
    :juxt.site/operation-id "https://auth.example.test/operations/oauth/register-client"
    :juxt.site/input
    {:juxt.site/client-id "test-app"
     :juxt.site/client-type "confidential"
     :juxt.site/resource-server "https://data.example.test"
     :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}})

  ;; Now we need some mechanism to authenticate with the authorization server in
  ;; order to authorize applications and acquire tokens.
  (install-installer-groups!
   ["juxt/site/login-form" "juxt/site/user-model" "juxt/site/password-based-user-identity"
    "juxt/site/example-users" "juxt/site/protection-spaces"]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

  (install-installer-groups! ["juxt/site/system-api"] RESOURCE_SERVER {}))

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
          :client "https://auth.example.test/clients/test-app"})]

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
             {:juxt.site/uri "https://data.example.test/_site/whoami.html"
              :ring.request/method :get
              :ring.request/headers
              {"authorization" (format "Bearer %s" access-token)
               }})]
        (is (= 200 status))
        (is (= "text/html;charset=utf-8" (get headers "content-type")))))))
