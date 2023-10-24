;; Copyright © 2022, JUXT LTD.

(ns juxt.site.petstore-test
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
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture assoc-request-body]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.init :refer [init-fixture CONFIG]]
   [juxt.site.test-helpers.client :refer [admin-token-fixture *admin-token*] :as client]
   [clojure.walk :refer [postwalk]]
   [juxt.site.install.common-install-util :as ciu]))

(defn install-openapi! []
  (install-bundles!
   ["juxt/site/system-api-openapi"
    "juxt/site/login-form"
    "juxt/site/password-based-user-identity"
    "juxt/site/example-users"
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "https://auth.example.test/session-scopes/form-login-session"
      "authorization-code-length" 12
      "jti-length" 12}]
    "juxt/site/oauth-token-endpoint"]
   (get CONFIG "uri-map")))

(defn install-petstore! []
  (let [openapi-file (io/file "../demo/petstore/openapi.json")
        openapi (json/read-value (slurp openapi-file))
        data-base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])

        _
        (with-bearer-token *admin-token*
          (let [mapped-openapi (update-in openapi ["servers" 0 "url"] #(str data-base-uri %))
                mapped-openapi
                (postwalk (ciu/make-uri-map-replace-walk-fn
                           (get CONFIG "uri-map"))
                          mapped-openapi)]
            (client/install-openapi! mapped-openapi)))]
    (install-bundles!
     ["demo/petstore/operations"
      ;; Alice is a Petstore Owner
      ["juxt/site/user-role-assignment"
       {"username" "alice"
        "rolename" "SiteAdmin"}]
      ["juxt/site/user-role-assignment"
       {"username" "alice"
        "rolename" "PetstoreOwner"}]
      "juxt/site/system-test-clients"
      ["juxt/site/application-role-assignment"
       {"clientid" "site-cli"
        "rolename" "SiteSystemQuery"}]]
     (get CONFIG "uri-map"))))

(defn install-openapi-fixture [f]
  (install-openapi!)
  (install-petstore!)
  (f))

(use-fixtures :once system-xt-fixture handler-fixture init-fixture admin-token-fixture install-openapi-fixture)

(deftest get-petstore-test
  (let [{:ring.response/keys [status body]}
        (*handler*
         {:juxt.site/uri "https://data.example.test/petstore/openapi.json"
          :ring.request/method :get})]

    (is (= status 200))
    (is (= "Swagger Petstore - OpenAPI 3.0"
           (-> body
               json/read-value
               (get-in ["info" "title"]))))
    (is (= "https://data.example.test/petstore"
           (-> body
               json/read-value
               (get-in ["servers" 0 "url"]))))))

(defn get-access-token []
  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "password"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client (str "https://auth.example.test/applications/global-scope-app")
          :username "alice"
          :password "garden"})]
    access-token))

