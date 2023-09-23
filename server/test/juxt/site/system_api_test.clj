;; Copyright © 2022, JUXT LTD.

(ns juxt.site.system-api-test
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]))

;; Welcome to the System API test suite

;; TODO: Write an explanation of the testing strategy used in this
;; namespace.

;; TODO: Investigate use of test-ns-hook to run ns tests with both
;; implicit and authorization code grants. Until then, let's just use
;; 'authorization code'.

(defn bootstrap []
  (install-bundles!
   ["juxt/site/bootstrap"
    "juxt/site/unprotected-resources"
    "juxt/site/protection-spaces"
    "juxt/site/user-model"
    "juxt/site/api-operations"
    "juxt/site/users-api"
    "juxt/site/openapis-api"
    "juxt/site/system-api-openapi"
    ["juxt/site/sessions" {}]
    "juxt/site/login-form"
    "juxt/site/password-based-user-identity"
    "juxt/site/roles"
    "juxt/site/example-users"
    ["juxt/site/keypair" {"kid" "test-kid"}]
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
      "authorization-code-length" 12
      "jti-length" 12}]
    "juxt/site/oauth-token-endpoint"
    ;; Alice has the SiteAdmin role which confers access to put-user
    ["juxt/site/user-role-assignment"
     {"username" "alice"
      "rolename" "SiteAdmin"}]
    ;; ... whereas Bob has the SiteSystemQuery role which doesn't
    ["juxt/site/user-role-assignment"
     {"username" "bob"
      "rolename" "SystemReadonly"}]
    "juxt/site/system-test-clients"
    ["juxt/site/application-role-assignment"
     {"clientid" "site-cli"
      "rolename" "SiteSystemQuery"}]]
   RESOURCE_SERVER)

  ;; TODO: Analyse the performance cost of install-bundles!
  ;; Perhaps optimise by only creating the installer graph once and
  ;; passing it in as a parameter.
  )


