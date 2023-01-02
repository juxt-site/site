;; Copyright © 2022, JUXT LTD.

(ns juxt.site.system-api-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.test.util
    :refer [with-system-xt
            with-session-token with-bearer-token
            with-fixtures *handler* with-handler
            install-packages!
            install-resource-with-action!]]))

(use-fixtures :each with-system-xt with-handler)

(deftest system-api-test

  ;; Build authorization server
  (install-packages!
   ["bootstrap"]
   {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

  ;; Build resource server
  (install-packages!
   ["protection-spaces" "system-api"]
   {#{"https://auth.example.org" "https://core.example.org"} "https://auth.example.test"
    "https://example.org" "https://data.example.test"})

  ;; Test to ensure we can't access https://data.example.test/_site/actions.json
  (with-logging
    (let [response
          (*handler*
           {:juxt.site/uri "https://data.example.test/_site/actions.json"
            :ring.request/method :get})]
      (is (= 401 (:ring.response/status response)))
      (is (= "Bearer" (get-in response [:ring.response/headers "www-authenticate"])))))

  (install-packages!
   ["sessions"
    "oauth-authorization-server"
    "login-form"
    "user-model"
    "password-based-user-identity"
    "example-users"]
   {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

  (install-resource-with-action!
   {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
    :juxt.site/action-id "https://auth.example.test/actions/register-client"
    :juxt.site/input
    {:juxt.site/client-id "test-app"
     :juxt.site/client-type "confidential"
     :juxt.site/redirect-uri "https://test-app.example.test/callback"}})

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
      (let [response
            (*handler*
             {:juxt.site/uri "https://data.example.test/_site/actions"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/json"}})]

        ;; This access token is not sufficient
        (is (= 403 (:ring.response/status response)))

        #_(cond-> response
          true (select-keys [:ring.response/status
                             :ring.response/headers
                             :ring.response/body])
          (= "application/json" (get-in response [:ring.response/headers "content-type"]))
          (update :ring.response/body json/read-value))))))
