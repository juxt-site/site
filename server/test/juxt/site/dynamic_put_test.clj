;; Copyright © 2023, JUXT LTD.

(ns juxt.site.dynamic-put-test
  (:require
   [clojure.test :refer [deftest is are use-fixtures testing]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture assoc-request-body with-request-body]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token assoc-bearer-token]]
   [juxt.site.test-helpers.init :refer [init-fixture]]
   [juxt.site.test-helpers.client :as client]
   [juxt.site.repl :as repl]
   [juxt.site.logging :refer [with-logging]]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [jsonista.core :as json]
   [clojure.string :as str]
   [juxt.site.test-helpers.client :as client]
   [xtdb.api :as xt]))

(defn dynamic-remote-bundles []
  (install-bundles!
   ["juxt/site/operations-api"
    "juxt/site/full-dynamic-remote"]
   RESOURCE_SERVER))

(defn dynamic-remote-bundles-fixture [f]
  (dynamic-remote-bundles)
  (f))

(def ^:dynamic *alice-token* nil)

(defn alice-fixture [f]
  (client/with-admin-client-credentials
    (client/register-user
     {"username" "alice"
      "password" "foobar"
      "fullname" "Alice"})
    (client/assign-user-role
     {"username" "alice"
      "role" "SiteAdmin"}))
  (binding [*alice-token* (client/request-token {"username" "alice" "password" "foobar"})]
    (f)))

(def ^:dynamic *bob-token* nil)

(use-fixtures :once
  system-xt-fixture
  handler-fixture
  init-fixture
  alice-fixture
  dynamic-remote-bundles-fixture)

(defn request [uri method opts]
  (cond->
      {:juxt.site/uri uri
       :ring.request/method method}
    (:headers opts) (assoc :ring.request/headers (:headers opts))
    (:body opts) (assoc-request-body (:body opts))
    (:token opts) (assoc-bearer-token (:token opts))))

(defn GET
  ([uri] (GET uri {}))
  ([uri opts]
   (request uri :get opts)))

(defn PUT [uri opts]
  (request uri :put opts))

(defn POST [uri opts]
  (request uri :post opts))

(defn PATCH [uri opts]
  (request uri :patch opts))

