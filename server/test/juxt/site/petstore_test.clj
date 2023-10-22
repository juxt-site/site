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
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
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

(use-fixtures :each system-xt-fixture handler-fixture init-fixture admin-token-fixture install-openapi-fixture)

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

(deftest add-pet-test
  (let [dog {:id 10 :name "doggie"}
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
            response (*handler* request)]
        (is (= 200 (:ring.response/status response)))))))

(deftest get-pet-test
  (let [dog {:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0" :name "doggie" :status "available"}
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
            _ (*handler* request)
            request {:juxt.site/uri "https://data.example.test/petstore/pet/f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (= dog (dissoc (json/read-value body json/keyword-keys-object-mapper) :xt/id)))
        ))))

(deftest get-pets-test
  (let [dog {:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0" :name "doggie" :status "available"}
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
            _ (*handler* request)
            request {:juxt.site/uri "https://data.example.test/petstore/pets"
                     :ring.request/method :get}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (= [dog] (map #(dissoc % :xt/id) (json/read-value body json/keyword-keys-object-mapper))))
        ))))


(deftest find-by-status-test
  (let [dogs [{:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0" :name "doggie" :status "available"}
              {:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc1" :name "doggie2" :status "pending"}
              {:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc2" :name "doggie3" :status "available"}]
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

      (let [request {:juxt.site/uri "https://data.example.test/petstore/pet/findByStatus"
                     :ring.request/method :get
                     :ring.request/headers
                     {"accept" "application/json"}}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status))
        (is (= [(first dogs) (nth dogs 2)]
               (map #(dissoc % :xt/id) (json/read-value body json/keyword-keys-object-mapper))))
        ))))

(deftest delete-pet-test
  (let [dogs [{:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0" :name "doggie" :status "available"}]
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

      (let [request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (-> dogs first :id))
                     :ring.request/method :delete
                     :ring.request/headers
                     {"accept" "application/json"}}
            {:ring.response/keys [status body]} (*handler* request)]
        (is (= 200 status)))

      (let [request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (-> dogs first :id))
                     :ring.request/method :get}
            {:ring.response/keys [status]} (*handler* request)]
        (is (= 404 status))))))

(deftest update-pet-by-id-test
  (let [dog {:id "f3a2ddbc-1170-4d4d-9621-dd070d0e0cc0" :name "doggie" :status "available"}
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
            _ (*handler* request)]
        (let [payload (json/write-value-as-bytes {:name "updated" :status "updated"} json/keyword-keys-object-mapper)
              request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (:id dog))
                       :ring.request/method :post
                       :ring.request/headers
                       {"accept" "application/json"
                        "content-type" "application/json"
                        "content-length" (str (count payload))}
                       :ring.request/body (io/input-stream payload)}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status)))

        (let [request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (:id dog))
                       :ring.request/method :get}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status))
          (is (= "updated" (:name (json/read-value body json/keyword-keys-object-mapper)))))
        (let [payload (.getBytes "name=doggie&status=available" "UTF-8")
              request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (:id dog))
                       :ring.request/method :post
                       :ring.request/headers
                       {"accept" "application/json"
                        "content-type" "application/x-www-form-urlencoded"
                        "content-length" (str (count payload))}
                       :ring.request/body (io/input-stream payload)}
              {:ring.response/keys [status body]} (*handler* request)]
          (is (= 200 status))
          (let [request {:juxt.site/uri (str "https://data.example.test/petstore/pet/" (:id dog))
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
          :scope #{"https://auth.example.test/scopes/petstore/write"
                   "https://auth.example.test/scopes/petstore/read"}})]
    (is (= #{"https://auth.example.test/scopes/petstore/write"
             "https://auth.example.test/scopes/petstore/read"}
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
