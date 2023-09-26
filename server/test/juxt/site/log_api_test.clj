;; Copyright © 2022, JUXT LTD.

(ns juxt.site.log-api-test
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.test :refer [deftest is are use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.login :as login]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*] :as client]
   [clojure.walk :refer [postwalk]]
   [juxt.site.install.common-install-util :as ciu]))

(defn install-log-api! []
  (install-bundles!
   ["juxt/site/logs-api"]
   (get CONFIG "uri-map")))

(defn install-log-api-fixture [f]
  (install-log-api!)
  (f))

(use-fixtures :each system-xt-fixture handler-fixture init-fixture admin-token-fixture install-log-api-fixture)

(deftest get-logs-test
  (with-bearer-token *admin-token*
    (let [request {:juxt.site/uri "https://data.example.test/_site/logs"
                   :ring.request/method :get}
          {:ring.response/keys [status body headers]} (*handler* request)
          {:strs [logger_name reqid]} (json/read-value body)]
      (is (= status 200))
      (is (not= "" body))
      #_(let [reqid-last reqid
            request {:juxt.site/uri "https://data.example.test/_site/logs" 
                     :ring.request/method :get}
            {:ring.response/keys [status body headers]} (*handler* request)
            {:strs [logger_name reqid]} (json/read-value body)]
        (is (= status 200))
        (is (= reqid reqid-last))))))
