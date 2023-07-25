;; Copyright © 2023, JUXT LTD.

(ns juxt.site.site-cli-test
  (:require
   [ring.util.codec :as codec]
   [clojure.test :refer [deftest is use-fixtures]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token with-basic-authorization] :as oauth]
   [juxt.site.test-helpers.handler :refer [handler-fixture *handler*]]
   [xtdb.api :as xt]
   [clojure.edn :as edn]
   [jsonista.core :as json]))

(def CONFIG
  {"uri-map"
   {"https://auth.example.org" "https://auth.example.test"
    "https://data.example.org" "https://data.example.test"}})

(defn init []
  (install-bundles!
   [["juxt/site/bootstrap" {}]
    ;; Support the creation of JWT bearer tokens
    ["juxt/site/oauth-token-endpoint" {}]
    ;; Install a keypair to sign JWT bearer tokens
    ["juxt/site/keypair" {"kid" "test-kid"}]
    ;; Install the required APIs
    ["juxt/site/api-operations" {}]
    ["juxt/site/resources-api" {}]
    ["juxt/site/events-api" {}]
    ["juxt/site/whoami-api" {}]
    ["juxt/site/users-api" {}]
    ["juxt/site/endpoints-api" {}]
    ;; RFC 7662 token introspection
    ["juxt/site/oauth-introspection-endpoint" {}]
    ;; Register the clients
    ["juxt/site/system-client" {"client-id" "site-cli"}]]
   (get CONFIG "uri-map")))

(defn init-fixture [f] (init) (f))

(use-fixtures :each system-xt-fixture handler-fixture init-fixture)

(defn client-secret [db]
  (let [site-cli-client (xt/entity db (format "https://auth.example.test/applications/site-cli"))]
    (:juxt.site/client-secret site-cli-client)))

(defn http-request [uri m]
  (*handler*
   (cond-> m
     uri (assoc :juxt.site/uri uri)
     (:body m) (->
                (assoc :ring.request/body (java.io.ByteArrayInputStream. (.getBytes (:body m))))
                (update :ring.request/headers assoc "content-length" (str (count (:body m))))))))

(defn http-get [uri m]
  (let [{:ring.response/keys [status body] :as response}
        (http-request uri (assoc m :ring.request/method :get))]
    (case status
      200 body
      (throw (ex-info "Unexpected status" response)))))

(defn http-post [uri m]
  (let [{:ring.response/keys [status body] :as response}
        (http-request uri (assoc m :ring.request/method :post))]
    (case status
      (200 201) body
      (throw (ex-info "Unexpected status" response)))))

(defn request-token [{:strs [grant-type] :as opts}]
  (let [grant-type (cond
                     grant-type grant-type
                     (or (get opts "username") (get opts "password")) "password"
                     :else "client_credentials")
        token-endpoint "https://auth.example.test/oauth/token"]
    (case grant-type
      "password"
      (let [username (get opts "username")
            password (get opts "password")
            body (http-post
                  token-endpoint
                  {:ring.request/headers {"content-type" "application/x-www-form-urlencoded"}
                   :body (format "grant_type=%s&username=%s&password=%s&client_id=site-cli"
                                 "password" username password)})]
        (some-> body json/read-value (get "access_token")))

      "client_credentials"
      (let [client-secret (get opts "client-secret")
            form (codec/form-encode {"grant_type" grant-type})
            body (with-basic-authorization
                   "site-cli" client-secret
                   (http-post
                    token-endpoint
                    {:ring.request/headers
                     {"accept" "application/json"
                      "content-type" "application/x-www-form-urlencoded"}
                     :body form}))]
        (some-> body json/read-value (get "access_token"))))))

(defn register-user [opts]
  (let [base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])
        body (json/write-value-as-string opts)]
    (http-post
     (str base-uri "/_site/users")
     {:ring.request/headers
      {"accept" "application/json"
       "content-length" (str (count body))
       "content-type" "application/json"}
      :body body})))

(defn assign-user-role [opts]
  (let [auth-base-uri (get-in CONFIG ["uri-map" "https://auth.example.org"])
        data-base-uri (get-in CONFIG ["uri-map" "https://data.example.org"])]
    (http-post
     (str auth-base-uri "/operations/assign-role")
     {:ring.request/headers {"content-type" "application/edn"}
      :body (pr-str
             {:juxt.site/user (str data-base-uri "/_site/users/" (get opts "username"))
              :juxt.site/role (str data-base-uri "/_site/roles/" (get opts "role"))})})))

(defn users []
  (json/read-value
   (http-get (str (get-in CONFIG ["uri-map" "https://data.example.org"]) "/_site/users") {})))

(defn events []
  (edn/read-string
   (http-get
    (str (get-in CONFIG ["uri-map" "https://data.example.org"]) "/_site/events")
    {:ring.request/headers {"accept" "application/edn"}})))

(deftest create-users-test
 (let [db (xt/db *xt-node*)
       client-secret (client-secret db)
       cc-token (request-token
                 {"client-secret" client-secret})

       _ (with-bearer-token cc-token
           (register-user
            {"username" "mal"
             "password" "foobar"
             "fullname" "Malcolm Sparks"})
           (assign-user-role
            {"username" "mal"
             "role" "Admin"}))

       mal-token (request-token
                  {"username" "mal"
                   "password" "foobar"})

       _ (with-bearer-token mal-token
           (register-user
            {"username" "alx"
             "password" "foobar"
             "fullname" "Alex Davis"}))

       users (with-bearer-token mal-token
               (users))

       events (with-bearer-token mal-token
                (->> (events)
                     (sort-by
                      (juxt :xtdb.api/tx-id :juxt.site/tx-event-index))))

       db (xt/db *xt-node*)

       subject (xt/entity db (:juxt.site/subject-uri (last events)))]

   (is (= [{"juxt.site/username" "alx"
            "fullname" "Alex Davis"
            "xt/id" "https://data.example.test/_site/users/alx"}
           {"juxt.site/username" "mal"
            "fullname" "Malcolm Sparks"
            "xt/id" "https://data.example.test/_site/users/mal"}] users))

   (is (= "https://data.example.test/_site/users/mal" (:juxt.site/user subject)))))
