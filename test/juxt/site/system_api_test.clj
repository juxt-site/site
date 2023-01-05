;; Copyright © 2022, JUXT LTD.

(ns juxt.site.system-api-test
  (:require
   [jsonista.core :as json]
   [juxt.site.actions :as actions]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.test.util
    :refer [with-system-xt *xt-node*
            with-session-token with-bearer-token
            with-fixtures *handler* with-handler
            install-packages! install-resource-with-action!
            AUTH_SERVER RESOURCE_SERVER]]
   [xtdb.api :as xt]))

(use-fixtures :each with-system-xt with-handler)

;;

(deftest system-api-test

  (install-packages! ["bootstrap" "roles" "protection-spaces"] AUTH_SERVER)
  (install-packages! ["system-api"] RESOURCE_SERVER)

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
   "https://auth.example.test/_site/subjects/system"
   "https://auth.example.test/actions/register-client"
   {:juxt.site/client-id "test-app"
    :juxt.site/client-type "confidential"
    :juxt.site/redirect-uri "https://test-app.example.test/callback"})

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

          ;; This access token is not sufficient, so we get a 403
          (is (= 403 (:ring.response/status response))))))

    ;; Assign Alice to the SystemReadonly role
    (install-resource-with-action!
     "https://auth.example.test/_site/subjects/system"
     "https://auth.example.test/actions/assign-role"
     {:juxt.site/user "https://auth.example.test/users/alice"
      :juxt.site/role "https://auth.example.test/roles/SystemReadonly"})

    (testing "Access achieved with correct permissions and role assignment"
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
            (is (<= 10 (count (get json "actions")) 30))))))


    (repl/ls-type "https://meta.juxt.site/types/action")

    (repl/ls-type "https://meta.juxt.site/types/permission")

    (repl/e (:juxt.site/action (repl/e "https://auth.example.test/permissions/alice-can-authorize")))

    (let [db (xt/db *xt-node*)
          actions #_(set (repl/ls-type "https://meta.juxt.site/types/action"))
          (set #{"https://auth.example.test/actions/system-api/get-actions"
                 "https://auth.example.test/actions/system-api/get-users"
                 "https://auth.example.test/actions/put-session-scope"
                 "https://auth.example.test/actions/login"})

          rules
          (actions/actions->rules db actions)
          #_(vec
             (for [[e rules]
                   (xt/q db {:find ['e 'rules]
                             :where [['e :xt/id (set actions)]
                                     ['e :juxt.site/rules 'rules]]})]
               (vec
                (concat ['(allowed? subject action resource permission)]
                        (rest rules)
                        [['action :xt/id e]]))))
          subject (some-> (repl/access-token access-token) first :juxt.site/subject :xt/id)]

      (is (= 3
             (count
              (map :juxt.site/action
                   (for [{:juxt.site/keys [permission action] :as item}
                         (xt/q
                          db
                          {:find '[(pull permission [*]) (pull action [*])]
                           :keys '[juxt.site/permission juxt.site/action]
                           :where
                           '[
                             [action :juxt.site/type "https://meta.juxt.site/types/action"]

                             ;; Only consider given actions
                             [(contains? actions action)]

                             ;; Only consider a permitted action
                             [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                             [permission :juxt.site/action action]
                             (allowed? subject action resource permission)

                             ;; Only permissions that match our purpose
                             [permission :juxt.site/purpose purpose]]

                           :rules rules

                           :in '[subject actions resource purpose]}

                          subject
                          actions
                          nil                   ; resource
                          nil
                          )]
                     ;;        item
                     permission
                     ))))))))

;;(set! *print-namespace-maps* false)