(deftest get-pet-test
  (let [dog {:id "get-pet-test-1" :name "Rowan" :status "available"}]
    (with-bearer-token (get-access-token)
      (let [request
            (->
             {:juxt.site/uri "https://data.example.test/petstore/pet"
              :ring.request/method :post
              :ring.request/headers
              {"content-type" "application/json"
               "accept" "application/json"}}
             (assoc-request-body (json/write-value-as-bytes dog json/keyword-keys-object-mapper)))
            _ (*handler* request)
            request {:juxt.site/uri "https://data.example.test/petstore/pet/get-pet-test-1"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (= dog (dissoc (json/read-value body json/keyword-keys-object-mapper) :xt/id))))

      (let [request
            (->
             {:juxt.site/uri "https://data.example.test/petstore/pet"
              :ring.request/method :post
              :ring.request/headers
              {"content-type" "application/json"
               "accept" "application/json"}}
             (assoc-request-body
              (json/write-value-as-bytes dog json/keyword-keys-object-mapper)))
            _ (*handler* request)
            request {:juxt.site/uri "https://data.example.test/petstore/pets"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (= [{:name "Rowan",
                :status "available",
                :id "get-pet-test-1",
                :xt/id "https://data.example.test/petstore/pet/get-pet-test-1"}]
               (->> (json/read-value body json/keyword-keys-object-mapper)
                    (filter #(= (:id %) "get-pet-test-1")))))))))

(deftest find-by-status-test
  (with-bearer-token (get-access-token)
    (doseq [pet [{:id "find-by-status-test-1" :name "Rowan" :status "available"}
                 {:id "find-by-status-test-2" :name "Kaia" :status "pending"}
                 {:id "find-by-status-test-3" :name "Arya" :status "available"}]]
      (->
       {:juxt.site/uri "https://data.example.test/petstore/pet"
        :ring.request/method :post
        :ring.request/headers
        {"content-type" "application/json"
         "accept" "application/json"}}
       (assoc-request-body (json/write-value-as-bytes pet json/keyword-keys-object-mapper))
       *handler*))

    (let [{:ring.response/keys [status body]}
          (*handler*
           {:juxt.site/uri "https://data.example.test/petstore/pet/findByStatus"
            :ring.request/method :get
            :ring.request/headers
            {"accept" "application/json"}})]
      (is (= 200 status))
      (is (= [{:name "Rowan",
               :status "available",
               :id "find-by-status-test-1",
               :xt/id
               "https://data.example.test/petstore/pet/find-by-status-test-1"}
              {:name "Arya",
               :status "available",
               :id "find-by-status-test-3",
               :xt/id
               "https://data.example.test/petstore/pet/find-by-status-test-3"}
              {:id "get-pet-test-1",
               :name "Rowan",
               :status "available",
               :xt/id "https://data.example.test/petstore/pet/get-pet-test-1"}
              {:id "update-pet-by-id-test-1",
                :name "doggie",
                :status "available",
                :xt/id "https://data.example.test/petstore/pet/update-pet-by-id-test-1"}]
             (->>
              (json/read-value body json/keyword-keys-object-mapper)
              (filter #(= (.startsWith (:id %) "find-by-status-test")))))))))

(deftest delete-pet-test
  (let [pets [{:id "delete-pet-test-1" :name "Rowan" :status "available"}]]
    (with-bearer-token (get-access-token)
      (doseq [pet pets]
        (let [payload (json/write-value-as-bytes pet json/keyword-keys-object-mapper)
              request {:juxt.site/uri "https://data.example.test/petstore/pet"
                       :ring.request/method :post
                       :ring.request/headers
                       {"content-type" "application/json"
                        "content-length" (str (count payload))
                        "accept" "application/json"}
                       :ring.request/body (io/input-stream payload)}
              _ (*handler* request)]))

      (let [{:ring.response/keys [status]}
            (*handler*
             {:juxt.site/uri (str "https://data.example.test/petstore/pet/delete-pet-test-1")
              :ring.request/method :delete
              :ring.request/headers
              {"accept" "application/json"}})]
        (is (= 200 status)))

      (let [{:ring.response/keys [status]}
            (*handler*
             {:juxt.site/uri (str "https://data.example.test/petstore/pet/delete-pet-test-1")
              :ring.request/method :get})]
        (is (= 404 status))))))

(deftest update-pet-by-id-test
  (let [pet {:id "update-pet-by-id-test-1" :name "Rowan" :status "available"}]
    (with-bearer-token (get-access-token)
      (let [request
            (->
             {:juxt.site/uri "https://data.example.test/petstore/pet"
              :ring.request/method :post
              :ring.request/headers
              {"content-type" "application/json"
               "accept" "application/json"}}
             (assoc-request-body (json/write-value-as-bytes pet json/keyword-keys-object-mapper))
             *handler*)]
        (let [payload (json/write-value-as-bytes {:name "updated" :status "updated"} json/keyword-keys-object-mapper)
              request {:juxt.site/uri (str "https://data.example.test/petstore/pet/update-pet-by-id-test-1")
                       :ring.request/method :post
                       :ring.request/headers
                       {"accept" "application/json"
                        "content-type" "application/json"
                        "content-length" (str (count payload))}
                       :ring.request/body (io/input-stream payload)}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status)))

        (let [request {:juxt.site/uri (str "https://data.example.test/petstore/pet/update-pet-by-id-test-1")
                       :ring.request/method :get}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status))
          (is (= "updated" (:name (json/read-value body json/keyword-keys-object-mapper)))))
        (let [{:ring.response/keys [status body]}
              (->
               {:juxt.site/uri (str "https://data.example.test/petstore/pet/update-pet-by-id-test-1")
                :ring.request/method :post
                :ring.request/headers
                {"accept" "application/json"
                 "content-type" "application/x-www-form-urlencoded"}}
               (assoc-request-body (.getBytes "name=doggie&status=available" "UTF-8"))
               *handler*)]
          (is (= 200 status))
          (let [request
                {:juxt.site/uri (str "https://data.example.test/petstore/pet/update-pet-by-id-test-1")
                 :ring.request/method :get}
                {:ring.response/keys [status body]} (*handler* request)]
            (is (= 200 status))
            (is (= "doggie" (:name (json/read-value body json/keyword-keys-object-mapper))))))))))

(deftest petstore-scope-test
  (let [session-token (login/login-with-form! "alice" "garden")
        {access-token "access_token" scope "scope"}
        (oauth/acquire-access-token!
         {:grant-type "password"
          :authorization-uri "https://auth.example.test/oauth/authorize"
          :token-uri "https://auth.example.test/oauth/token"
          :session-token session-token
          :client (str "https://auth.example.test/applications/global-scope-app")
          :username "alice"
          :password "garden"
          :scope #{"https://data.example.test/petstore/scopes/write"
                   "https://data.example.test/petstore/scopes/read"}})]
    (is (= #{"https://data.example.test/petstore/scopes/write"
             "https://data.example.test/petstore/scopes/read"}
           (set (str/split scope #" "))))))

#_(deftest find-by-tags-test
    (let [dogs [{:id 11 :name "doggie" :status "available" :tags [{:name "tag1" :id 1}]}
                {:id 12 :name "doggie2" :status "pending" :tags [{:name "tag2" :id 2}]}
                {:id 13 :name "doggie3" :status "available" :tags [{:name "tag3" :id 3}]}]
          session-token (login/login-with-form! "alice" "garden")
          {access-token "access_token"}
          (oauth/acquire-access-token!
           {:grant-type "password"
            :authorization-uri "https://auth.example.test/oauth/authorize"
            :token-uri "https://auth.example.test/oauth/token"
            :session-token session-token
            :client (str "https://auth.example.test/applications/global-scope-app")
            :username "alice"
            :password "garden"})]
      (with-bearer-token access-token
        (doall (for [dog dogs]
                 (let [payload (json/write-value-as-bytes dog json/keyword-keys-object-mapper)
                       request {:juxt.site/uri "https://data.example.test/petstore/pet"
                                :ring.request/method :post
                                :ring.request/headers
                                {"content-type" "application/json"
                                 "content-length" (str (count payload))
                                 "accept" "application/json"}
                                :ring.request/body (io/input-stream payload)}
                       _ (*handler* request)])))

        (let [request {:juxt.site/uri "https://data.example.test/petstore/pet/findByTags"
                       :ring.request/method :get
                       :ring.request/headers
                       {"accept" "application/json"}
                       ;; :ring.request/query
                       ;; (ring.util.codec/form-encode
                       ;;  {"tags" ["tag1" "tag3"]})
                       }
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status))
          (is (= [(first dogs) (nth dogs 2)]
                 (map #(dissoc % :xt/id) (json/read-value body json/keyword-keys-object-mapper))))
          ))))

#_(deftest update-pet-test
    (let [dog {:id 1 :name "doggie" :status "available"}
          session-token (login/login-with-form! "alice" "garden")
          {access-token "access_token"}
          (oauth/acquire-access-token!
           {:grant-type "password"
            :authorization-uri "https://auth.example.test/oauth/authorize"
            :token-uri "https://auth.example.test/oauth/token"
            :session-token session-token
            :client (str "https://auth.example.test/applications/global-scope-app")
            :username "alice"
            :password "garden"})]
      (with-bearer-token access-token
        (let [payload (json/write-value-as-bytes dog json/keyword-keys-object-mapper)
              request {:juxt.site/uri "https://data.example.test/petstore/pet"
                       :ring.request/method :post
                       :ring.request/headers
                       {"content-type" "application/json"
                        "content-length" (str (count payload))
                        "accept" "application/json"}
                       :ring.request/body (io/input-stream payload)}
              _ (*handler* request)])

        (let [payload (json/write-value-as-bytes (update dog :status (fn [s] "pending")) json/keyword-keys-object-mapper)
              request {:juxt.site/uri "https://data.example.test/petstore/pet"
                       :ring.request/method :put
                       :ring.request/headers
                       {"content-type" "application/json"
                        "content-length" (str (count payload))
                        "accept" "application/json"}
                       :ring.request/body (io/input-stream payload)}
              _ (*handler* request)])

        (let [request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (:id dog))
                       :ring.request/method :get}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status))
          (is (= "pending" (:status (json/read-value body json/keyword-keys-object-mapper))))))))
