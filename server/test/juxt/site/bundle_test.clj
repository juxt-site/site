;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bundle-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.local-files-util :as local]
   [juxt.site.test-helpers.handler :refer [handler-fixture *handler*]]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.client :as client]
   [xtdb.api :as xt]
   [juxt.site.repl :as repl]
   [clojure.pprint :refer [pprint]]))

(use-fixtures :each system-xt-fixture handler-fixture)

(deftest catch-missing-dependency-test
  (let [exception
        (try
          (local/install-bundles!
           [["juxt/site/bootstrap" {}]
            "juxt/site/resources-api"]
           (get CONFIG "uri-map"))
          (catch Exception e
            (ex-data e)))]
    (is (= "https://auth.example.test/scopes/system/write"
           (:dependency exception)))))

(deftest put-bundle-test
  (local/install-bundles!
   [["juxt/site/bootstrap" {}]]
   (get CONFIG "uri-map"))
  (let [db (xt/db *xt-node*)
        resource (first (map first (xt/q db '{:find [(pull e [*])]
                                       :where [[e :xt/id "https://data.example.test/bundles/juxt/site/bootstrap"]]})))]
    (is (= "https://data.example.test/bundles/juxt/site/bootstrap"
           (:xt/id resource)))))

(deftest get-bundle-test
  (local/install-bundles!
   [["juxt/site/bootstrap" {}]
    ["juxt/site/oauth-scope" {}]
    ["juxt/site/full-dynamic-remote" {}]
    ;; Support the creation of JWT bearer tokens
    "juxt/site/protection-spaces"
    "juxt/site/unprotected-resources"
    "juxt/site/selmer-templating"
    ["juxt/site/oauth-token-endpoint" {}]
    ;; Install a keypair to sign JWT bearer tokens
    ["juxt/site/keypair" {"kid" "test-kid"}]
    ;; Install the required APIs
    "juxt/site/user-model"
    "juxt/site/roles"
    ["juxt/site/resources-api" {}]
    ["juxt/site/events-api" {}]
    ["juxt/site/logs-api" {}]
    ["juxt/site/whoami-api" {}]
    ["juxt/site/users-api" {}]
    ["juxt/site/users-api-permissions" {}]
    ["juxt/site/applications-api" {}]
    ["juxt/site/applications-endpoint" {}]
    ["juxt/site/openapis-api" {}]
    ["juxt/site/bundles-api" {}]

    ["juxt/site/sessions" {}]
    "juxt/site/login-form"
    "juxt/site/system-api-openapi"

    ;; RFC 7662 token introspection
    ["juxt/site/oauth-introspection-endpoint" {}]
    ;; Register the clients
    ["juxt/site/system-client" {"client-id" "site-cli"}]
    "juxt/site/password-based-user-identity"
    "juxt/site/example-users"
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "/session-scopes/form-login-session"
      "session-scope-authority" "https://auth.example.test"
      "authorization-code-length" 12
      "jti-length" 12}]
    ["juxt/site/user-role-assignment"
     {"username" "alice"
      "rolename" "SiteAdmin"}]
    "juxt/site/system-test-clients"
    ["juxt/site/application-role-assignment"
     {"clientid" "site-cli"
      "rolename" "SiteSystemQuery"}]
    "juxt/site/bundles-api"]
   (get CONFIG "uri-map"))
  (client/create-admin-user)
  (local/install-bundles!
   ["juxt/site/system-api-openapi"
    "juxt/site/login-form"
    "juxt/site/password-based-user-identity"
    "juxt/site/example-users"
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "/session-scopes/form-login-session"
      "session-scope-authority" "https://auth.example.test"
      "authorization-code-length" 12
      "jti-length" 12}]
    ["juxt/site/user-role-assignment"
     {"username" "alice"
      "rolename" "SiteAdmin"}]
    "juxt/site/system-test-clients"
    ["juxt/site/application-role-assignment"
     {"clientid" "site-cli"
      "rolename" "SiteSystemQuery"}]]
   (get CONFIG "uri-map"))
  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "password"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client (str "https://auth.example.test/applications/global-scope-app")
          :username "alice"
          :password "garden"})]
    (with-bearer-token access-token
      (let [request {:juxt.site/uri "https://data.example.test/bundles/juxt/site/login-form"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (get (json/read-value body) "installers")))
      (let [request {:juxt.site/uri "https://data.example.test/bundles/juxt/site/login-form"
                     :ring.request/method :delete
                     :ringrequest/headers {"accept" "application/json"}}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status)))
      (let [request {:juxt.site/uri "https://data.example.test/bundles/juxt/site/login-form"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 404 status))))))
