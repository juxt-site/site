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
   [clojure.java.io :as io]))

(defn dynamic-remote-bundles []
  (install-bundles!
   ["juxt/site/operations-api"]
   ["juxt/site/full-dynamic-remote"]
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
  (with-bearer-token *admin-token*

    ;; Create resource
    (with-request-body (pr-str {})
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :put
        :ring.request/headers {"content-type" "application/edn"}}))

    ;; Attach PUT method
    (with-request-body
      (pr-str
       [
        [:add-method
         {:method "PUT"
          :operation "https://data.example.test/operations/add-contact"
          }]])
      (*handler*
       {:juxt.site/uri "https://data.example.test/contacts.meta"
        :ring.request/method :patch
        :ring.request/headers {"content-type" "application/edn"}}))

    ;; Create a get-contact operation. First, create an operations-api
    ;; which lists all the operations I have access to, and allows me
    ;; to create new ones (if I have access to create-operation)

    ;; POST to the create-operation resource?

    )

  #_(repl/e "https://data.example.test/_site/meta-resource")
  (repl/e "https://data.example.test/contacts"))


;; TODO: Filter out unallowed methods from OPTIONS and the Allow
;; response header.
