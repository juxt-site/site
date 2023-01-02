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
            install-packages! install-resource-with-action! put!]]))

(use-fixtures :each with-system-xt with-handler)

(def AUTH_SERVER
  {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

(def RESOURCE_SERVER
  {#{"https://auth.example.org" "https://core.example.org"} "https://auth.example.test"
   "https://example.org" "https://data.example.test"})

(deftest system-api-test

  (install-packages! ["bootstrap"] AUTH_SERVER)
  (install-packages! ["protection-spaces" "system-api"] RESOURCE_SERVER)

  (testing "Actions API endpoint cannot be accessed anonymously"
    (let [response
          (*handler*
           {:juxt.site/uri "https://data.example.test/_site/actions.json"
            :ring.request/method :get})]
      (is (= 401 (:ring.response/status response)))
      (is (= "Bearer" (get-in response [:ring.response/headers "www-authenticate"])))))

  (install-packages!
   ["sessions" "oauth-authorization-server" "login-form"
    "user-model" "password-based-user-identity" "example-users"]
   AUTH_SERVER)

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

    (testing "Permissions are required for access"
      (with-bearer-token access-token
        (let [response
              (*handler*
               {:juxt.site/uri "https://data.example.test/_site/actions"
                :ring.request/method :get
                :ring.request/headers
                {"accept" "application/json"}})]

          ;; This access token is not sufficient
          (is (= 403 (:ring.response/status response))))))

    ;; Grant permission to the SystemReadonly role to call the 'get-actions' action
    (install-resource-with-action!
     {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
      :juxt.site/action-id "https://auth.example.test/_site/actions/grant-permission"
      :juxt.site/input
      {:xt/id "https://auth.example.test/permissions/by-role/SystemReadonly/system-api/get-actions"
       :juxt.site/action "https://auth.example.test/actions/system-api/get-actions"
       :juxt.site/purpose nil
       :role "https://auth.example.test/roles/SystemReadonly"}})

    ;; Assign the role to alice - TODO: Let's have a role package with
    ;; actions that can do this properly
    (put! {:xt/id "https://auth.example.test/role-assignments/alice"
           :juxt.site/type "https://auth.example.test/types/role-membership"
           :role "https://auth.example.test/roles/SystemReadonly"
           :juxt.site/user "https://auth.example.test/users/alice"})

    (testing "Access achieved with with correct permissions and role assignment"
      (with-bearer-token access-token
        (let [response
              (*handler*
               {:juxt.site/uri "https://data.example.test/_site/actions"
                :ring.request/method :get
                :ring.request/headers
                {"accept" "application/json"}})]

          (is (= "application/json" (get-in response [:ring.response/headers "content-type"])))
          (is (= 200 (:ring.response/status response)))

          (let [json (some-> response :ring.response/body json/read-value)]
            (is json)
            (is (<= 10 (count (get json "actions")) 30))))))))