(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(deftest openapi-json-test
  (let [{:ring.response/keys [status headers body]}
        (*handler*
         {:ring.request/method :get
          :juxt.site/uri "https://data.example.test/_site/openapi.json"})]
    (is (= 200 status))
    (is (= "application/json" (get headers "content-type")))
    (let [json (json/read-value body)]
      (is (= 2 (count (get-in json ["paths" "/users"]))))
      (is (= {"type" "oauth2",
              "flows"
              {"implicit"
               {"scopes"
                {"https://auth.example.test/scopes/system/self-identification"
                 "Self identification",
                 "https://auth.example.test/scopes/system/read"
                 "Read system info",
                 "https://auth.example.test/scopes/system/write"
                 "Administer system"},
                "authorizationUrl" "https://auth.example.test/oauth/authorize"},
               "authorizationCode"
               {"tokenUrl" "https://auth.example.test/oauth/token",
                "scopes"
                {"https://auth.example.test/scopes/system/self-identification"
                 "Self identification",
                 "https://auth.example.test/scopes/system/read"
                 "Read system info",
                 "https://auth.example.test/scopes/system/write"
                 "Administer system"},
                "authorizationUrl" "https://auth.example.test/oauth/authorize"},
               "password"
               {"tokenUrl" "https://auth.example.test/oauth/token",
                "scopes"
                {"https://auth.example.test/scopes/system/self-identification"
                 "Self identification",
                 "https://auth.example.test/scopes/system/read"
                 "Read system info",
                 "https://auth.example.test/scopes/system/write"
                 "Administer system"}},
               "clientCredentials"
               {"tokenUrl" "https://auth.example.test/oauth/token",
                "scopes"
                {"https://auth.example.test/scopes/system/self-identification"
                 "Self identification",
                 "https://auth.example.test/scopes/system/read"
                 "Read system info",
                 "https://auth.example.test/scopes/system/write"
                 "Administer system"}}}}
             (get-in json ["components" "securitySchemes" "oauth"]))))))

;; So we need a system-api call that will allow us to add a
;; user. We'll still need the site tool to bootstrap users, but it
;; shouldn't be necessary to use the tool for adding new users once
;; the system has been bootstrapped.

;; TODO: Can a client-id be a URI?
;; See https://indieauth.net/

(deftest put-user-combinations-test
  (letfn [(password [username]
            (case username
              "alice" "garden"
              "bob" "walrus"))
          (login [username]
            (login/login-with-form!
             username
             (password username)))

          (absolute-scope [scopes]
            (set (map (fn [scope] (str "https://auth.example.test/scopes/" scope)) scopes)))]

    (are [username client grant-type requested-scope expected-status]
        (testing (cond-> (format "%s using %s with %s grant" username client grant-type)
                   requested-scope (str " requesting " (str/join ", " requested-scope)))
          (let [session-token (login username)
                {access-token "access_token"}
                (oauth/acquire-access-token!
                 (cond-> {:grant-type grant-type
                          :authorization-uri "https://auth.example.test/oauth/authorize"
                          :token-uri "https://auth.example.test/oauth/token"
                          :session-token session-token
                          :client (str "https://auth.example.test/applications/" client)
                          :username username
                          :password (password username)}
                   requested-scope (assoc :scope (absolute-scope requested-scope))))]
            (oauth/with-bearer-token access-token
              (let [payload (.getBytes (pr-str {:username "hannah"}))
                    request {:juxt.site/uri "https://data.example.test/_site/users"
                             :ring.request/method :post
                             :ring.request/headers
                             {"content-type" "application/edn"
                              "content-length" (str (count payload))}
                             :ring.request/body (io/input-stream payload)}
                    response (*handler* request)]
                (is (= expected-status (:ring.response/status response)))))))

      ;; Alice has permission, and using a client with global-scope
        "alice" "global-scope-app" "authorization_code" nil 200
        "alice" "global-scope-app" "implicit" nil 200
        "alice" "global-scope-app" "password" nil 200

        ;; Alice has permission, requesting write scope from a client
        ;; with global scope
        "alice" "global-scope-app" "authorization_code" #{"system/read" "system/write"} 200
        "alice" "global-scope-app" "implicit" #{"system/read" "system/write"} 200
        "alice" "global-scope-app" "password" #{"system/read" "system/write"} 200

        ;; Alice has permission, but not requesting sufficient scope
        ;; from a client with global scope means she cannot create a
        ;; user.
        "alice" "global-scope-app" "authorization_code" #{"system/read"} 403
        "alice" "global-scope-app" "implicit" #{"system/read"} 403
        "alice" "global-scope-app" "password" #{"system/read"} 403

        ;; Alice has permission, and can use a client with sufficient
        ;; scope to create a user.
        "alice" "read-write-app" "authorization_code" nil 200
        "alice" "read-write-app" "implicit" nil 200
        "alice" "read-write-app" "password" nil 200

        ;; Alice has permission, using a client with sufficient scope
        ;; but requesting insufficient scope to create a user.  scope to
        ;; create a user results in a Forbidden response.
        "alice" "read-write-app" "authorization_code" #{"system/read"} 403
        "alice" "read-write-app" "implicit" #{"system/read"} 403
        "alice" "read-write-app" "password" #{"system/read"} 403

        ;; Alice has permission, using a client with sufficient scope
        ;; and explicitly requesting sufficient scope to create a user.
        "alice" "read-write-app" "authorization_code" #{"system/write"} 200
        "alice" "read-write-app" "implicit" #{"system/write"} 200
        "alice" "read-write-app" "password" #{"system/write"} 200

        ;; Alice has permission, but using a client with insufficient
        ;; scope.
        "alice" "read-only-app" "authorization_code" nil 403
        "alice" "read-only-app" "implicit" nil 403
        "alice" "read-only-app" "password" nil 403

        ;; Alice has permission, but using a client with insufficient
        ;; scope and explicitly requesting insufficient scope.
        "alice" "read-only-app" "authorization_code" #{"system/read"} 403
        "alice" "read-only-app" "implicit" #{"system/read"} 403
        "alice" "read-only-app" "password" #{"system/read"} 403

        ;; Bob can't add users, regardless of the application he uses.
        "bob" "global-scope-app" "authorization_code" nil 403
        "bob" "global-scope-app" "implicit" nil 403
        "bob" "global-scope-app" "password" nil 403

        ;; Bob doesn't have permission to add users, and this means he
        ;; can't add users even if he's able to request sufficient
        ;; scope with a client that is configured with global scope.
        "bob" "global-scope-app" "authorization_code" #{"system/read" "system/write"} 403
        "bob" "global-scope-app" "implicit" #{"system/read" "system/write"} 403
        "bob" "global-scope-app" "password" #{"system/read" "system/write"} 403

        ;; Bob doesn't have permission to add users, and this means he
        ;; can't add users even if he's able to request sufficient
        ;; scope with a client that is configured with sufficient
        ;; scope.
        "bob" "read-write-app" "authorization_code" #{"system/read" "system/write"} 403
        "bob" "read-write-app" "implicit" #{"system/read" "system/write"} 403
        "bob" "read-write-app" "password" #{"system/read" "system/write"} 403

        ;; Bob doesn't have permission to add users, using a client
        ;; with insufficient scope.
        "bob" "read-only-app" "authorization_code" nil 403
        "bob" "read-only-app" "implicit" nil 403
        "bob" "read-only-app" "password" nil 403

        ;; Bob doesn't have permission to add users, using a client
        ;; with insufficient scope, explicitly request insufficient
        ;; scope.
        "bob" "read-only-app" "authorization_code" #{"system/read"} 403
        "bob" "read-only-app" "implicit" #{"system/read"} 403
        "bob" "read-only-app" "password" #{"system/read"} 403
        )))

(deftest put-user-with-json-test
  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         (cond-> {:grant-type "authorization_code"
                  :authorization-uri "https://auth.example.test/oauth/authorize"
                  :token-uri "https://auth.example.test/oauth/token"
                  :session-token session-token
                  :client (str "https://auth.example.test/applications/global-scope-app")}))]
    (oauth/with-bearer-token access-token
      ;; TODO: Also try with a batch of multiple users
      (let [payload (json/write-value-as-bytes {"xt/id" "https://data.example.test/_site/users/hannah"
                                                "fullname" "Hannah"
                                                "username" "hannah"})
            request {:juxt.site/uri "https://data.example.test/_site/users"
                     :ring.request/method :post
                     :ring.request/headers
                     {"content-type" "application/json"
                      "content-length" (str (count payload))}
                     :ring.request/body (io/input-stream payload)}
            response (*handler* request)]
        (is (= 200 (:ring.response/status response)))

        (let [request {:juxt.site/uri "https://data.example.test/_site/users/hannah"
                       :ring.request/method :get
                       :ring.request/headers
                       {"accept" "application/json"}
                       }
              response (*handler* request)]
          (is (= 200 (:ring.response/status response)))
          (is (= {"juxt.site/username" "hannah", "fullname" "Hannah"} (json/read-value (:ring.response/body response)))))))))

