;; Copyright © 2022, JUXT LTD.

(ns juxt.site.system-api-test
  (:require
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures testing]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.oauth :as oauth]
   [xtdb.api :as xt]
   [juxt.test.util
    :refer [with-system-xt
            with-session-token with-bearer-token
            with-fixtures *handler* *xt-node* with-handler
            install-package! install-resource-with-action!]]))

(use-fixtures :each with-system-xt with-handler)

;;deftest system-api-test

#_(with-fixtures

  ;; Build authorization server
  (let [uri-map {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"}]
    (install-package! "bootstrap" uri-map))

  ;; Build resource server
  (let [uri-map {#{"https://auth.example.org" "https://core.example.org"} "https://auth.example.test"
                 "https://example.org" "https://data.example.test"}]
    (install-package! "protection-spaces" uri-map)
    (install-package! "system-api" uri-map))

  (let [response
        (*handler*
         {:juxt.site/uri "https://data.example.test/_site/actions.json"
          :ring.request/method :get})]
    (cond->
        (select-keys
         response
         [:ring.response/status
          :ring.response/body
          :ring.response/headers])
      (= "application/json" (get-in response [:ring.response/headers "content-type"]))
      (update :ring.response/body json/read-value)))

  (let [response
        (*handler*
         {:juxt.site/uri "https://data.example.test/_site/actions.html"
          :ring.request/method :get})]
    (cond->
        (select-keys
         response
         [:ring.response/status
          :ring.response/body
          :ring.response/headers])
      (= "application/json" (get-in response [:ring.response/headers "content-type"]))
      (update :ring.response/body json/read-value)))


  ;; Register an application
  ;; TODO: Only temporary while moving init below pkg
  #_(install-resource-with-action!
     {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
      :juxt.site/action-id "https://auth.example.test/actions/register-client"
      :juxt.site/input
      {:juxt.site/client-id "test-app"
       :juxt.site/client-type "confidential"
       :juxt.site/redirect-uri "https://test-app.example.test/callback"}})

  ;; Now we need some mechanism to authenticate with the authorization server in
  ;; order to authorize applications and acquire tokens.

  #_#_#_#_#_#_(install-package!
               "login-form"
               {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

  (install-package!
   "user-model"
   {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

  (install-package!
   "password-based-user-identity"
   {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

  (install-package!
   "example-users"
   {#{"https://example.org" "https://core.example.org"} "https://auth.example.test"})

  (install-package!
   "protection-spaces"
   {#{"https://auth.example.org" "https://core.example.org"} "https://auth.example.test"})

  (install-package!
   "whoami"
   {"https://example.org" "https://example.test"
    #{"https://auth.example.org" "https://core.example.org"} "https://auth.example.test"})

  #_(let [login-result
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
               {:juxt.site/uri "https://example.test/whoami"
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
          (is (= "https://example.test/whoami.json" (get headers "content-location"))))

        (let [{:ring.response/keys [status headers]}
              (*handler*
               {:juxt.site/uri "https://example.test/whoami.html"
                :ring.request/method :get
                :ring.request/headers
                {"authorization" (format "Bearer %s" access-token)
                 }})]
          (is (= 200 status))
          (is (= "text/html;charset=utf-8" (get headers "content-type"))))))

  )
