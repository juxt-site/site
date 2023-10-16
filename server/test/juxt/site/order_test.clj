(ns juxt.site.order-test
  (:require
   [clojure.java.io :as io]
   [clojure.test :refer [are deftest is use-fixtures]]
   [jsonista.core :as json]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.client :refer [*admin-token* admin-token-fixture] :as client]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.init :refer [init-fixture]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token] :as oauth]
   [juxt.site.test-helpers.petstore :refer [install-openapi! install-petstore!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [clojure.edn :as edn]))

(def dogs [{:id 10 :name "doggie" :status "available"}
           {:id 11 :name "cattie" :status "pending"}])

(def status-id-map
  {10 "placed"
   0 "approved"
   11 "delivered"})

(defn seed-data-fixture []
  (println "Seeding data")
  (with-bearer-token *admin-token*
    (pr-str
     (for [dog dogs]
       (let [payload (json/write-value-as-bytes dog json/keyword-keys-object-mapper)]
         (*handler* {:juxt.site/uri "https://data.example.test/petstore/pet"
                     :ring.request/method :post
                     :ring.request/headers
                     {"content-type" "application/json"
                      "content-length" (str (count payload))
                      "accept" "application/json"}
                     :ring.request/body (io/input-stream payload)}))))))

(defn install-openapi-fixture [f]
  (install-openapi!)
  (install-petstore!)
  (seed-data-fixture)
  (f))

(use-fixtures :each system-xt-fixture handler-fixture init-fixture admin-token-fixture install-openapi-fixture)

(defn get-order [id]
  (*handler* {:juxt.site/uri (str "https://data.example.test/petstore/store/order/" id)
              :ring.request/method :get}))

(defn delete-order [id]
  (*handler* {:juxt.site/uri (str "https://data.example.test/petstore/store/order/" id)
              :ring.request/method :delete}))

(defn place-order [id]
  (let [body {:shipDate (java.time.Instant/now)
              :complete true
              :petId id
              :status (status-id-map id)
              :id id
              :quantity 1}
        payload (json/write-value-as-bytes body json/keyword-keys-object-mapper)]
    (*handler* {:juxt.site/uri "https://data.example.test/petstore/store/order"
                :ring.request/method :post
                :ring.request/headers
                {"content-type" "application/json"
                 "content-length" (str (count payload))
                 "accept" "application/json"}
                :ring.request/body (io/input-stream payload)})))

(defn get-inventory []
  (*handler* {:juxt.site/uri "https://data.example.test/petstore/store/inventory"
              :ring.request/method :get}))

(deftest should-fail-missing-pet-test
  (with-bearer-token *admin-token*
    (let [{:ring.response/keys [status]} (place-order 0)]
      (is (= 404 status)))))

(deftest should-get-valid-order-test
  (with-bearer-token *admin-token*
    (let [{:ring.response/keys [status]} (place-order (-> dogs first :id))]
      (is (= 200 status (:ring.response/status (get-order (-> dogs first :id))))))))

(deftest should-delete-order-test
  (with-bearer-token *admin-token*
    (let [{:ring.response/keys [status]} (place-order (-> dogs first :id))]
      (is (= 200 status (:ring.response/status (delete-order (-> dogs first :id))))))))

(deftest should-show-inventory-test
  (with-bearer-token *admin-token*
    (doall
     (for [{:keys [id]} dogs]
       (place-order id)))
    (is (= {"placed" 1
            "delivered" 1}
           (json/read-value (:ring.response/body (get-inventory)))))))