(deftest application-access-to-users
  (let [{access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "client_credentials"
          :token-uri "https://auth.example.test/oauth/token"
          :client "https://auth.example.test/applications/site-cli"})]

    (oauth/with-bearer-token access-token
      (let [response
            (*handler*
             {:juxt.site/uri "https://data.example.test/_site/users"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/json"}})]

        (is (= 200 (:ring.response/status response)))
        (is (= "application/json" (get-in response [:ring.response/headers "content-type"])))

        (let [json (some-> response :ring.response/body json/read-value)]
            (is json)
            (is (<= 3 (count json)))
            json)))))


#_(with-fixtures
  (let [{access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "client_credentials"
          :token-uri "https://auth.example.test/oauth/token"
          :client "https://auth.example.test/applications/site-cli"})]


    (oauth/with-bearer-token access-token
      (let [response
            (*handler*
             {:juxt.site/uri "https://data.example.test/_site/whoami"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/edn"}})

            body (edn/read-string (:ring.response/body response))

            ]

        body






        ))

    (oauth/with-bearer-token access-token
      (let [response
            (*handler*
             {:juxt.site/uri "https://data.example.test/_site/users"
              :ring.request/method :get
              :ring.request/headers
              {"accept" "application/edn"}})



            ]

        response


        #_{:subject subject
           :subject-in-db (repl/e (:xt/id subject))
           :app (repl/e "https://auth.example.test/applications/site-cli")
           :list (repl/ls)
           }



        ))

    #_(repl/ls "role-assignments")

    #_(oauth/with-bearer-token access-token
        (let [response
              (*handler*
               {:juxt.site/uri "https://data.example.test/_site/users"
                :ring.request/method :get
                :ring.request/headers
                {"accept" "application/json"}})]

          response
          ))))
