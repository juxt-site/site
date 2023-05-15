;; Copyright © 2023, JUXT LTD.

(ns juxt.site.operation-test
  (:require
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [juxt.site.test-helpers.local-files-util :refer [install-installer-groups! converge!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.oauth :refer [AUTH_SERVER RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [juxt.site.installer :refer [call-operation-with-init-data!]]
   ))

;; Bootstrap fixture
;; Test a simple operation that will log something simple

(defn bootstrap []
  (install-installer-groups! ["juxt/site/bootstrap"] RESOURCE_SERVER {}))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

#_(with-fixtures
  (converge!
   ["https://auth.example.test/operations/test-logging"
    "https://auth.example.test/permissions/system/test-logging"]
   AUTH_SERVER
   {})

  (call-operation-with-init-data!
   *xt-node*
   {:juxt.site/subject-id "https://auth.example.test/_site/subjects/system"
    :juxt.site/operation-id "https://auth.example.test/operations/test-logging"
    :juxt.site/input {}}
   ))
