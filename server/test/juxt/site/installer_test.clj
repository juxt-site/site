;; Copyright © 2023, JUXT LTD.

(ns juxt.site.installer-test
  (:require
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.client :refer [client-secret register-user assign-user-role request-token install-bundle]]
   [juxt.site.test-helpers.init :as init]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.handler :refer [handler-fixture]]
   [xtdb.api :as xt]
   [juxt.site.repl :as repl]
   [clojure.pprint :refer [pprint]]
   [clojure.set :as set]))

(use-fixtures :each system-xt-fixture handler-fixture init/init-fixture)

(deftest install-bundle-test
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
              "role" "SiteAdmin"}))

        alice-token (request-token
                     {"username" "alice"
                      "password" "foobar"})]

    (with-bearer-token alice-token
      (install-bundle
       (init/bundle-installer-seq
        ["juxt/site/system-api-openapi" {}])))

    (let [db (xt/db *xt-node*)

          [alice-token-e alice-subject]
          (first
           (xt/q db
                 '{:find [(pull e [*]) (pull subject [*])]
                   :where [
                           [e :juxt.site/token token]
                           [e :juxt.site/subject subject]
                           [e :juxt.site/type "https://meta.juxt.site/types/access-token"]]
                   :in [token]}
                 alice-token))
          events
          (map first
               (xt/q db
                     '{:find [(pull ev [*])]
                       :where [[ev :juxt.site/operation-uri "https://auth.example.test/operations/put-openapi-document"]
                               [ev :juxt.site/type "https://meta.juxt.site/types/event"]]}))

          ev (first events)]

      (is (= 1 (count events)))

      (is (= (:juxt.site/subject-uri ev)
             (:xt/id alice-subject)))

      (is (= ["https://data.example.test/_site/openapi.json"] (:juxt.site/puts ev))))

))
