(ns juxt.site.test-helpers.petstore
  (:require
   [jsonista.core :as json]
   [clojure.java.io :as io]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*] :as client]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [clojure.walk :refer [postwalk]]
   [juxt.site.install.common-install-util :as ciu]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]))

(defn install-openapi! []
  (install-bundles!
   [;; This installs the operation that allows us to install an OpenAPI
    "juxt/site/openapis-api"]
   (get CONFIG "uri-map")))

(defn install-petstore! []
  (let [openapi-file (io/file "../demo/petstore/openapi.json")
        openapi (json/read-value (slurp openapi-file))
        data-base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])

        _
        (with-bearer-token *admin-token*
          (let [mapped-openapi (update-in openapi ["servers" 0 "url"] #(str data-base-uri %))]
            (-> (postwalk (ciu/make-uri-map-replace-walk-fn
                           (get CONFIG "uri-map"))
                          mapped-openapi)
                client/install-openapi!)))]
    (install-bundles!
     [
      "juxt/site/system-api-openapi"
      "juxt/site/login-form"
      "juxt/site/password-based-user-identity"
      "juxt/site/example-users"
      ["juxt/site/keypair" {"kid" "test-kid"}]
      "juxt/site/sessions"
      ["juxt/site/oauth-authorization-endpoint"
       {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
        "authorization-code-length" 12
        "jti-length" 12}]
      "juxt/site/oauth-token-endpoint"
      "demo/petstore/operations"
      ;; Alice is a Petstore Owner
      ["juxt/site/user-role-assignment"
       {"username" "alice"
        "rolename" "SiteAdmin"}]
      ["juxt/site/user-role-assignment"
       {"username" "alice"
        "rolename" "PetstoreOwner"}]
      "juxt/site/system-test-clients"
      ["juxt/site/application-role-assignment"
       {"clientid" "site-cli"
        "rolename" "SiteSystemQuery"}]]
     (get CONFIG "uri-map"))))
