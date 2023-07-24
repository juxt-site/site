;; Copyright © 2021, JUXT LTD.

(ns juxt.site.schema-test
  (:require
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is]]
   [malli.core :as m]
   [juxt.site.schema :as schema]))

(deftest registry-test
  (is
   (m/validate :juxt.site/grant-type "authorization_code" {:registry schema/schema-registry}))
  (is
   (not (m/validate :juxt.site/grant-type "authorization_fail" {:registry schema/schema-registry}))))
