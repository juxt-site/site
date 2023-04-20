;; Copyright © 2023, JUXT LTD.

(ns juxt.site.installer-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.installer :refer [call-operation-with-init-data!]]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-resource-groups! converge! unified-installer-map]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.install :as install]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.repl :as repl]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [juxt.site.install.common-install-util :as ciu]))

(use-fixtures :once system-xt-fixture handler-fixture)

#_(with-fixtures
  (let [uri-map AUTH_SERVER
        graph (unified-installer-map uri-map)
        groups (edn/read-string (slurp (io/file "installers/groups.edn")))]

    (install/map-uris
     (some-> groups (get "juxt/site/bootstrap") :juxt.site/resources)
     uri-map)

    (map :juxt.site/uri
         (ciu/installer-seq
          (install/map-uris
           (some-> groups (get "juxt/site/bootstrap") :juxt.site/resources)
           uri-map)
          graph {}))))

#_(with-fixtures
  (install-resource-groups!
   ["juxt/site/bootstrap"
    "juxt/site/sessions"
    "juxt/site/login-form"
    "juxt/site/user-model"
    "juxt/site/password-based-user-identity"
    "juxt/site/example-users"
    "juxt/site/oauth-authorization-server"
    ]
   AUTH_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "keypair" "https://auth.example.test/keypairs/default-auth-server"
    "authorization-code-length" 12
    "jti-length" 12})

  #_(converge!
   ["https://data.example.test/users/{{username}}"]
   RESOURCE_SERVER
   {"username" "fred"
    "fullname" "Fred"})

  (repl/ls)

  #_(map :id
       (installer-graph
        ["https://data.example.test/users/{{username}}"]
        (unified-installer-map RESOURCE_SERVER)
        {"username" "fred"
         "fullname" "Fred"})))
