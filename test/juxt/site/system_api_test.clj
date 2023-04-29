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
   [juxt.site.test-helpers.local-files-util :refer [install-installer-groups! converge!]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
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
  (install-installer-groups! ["juxt/site/bootstrap"] AUTH_SERVER {})
  (install-installer-groups! ["juxt/site/system-api"] RESOURCE_SERVER {})

  ;; Need some test users and a way for them to authenticate
  (install-installer-groups!
   ["juxt/site/login-form" "juxt/site/example-users"]
   RESOURCE_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"})

  ;; Install an authorization server
  (install-installer-groups!
   ["juxt/site/oauth-authorization-server"]
   RESOURCE_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "kid" "test-kid"
    "authorization-code-length" 12
    "jti-length" 12})

  ;; Alice has the System role which confers access to put-user
  (converge!
   [{:juxt.site/target-uri "https://data.example.test/_site/role-assignments/{{username}}-{{rolename}}"
     :juxt.site/parameters
     {"username" "alice"
      "rolename" "System"}}]
   RESOURCE_SERVER
   {})

  ;; ... whereas Bob has the SystemReadonly role which doesn't
  (converge!
   [{:juxt.site/target-uri "https://data.example.test/_site/role-assignments/{{username}}-{{rolename}}"
     :juxt.site/parameters
     {"username" "bob"
      "rolename" "SystemReadonly"}}]
   RESOURCE_SERVER
   {})

  ;; TODO: Analyse the performance cost of install-resource-groups!
  ;; Perhaps optimise by only creating the installer graph once and
  ;; passing it in as a parameter.

  (converge!
   ;; TODO: Add these resources to a group
   ["https://auth.example.test/clients/global-scope-app"
    "https://auth.example.test/clients/read-only-app"
    "https://auth.example.test/clients/read-write-app"]
   RESOURCE_SERVER
   {}))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

(deftest system-api-test

  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :session-token session-token
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :client "https://auth.example.test/clients/global-scope-app"})]

    (testing "Access achieved with correct permissions and role assignment"
      (oauth/with-bearer-token access-token
        (let [response
              (*handler*
               {:juxt.site/uri "https://data.example.test/_site/operations"
                :ring.request/method :get
                :ring.request/headers
                {"accept" "application/json"}})]

          (is (= "application/json" (get-in response [:ring.response/headers "content-type"])))
          (is (= 200 (:ring.response/status response)))

          (let [json (some-> response :ring.response/body json/read-value)]
            (is json)
            (is (<= 8 (count json)))
            json))))))

(deftest openapi-json-test
  (let [{:ring.response/keys [status headers body]}
        (*handler*
         {:ring.request/method :get
          :juxt.site/uri "https://data.example.test/_site/openapi.json"})]
    (is (= 200 status))
    (is (= "application/json" (get headers "content-type")))
    (let [json (json/read-value body)]
      (is (= 2 (count (get-in json ["paths" "/users"])))))))

;; So we need a system-api call that will allow us to add a
;; user. We'll still need the site tool to bootstrap users, but it
;; shouldn't be necessary to use the tool for adding new users once
;; the system has been bootstrapped.

;; TODO: Can a client-id be a URI?

