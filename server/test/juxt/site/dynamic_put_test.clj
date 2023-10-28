;; Copyright © 2023, JUXT LTD.

(ns juxt.site.dynamic-put-test
  (:require
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture with-request-body]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token]]
   [juxt.site.test-helpers.init :refer [init-fixture]]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*]]
   [juxt.site.repl :as repl]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [jsonista.core :as json]))

(defn dynamic-remote-bundles []
  (install-bundles!
   ["juxt/site/operations-api"
    "juxt/site/full-dynamic-remote"]
   RESOURCE_SERVER))

(defn dynamic-remote-bundles-fixture [f]
  (dynamic-remote-bundles)
  (f))

(use-fixtures :once
  system-xt-fixture
  handler-fixture
  init-fixture
  admin-token-fixture
  dynamic-remote-bundles-fixture)

(with-fixtures
  (repl/ls)
  (repl/e "https://data.example.test/_site/meta-resource")

  (repl/ls)

  (with-bearer-token *admin-token*

    ;; Create resource
    (with-request-body (pr-str {:message "Hi"})
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :put
        :ring.request/headers {"content-type" "application/edn"}}))

    ;; Create operation
    ;; https://data.example.test/operations/add-contact
    (with-request-body
      (pr-str
       {:xt/id "https://data.example.test/operations/add-contact"
        :juxt.site/prepare
        {:juxt.site.sci/program {}}
        :juxt.site/transact
        {:juxt.site.sci/program
         (pr-str
          [[:xtdb.api/put {:xt/id "https://data.example.test/contacts/fred"}]])}
        :juxt.site/rules
        '[[(allowed? subject operation resource permission)
           [permission :juxt.site/user "alice"]]]})
      (*handler*
       {:juxt.site/uri "https://data.example.test/_site/operations"
        :ring.request/method :post
        :ring.request/headers {"content-type" "application/edn"}}))

    ;; Create permission to call operation
    (with-request-body
      (pr-str
       ;; TODO: We should be careful not to allow existing permissions
       ;; to be overwritten. Perhaps they must first be revoked with
       ;; requesting a DELETE method on a permission. But who can do
       ;; this? Perhaps the granter of a permission must be recorded
       ;; with the permission, to ensure that only the granter can
       ;; revoke.
       {:xt/id "https://data.example.test/permissions/add-contact"
        :juxt.site/operation-uri "https://data.example.test/operations/add-contact"
        :juxt.site/user "alice"})
      (*handler*
       {:juxt.site/uri "https://data.example.test/_site/permissions"
        :ring.request/method :post
        :ring.request/headers {"content-type" "application/edn"}}))

    ;; Attach PUT method
    (with-request-body
      (pr-str
       [[:add-method
         {:method "POST"
          :operation-uri "https://data.example.test/operations/add-contact"}]])
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :patch
        :ring.request/headers {"content-type" "application/edn"}})))

  (repl/e "https://data.example.test/contacts")
  (repl/e "https://data.example.test/operations/add-contact")

  #_(repl/ls)

  ;; Test it
  (with-request-body
    (pr-str
     {})
    (*handler*
     {:juxt.site/uri "https://data.example.test/contacts"
      :ring.request/method :post
      :ring.request/headers {"content-type" "application/edn"}}))

  (repl/e "https://data.example.test/contacts/fred")

  ;; What is the Allow response header from an OPTIONS request?

  (let [response
        (*handler*
         {:juxt.site/uri "https://data.example.test/contacts.meta"
          :ring.request/method :options})]
    (select-keys
     response
     [:ring.response/status
      :ring.response/headers
      :ring.response/body])))
