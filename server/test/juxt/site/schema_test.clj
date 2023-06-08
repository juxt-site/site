;; Copyright © 2021, JUXT LTD.

(ns juxt.site.schema-test
  (:require
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures]]
   [malli.registry :as mr]
   [malli.core :as m]
   [juxt.site.schema :as schema]))

#_(deftest registry-test
  (is
   (m/validate :juxt.site/grant-type "authorization_code" {:registry schema/schema-registry})))