(deftest put-user-combinations-test
  (letfn [(login [username]
            (login/login-with-form!
             username
             (case username
               "alice" "garden"
               "bob" "walrus")))
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
                          :client (str "https://auth.example.test/clients/" client)}
                   requested-scope (assoc :scope (absolute-scope requested-scope))))]
            (oauth/with-bearer-token access-token
              (let [payload (.getBytes (pr-str {:xt/id "https://data.example.test/_site/users/hannah"}))
                    request {:juxt.site/uri "https://data.example.test/_site/users"
                             :ring.request/method :post
                             :ring.request/headers
                             {"content-type" "application/edn"
                              "content-length" (str (count payload))}
                             :ring.request/body (io/input-stream payload)}
                    response (*handler* request)]
                (is (= expected-status (:ring.response/status response)))
                ))))

      ;; Alice has permission, and using a client with global-scope
        "alice" "global-scope-app" "authorization_code" nil 200
        "alice" "global-scope-app" "implicit" nil 200

        ;; Alice has permission, requesting write scope from a client
        ;; with global scope
        "alice" "global-scope-app" "authorization_code" #{"system/read" "system/write"} 200
        "alice" "global-scope-app" "implicit" #{"system/read" "system/write"} 200

        ;; Alice has permission, but not requesting sufficient scope
        ;; from a client with global scope means she cannot create a
        ;; user.
        "alice" "global-scope-app" "authorization_code" #{"system/read"} 403
        "alice" "global-scope-app" "implicit" #{"system/read"} 403

        ;; Alice has permission, and can use a client with sufficient
        ;; scope to create a user.
        "alice" "read-write-app" "authorization_code" nil 200
        "alice" "read-write-app" "implicit" nil 200

        ;; Alice has permission, using a client with sufficient scope
        ;; but requesting insufficient scope to create a user.  scope to
        ;; create a user results in a Forbidden response.
        "alice" "read-write-app" "authorization_code" #{"system/read"} 403
        "alice" "read-write-app" "implicit" #{"system/read"} 403

        ;; Alice has permission, using a client with sufficient scope
        ;; and explicitly requesting sufficient scope to create a user.
        "alice" "read-write-app" "authorization_code" #{"system/write"} 200
        "alice" "read-write-app" "implicit" #{"system/write"} 200

        ;; Alice has permission, but using a client with insufficient
        ;; scope.
        "alice" "read-only-app" "authorization_code" nil 403
        "alice" "read-only-app" "implicit" nil 403

        ;; Alice has permission, but using a client with insufficient
        ;; scope and explicitly requesting insufficient scope.
        "alice" "read-only-app" "authorization_code" #{"system/read"} 403
        "alice" "read-only-app" "implicit" #{"system/read"} 403

        ;; Bob can't add users, regardless of the application he uses.
        "bob" "global-scope-app" "authorization_code" nil 403
        "bob" "global-scope-app" "implicit" nil 403

        ;; Bob doesn't have permission to add users, and this means he
        ;; can't add users even if he's able to request sufficient
        ;; scope with a client that is configured with global scope.
        "bob" "global-scope-app" "authorization_code" #{"system/read" "system/write"} 403
        "bob" "global-scope-app" "implicit" #{"system/read" "system/write"} 403

        ;; Bob doesn't have permission to add users, and this means he
        ;; can't add users even if he's able to request sufficient
        ;; scope with a client that is configured with sufficient
        ;; scope.
        "bob" "read-write-app" "authorization_code" #{"system/read" "system/write"} 403
        "bob" "read-write-app" "implicit" #{"system/read" "system/write"} 403

        ;; Bob doesn't have permission to add users, using a client
        ;; with insufficient scope.
        "bob" "read-only-app" "authorization_code" nil 403
        "bob" "read-only-app" "implicit" nil 403

        ;; Bob doesn't have permission to add users, using a client
        ;; with insufficient scope, explicitly request insufficient
        ;; scope.
        "bob" "read-only-app" "authorization_code" #{"system/read"} 403
        "bob" "read-only-app" "implicit" #{"system/read"} 403
        )))


#_(with-fixtures
  (converge!
   ["https://data.example.test/_site/users/{username}"]
   RESOURCE_SERVER
   {})

  (converge!
   ["https://data.example.test/_site/users/alice"]
   RESOURCE_SERVER
   {})

  {:alice (repl/e "https://data.example.test/_site/users/alice")
   :api-get-user (repl/e "https://data.example.test/_site/users/{username}")
   :api-get-users (repl/e "https://data.example.test/_site/users")}

  (repl/e "https://data.example.test/_site/users/{username}")

  ;; Direct read of user
  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :session-token session-token
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :client "https://auth.example.test/clients/global-scope-app"})
        {:ring.response/keys [body] :as response}
        (oauth/with-bearer-token access-token
          (*handler*
           {:ring.request/method :get
            :ring.request/headers {"accept" "application/json"}
            :juxt.site/uri "https://data.example.test/_site/users/alice"}))]

    (json/read-value body)))
