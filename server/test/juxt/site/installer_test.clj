;; Copyright © 2023, JUXT LTD.

(ns juxt.site.installer-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [clojure.edn :as edn]
   [juxt.site.test-helpers.install :as install]
   [clojure.java.io :as io]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [juxt.site.install.common-install-util :as ciu]))

(use-fixtures :once system-xt-fixture handler-fixture)

#_(with-fixtures
  (let [uri-map RESOURCE_SERVER
        graph (ciu/unified-installer-map (io/file "installers") uri-map)
        groups (edn/read-string (slurp (io/file "installers/groups.edn")))
        parameter-map {}]

    (let [installer-specs
          (install/map-uris
           (:juxt.site/installers
            (get groups "juxt/site/system-api")) uri-map)]
      (ciu/installer-seq graph {} installer-specs)
      )))

#_(with-fixtures
    (let [uri-map AUTH_SERVER
          graph (unified-installer-map uri-map)
          groups (edn/read-string (slurp (io/file "installers/groups.edn")))]

      (install/map-uris
       (some-> groups (get "juxt/site/bootstrap") :juxt.site/resources)
       uri-map)

      (map :juxt.site/uri
           (ciu/installer-seq
            graph {}
            (install/map-uris
             (some-> groups (get "juxt/site/bootstrap") :juxt.site/resources)
             uri-map)))))

#_(with-fixtures
  (install-resource-groups!
   ["juxt/site/bootstrap"
    "juxt/site/sessions"
    "juxt/site/login-form"
    "juxt/site/user-model"
    "juxt/site/password-based-user-identity"
    "juxt/site/example-users"
    "juxt/site/oauth-authorization-endpoint"
    "juxt/site/oauth-token-endpoint"
    ]
   RESOURCE_SERVER
   {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
    "kid" "test-kid"
    "authorization-code-length" 12
    "jti-length" 12})

  #_(converge!
   ["https://data.example.test/_site/users/{{username}}"]
   RESOURCE_SERVER
   {"username" "fred"
    "fullname" "Fred"})

  (repl/ls)

  #_(map :id
       (installer-graph
        ["https://data.example.test/_site/users/{{username}}"]
        (unified-installer-map RESOURCE_SERVER)
        {"username" "fred"
         "fullname" "Fred"})))
