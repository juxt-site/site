;; Copyright © 2023, JUXT LTD.

(ns juxt.site.post-api-test
  (:require
   [ring.util.codec :as codec]
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token with-basic-authorization] :as oauth]
   [juxt.site.test-helpers.handler :refer [handler-fixture *handler*]]
   [juxt.site.test-helpers.init :refer [init-fixture]]
   [xtdb.api :as xt]
   [clojure.edn :as edn]
   [jsonista.core :as json]))

(use-fixtures :each system-xt-fixture handler-fixture init-fixture)
