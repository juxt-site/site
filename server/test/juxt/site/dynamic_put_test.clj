;; Copyright © 2023, JUXT LTD.

(ns juxt.site.dynamic-put-test
  (:require
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture assoc-request-body with-request-body]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token assoc-bearer-token]]
   [juxt.site.test-helpers.init :refer [init-fixture]]
   [juxt.site.test-helpers.client :as client]
   [juxt.site.repl :as repl]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [jsonista.core :as json]
   [clojure.string :as str]
   [juxt.site.test-helpers.client :as client]))

(defn dynamic-remote-bundles []
  (install-bundles!
   ["juxt/site/operations-api"
    "juxt/site/full-dynamic-remote"]
   RESOURCE_SERVER))

(defn dynamic-remote-bundles-fixture [f]
  (dynamic-remote-bundles)
  (f))

(def ^:dynamic *alice-token* nil)

(defn alice-fixture [f]
  (client/with-admin-client-credentials
    (client/register-user
     {"username" "alice"
      "password" "foobar"
      "fullname" "Alice"})
    (client/assign-user-role
     {"username" "alice"
      "role" "SiteAdmin"}))
  (binding [*alice-token* (client/request-token {"username" "alice" "password" "foobar"})]
    (f)))

(def ^:dynamic *bob-token* nil)

(use-fixtures :once
  system-xt-fixture
  handler-fixture
  init-fixture
  alice-fixture
  dynamic-remote-bundles-fixture)

(defn PUT [uri headers]
  {:juxt.site/uri uri
   :ring.request/method :put
   :ring.request/headers headers})

#_(with-fixtures
  (repl/e "https://data.example.test/_site/users/alice"))

(deftest contacts-test
  ;; Create resource
  (->
   (PUT "https://data.example.test/contacts.meta"
        {"content-type" "application/edn"})
   (assoc-request-body (pr-str {}))
   (assoc-bearer-token *alice-token*)
   *handler*)

  (with-bearer-token *alice-token*
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

    ;; Attach POST method
    (with-request-body
      (pr-str
       [[:add-method
         {:method "POST"
          :operation-uri "https://data.example.test/operations/add-contact"}]])
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :patch
        :ring.request/headers {"content-type" "application/edn"}})))

  ;; Test it
  (with-request-body
    (pr-str
     {})
    (*handler*
     {:juxt.site/uri "https://data.example.test/contacts"
      :ring.request/method :post
      :ring.request/headers {"content-type" "application/edn"}}))

  (repl/e "https://data.example.test/contacts/fred")

  (with-bearer-token *alice-token*
    ;; Create operation
    ;; https://data.example.test/operations/add-contact
    (with-request-body
      (pr-str
       {:xt/id "https://data.example.test/operations/get-contacts"
        :juxt.site/state
        {:juxt.site.sci/program
         (pr-str
          `(do
             [{:contact-name "Bill"}
              {:contact-name "Ben"}]))}
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
       {:xt/id "https://data.example.test/permissions/get-contacts"
        :juxt.site/operation-uri "https://data.example.test/operations/get-contacts"
        :juxt.site/user "alice"})
      (*handler*
       {:juxt.site/uri "https://data.example.test/_site/permissions"
        :ring.request/method :post
        :ring.request/headers {"content-type" "application/edn"}}))

    ;; Attach GET method
    (with-request-body
      (pr-str
       [[:add-method
         {:method "GET"
          :operation-uri "https://data.example.test/operations/get-contacts"}]])
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :patch
        :ring.request/headers {"content-type" "application/edn"}}))

    (with-request-body
      (pr-str
       [[:set-representation-metadata
         {:content-type "application/json"}]])
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :patch
        ;; TODO: Change application/edn to application/json
        :ring.request/headers {"content-type" "application/edn"}}))

    (with-request-body
      (pr-str
       [[:set-respond-program
         {:program
          (pr-str
           `(assoc ~'*ctx* :ring.response/body
                   (jsonista.core/write-value-as-string ~'*state*)))}]])
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :patch
        ;; TODO: Change application/edn to application/json
        :ring.request/headers {"content-type" "application/edn"}})))

  (with-bearer-token *alice-token*
    (json/read-value
     (:ring.response/body
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :get}))))

  (let [{:keys [ring.response/status
                ring.response/headers
                ring.response/body]}
        (->
         (*handler*
          {:juxt.site/uri "https://data.example.test/contacts"
           :ring.request/method :get}))]
    (is (= 200 status))
    (is (= "application/json" (get headers "content-type")))
    (is (= [{"contact-name" "Bill"} {"contact-name" "Ben"}] (json/read-value body)))))
