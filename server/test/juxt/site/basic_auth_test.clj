;; Copyright © 2023, JUXT LTD.

(ns juxt.site.basic-auth-test
  (:require
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [juxt.site.repl :as repl]
   [juxt.site.util :as util]
   [xtdb.api :as xt]))

(defn bootstrap []
  (install-bundles!
   ["juxt/site/bootstrap"
    "juxt/site/user-model"
    "juxt/site/protection-spaces"
    "juxt/site/oauth-token-endpoint"
    "juxt/site/password-based-user-identity"
    "juxt/site/testing/basic-auth-protected-resource"
    "juxt/site/test-clients"
    "juxt/site/example-users"]
   RESOURCE_SERVER))

(defn bootstrap-fixture [f]
  (bootstrap)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture bootstrap-fixture)

;; TODO: We should also test with protection spaces that don't contain correct canonical root uris.
;; TODO: We could also implement optional realms.

(deftest basic-resource-access-with-user-credentials
  (testing "correctly authorized"
    (let [response
          (*handler*
           {:ring.request/method :get
            :ring.request/headers
            {"authorization"
             (format "Basic %s"
                     (util/as-b64-str (.getBytes (format "%s:%s" "alice" "garden"))))}
            :juxt.site/uri "https://data.example.test/_site/testing/basic-auth-protected-resource"})]

      (is (= 200 (:ring.response/status response)))
      (is (= "Hello World!" (String. (:ring.response/body response))))))

  (testing "bad password"
    (let [response
          (*handler*
           {:ring.request/method :get
            :ring.request/headers
            {"authorization"
             (format "Basic %s"
                     (util/as-b64-str (.getBytes (format "%s:%s" "alice" "bad-password"))))}
            :juxt.site/uri "https://data.example.test/_site/testing/basic-auth-protected-resource"})]

      (is (= 401 (:ring.response/status response))))))

;; TODO: Should presenting client credentials allow a user to access
;; any basic auth protected resource?  Or should it depend on the
;; resource?

(deftest basic-resource-access-with-client-credentials

  (testing "good credentials"
    (let [db (xt/db *xt-node*)
          {client-secret :juxt.site/client-secret}
          (xt/entity db "https://auth.example.test/applications/test/clientA")

          response
          (*handler*
           {:ring.request/method :get
            :ring.request/headers
            {"authorization"
             (format "Basic %s"
                     (util/as-b64-str (.getBytes (format "%s:%s" "test/clientA" client-secret))))}
            :juxt.site/uri "https://data.example.test/_site/testing/client-credentials-protected-resource"})]

      (is (= 200 (:ring.response/status response)))
      (is (= "Hello World!" (String. (:ring.response/body response))))))

  (testing "bad credentials"
    (let [response
          (*handler*
           {:ring.request/method :get
            :ring.request/headers
            {"authorization"
             (format "Basic %s"
                     (util/as-b64-str (.getBytes (format "%s:%s" "test/clientA" "bad-password"))))}
            :juxt.site/uri "https://data.example.test/_site/testing/client-credentials-protected-resource"})]

      (is (= 401 (:ring.response/status response))))))
