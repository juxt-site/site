;; Copyright © 2022, JUXT LTD.

(ns juxt.site.oauth-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [xtdb.api :as xt]
   [juxt.test.util
    :refer [system-xt-fixture
            with-session-token with-bearer-token
            with-fixtures *handler* *xt-node* handler-fixture
            install-packages!
            install-resource-with-action!
            AUTH_SERVER RESOURCE_SERVER]]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest register-client-test
  (install-packages! ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"] AUTH_SERVER)

  (testing "Register client with generated client-id"
    (let [result
          (install-resource-with-action!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/actions/register-client"
           {:juxt.site/client-type "public"
            :juxt.site/redirect-uri "https://test-app.example.test/callback"})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (nil? (:juxt.site/client-secret doc)))))

  (testing "Register client with generated client-id and client-secret"
    (let [result
          (install-resource-with-action!
           "https://auth.example.test/_site/subjects/system"
           "https://auth.example.test/actions/register-client"
           {:juxt.site/client-type "confidential"
            :juxt.site/redirect-uri "https://test-app.example.test/callback"})
          doc-id (some-> result :juxt.site/puts first)
          doc (when doc-id (xt/entity (xt/db *xt-node*) doc-id))]
      (is doc)
      (is (:juxt.site/client-secret doc))))

  (testing "Re-registering the same client-id will fail"
    (let [input {:juxt.site/client-id "test-app"
                 :juxt.site/client-type "public"
                 :juxt.site/redirect-uri "https://test-app.example.test/callback"}]
      (install-resource-with-action!
       "https://auth.example.test/_site/subjects/system"
       "https://auth.example.test/actions/register-client"
       input)

      (is
       (=
        {:juxt.site/type "https://meta.juxt.site/types/client"
         :juxt.site/client-id "test-app"
         :juxt.site/client-type "public"
         :juxt.site/redirect-uri "https://test-app.example.test/callback"
         :xt/id "https://auth.example.test/clients/test-app"}
        (xt/entity (xt/db *xt-node*) "https://auth.example.test/clients/test-app")))

      (is
       (thrown?
        clojure.lang.ExceptionInfo
        (install-resource-with-action!
         "https://auth.example.test/_site/subjects/system"
         "https://auth.example.test/actions/register-client"
         input))))))

(deftest get-subject-test

  ;; Build the authorization server (https://auth.example.test)
  (install-packages! ["juxt/site/bootstrap" "juxt/site/sessions" "juxt/site/oauth-authorization-server"] AUTH_SERVER)

  ;; Register an application
  ;; TODO: Only temporary while moving init below pkg
  (install-resource-with-action!
   "https://auth.example.test/_site/subjects/system"
   "https://auth.example.test/actions/register-client"
   {:juxt.site/client-id "test-app"
    :juxt.site/client-type "confidential"
    :juxt.site/redirect-uri "https://test-app.example.test/callback"})

  ;; Now we need some mechanism to authenticate with the authorization server in
  ;; order to authorize applications and acquire tokens.

  (install-packages!
   ["juxt/site/login-form" "juxt/site/user-model" "juxt/site/password-based-user-identity"
    "juxt/site/example-users" "juxt/site/protection-spaces"]
   AUTH_SERVER)

  (install-packages! ["juxt/site/whoami"] RESOURCE_SERVER)

  (let [login-result
        (login/login-with-form!
         *handler*
         "username" "alice"
         "password" "garden"
         :juxt.site/uri "https://auth.example.test/login")

        session-token (:juxt.site/session-token login-result)
        _ (assert session-token)

        {access-token "access_token"}
        (with-session-token
          session-token
          (oauth/authorize!
           "https://auth.example.test/oauth/authorize"
           {"client_id" "test-app"}))]

    (with-bearer-token access-token
      (let [{:ring.response/keys [headers body]}
            (*handler*
             {:juxt.site/uri "https://data.example.test/whoami"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/json"}})]

        (is (= "Alice"
               (-> body
                   json/read-value
                   (get-in ["juxt.site/subject"
                            "juxt.site/user-identity"
                            "juxt.site/user"
                            "name"
                            ]))))
        (is (= "application/json" (get headers "content-type")))
        (is (= "https://data.example.test/whoami.json" (get headers "content-location"))))

      (let [{:ring.response/keys [status headers]}
            (*handler*
             {:juxt.site/uri "https://data.example.test/whoami.html"
              :ring.request/method :get
              :ring.request/headers
              {"authorization" (format "Bearer %s" access-token)
               }})]
        (is (= 200 status))
        (is (= "text/html;charset=utf-8" (get headers "content-type")))))))