;; The reason this is a macro is for failure highlighting on the
;; call-site rather than in the body of this form.
(defmacro do-request [request]
  `(let [response# (*handler* ~request)
         status# (:ring.response/status response#)]
     (is (<= 200 status# 299))
     response#))

;;

(deftest contacts-test
  ;; Create resource
  (do-request
   (PUT "https://data.example.test/contacts.meta"
        {:headers {"content-type" "application/edn"}
         :body (pr-str {})
         :token *alice-token*}))

  (do-request
   (POST "https://data.example.test/_site/operations"
         {:headers {"content-type" "application/edn"}
          :body (pr-str
                 {:xt/id "https://data.example.test/operations/add-contact"
                  :juxt.site/prepare
                  {:juxt.site.sci/program {}}
                  :juxt.site/transact
                  {:juxt.site.sci/program
                   (pr-str
                    [[:xtdb.api/put {:xt/id "https://data.example.test/contacts/fred"}]])}
                  :juxt.site/rules
                  '[[(allowed? subject operation resource permission)
                     [subject :juxt.site/user user]
                     [user :juxt.site/username username]
                     [permission :juxt.site/username username]]]})
          :token *alice-token*}))

  (let [{status :ring.response/status
         headers :ring.response/headers}
        (do-request
         (POST "https://data.example.test/_site/permissions"
               {:headers {"content-type" "application/edn"}
                :body (pr-str
                       ;; TODO: We should be careful not to allow existing
                       ;; permissions to be overwritten. Perhaps they must
                       ;; first be revoked with requesting a DELETE method
                       ;; on a permission. But who can do this? Perhaps the
                       ;; granter of a permission must be recorded with the
                       ;; permission, to ensure that only the granter can
                       ;; revoke.
                       {:xt/id "https://data.example.test/permissions/add-contact"
                        :juxt.site/operation-uri "https://data.example.test/operations/add-contact"
                        :juxt.site/username "alice"})
                :token *alice-token*}))]
    (is (= 201 status))
    (is (= "https://data.example.test/permissions/add-contact" (get headers "location"))))

  (repl/e "https://data.example.test/permissions/add-contact")

  (testing "Attach POST method"
    ;; Attach POST method
    (do-request
     (PATCH "https://data.example.test/contacts.meta"
            {:headers {"content-type" "application/edn"}
             :body (pr-str
                    [[:add-method
                      {:method "POST"
                       :operation-uri "https://data.example.test/operations/add-contact"}]])
             :token *alice-token*})))

  ;; Put /contacts under a protection space

  (do-request
   (PATCH "https://data.example.test/contacts.meta"
          {:headers {"content-type" "application/edn"}
           :body (pr-str
                  [[:add-protection-space
                    {:protection-space-uri "https://auth.example.test/protection-spaces/bearer"}]])
           :token *alice-token*}))

  (repl/e "https://data.example.test/contacts")


  (testing "POST /contacts"
    (with-logging
      (do-request
       (POST "https://data.example.test/contacts"
             {:headers {"content-type" "application/edn"}
              :body (pr-str {})
              :token *alice-token*}))))

  (is (= "https://data.example.test/contacts/fred"
         (:xt/id (repl/e "https://data.example.test/contacts/fred"))))


  (let [access-token (repl/e (str "https://auth.example.test/access-tokens/" *alice-token*))
        subject (repl/e (:juxt.site/subject access-token))
        user (repl/e (:juxt.site/user subject))
        username (:juxt.site/username user)]
    {:subject subject
     :user user
     :username username})

  ;; Create operation
  ;; https://data.example.test/operations/add-contact
  (do-request
   (POST "https://data.example.test/_site/operations"
         {:headers {"content-type" "application/edn"}
          :body (pr-str
                 {:xt/id "https://data.example.test/operations/get-contacts"
                  :juxt.site/state
                  {:juxt.site.sci/program
                   (pr-str
                    `(do
                       [{:contact-name "Bill"}
                        {:contact-name "Ben"}]))}
                  :juxt.site/rules
                  '[[(allowed? subject operation resource permission)
                     [permission :juxt.site/user "alice"]]]})
          :token *alice-token*}))

  ;; Create permission to call operation
  (do-request
   (POST "https://data.example.test/_site/permissions"
         {:headers {"content-type" "application/edn"}
          :body (pr-str
                 {:xt/id "https://data.example.test/permissions/get-contacts"
                  :juxt.site/operation-uri "https://data.example.test/operations/get-contacts"
                  :juxt.site/user "alice"})
          :token *alice-token*}))

  ;; Attach GET method
  (do-request
   (PATCH "https://data.example.test/contacts.meta"
          {:headers {"content-type" "application/edn"}
           :body (pr-str
                  [[:add-method
                    {:method "GET"
                     :operation-uri "https://data.example.test/operations/get-contacts"}]])
           :token *alice-token*}))

  (do-request
   (PATCH "https://data.example.test/contacts.meta"
          {:headers {"content-type" "application/edn"}
           :body (pr-str
                  [[:set-representation-metadata
                    {:content-type "application/json"}]])
           :token *alice-token*}))

  (do-request
   (PATCH "https://data.example.test/contacts.meta"
          {:headers
           ;; TODO: Change application/edn to application/json
           {"content-type" "application/edn"}
           :body (pr-str
                  [[:set-respond-program
                    {:program
                     (pr-str
                      `(assoc ~'*ctx* :ring.response/body
                              (jsonista.core/write-value-as-string ~'*state*)))}]])
           :token *alice-token*}))

  (do-request
   (GET "https://data.example.test/contacts.meta" {:token *alice-token*}))

  (let [{:ring.response/keys [status headers body]}
        (do-request (GET "https://data.example.test/contacts"))]
    (is (= 200 status))
    (is (= "application/json" (get headers "content-type")))
    (is (= [{"contact-name" "Bill"} {"contact-name" "Ben"}] (json/read-value body)))))
