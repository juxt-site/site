;; Copyright © 2023, JUXT LTD.

(ns juxt.site.installer-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.client :refer [client-secret register-user assign-user-role request-token install-bundle]]
   [juxt.site.test-helpers.init :as init]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.local-files-util :as local]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [xtdb.api :as xt]
   [juxt.site.repl :as repl]))

(use-fixtures :each system-xt-fixture handler-fixture init/init-fixture)

;; deftest installer-test

(with-fixtures
  (let [db (xt/db *xt-node*)
        client-secret (client-secret db)
        cc-token (request-token
                  {"client-secret" client-secret})

        _ (with-bearer-token cc-token
            ;; Install something

            (register-user
             {"username" "alice"
              "password" "foobar"
              "fullname" "Alice"})
            (assign-user-role
             {"username" "alice"
              "role" "Admin"}))

        alice-token (request-token
                     {"username" "alice"
                      "password" "foobar"})]

    (with-bearer-token alice-token
      (install-bundle
       (init/bundle-installer-seq
        ["juxt/site/system-api-openapi" {}])))))
