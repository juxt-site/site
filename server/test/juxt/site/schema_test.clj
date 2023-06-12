;; Copyright © 2021, JUXT LTD.

(ns juxt.site.schema-test
  (:require
   [juxt.site.logging :refer [with-logging]]
   [clojure.test :refer [deftest is use-fixtures]]
   [malli.registry :as mr]
   [malli.core :as m]
   [juxt.site.schema :as schema]))

(deftest registry-test
  (is
   (m/validate :juxt.site/grant-type "authorization_code" {:registry schema/schema-registry}))
  (is
   (not (m/validate :juxt.site/grant-type "authorization_fail" {:registry schema/schema-registry}))))

;; (deftest ref-test
;;   (is
;;    (m/validate :juxt.site/installers [{:juxt.site/base-uri "https://example/"
;;                                        :juxt.site/base-installer-path "extra"}]
;;                {:registry schema/schema-registry})))
