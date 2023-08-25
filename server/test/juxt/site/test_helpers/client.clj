;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.client
  (:require
   [ring.util.codec :as codec]
   [juxt.site.test-helpers.oauth :refer [with-bearer-token with-basic-authorization] :as oauth]
   [juxt.site.test-helpers.handler :refer [*handler*]]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [juxt.site.test-helpers.init :refer [CONFIG]]
   [xtdb.api :as xt]
   [clojure.edn :as edn]
   [jsonista.core :as json]
   [clojure.java.io :as io]))

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

(defn create-admin-user []
  (let [db (xt/db *xt-node*)
        client-secret (client-secret db)
        cc-token (request-token
                  {"client-secret" client-secret})
        _ (with-bearer-token cc-token
            (register-user
             {"username" "alice"
              "password" "foobar"
              "fullname" "Alice"})
            (assign-user-role
             {"username" "alice"
              "role" "SiteAdmin"}))]))

(defn admin-user-fixture [f] (create-admin-user) (f))

(def ^:dynamic *admin-token* nil)

(defn admin-token-fixture [f]
  (create-admin-user)
  (binding [*admin-token*
            (request-token
             {"username" "alice"
              "password" "foobar"})]
    (f)))

(defn install-bundle [installer-seq]
  (let [body (.getBytes (pr-str installer-seq))]
    (http-post
     (str (get-in CONFIG ["uri-map" "https://data.example.org"]) "/_site/resources")
     {:ring.request/headers
      {"content-length" (str (count body))
       "content-type" "application/edn"}
      :ring.request/body (io/input-stream body)})))

(defn install-openapi! [openapi]
  (let [body (.getBytes (json/write-value-as-string openapi))]
    (http-post
     (str (get-in CONFIG ["uri-map" "https://data.example.org"]) "/_site/openapis")
     {:ring.request/headers
      {"content-length" (str (count body))
       "content-type" "application/json"}
      :ring.request/body (io/input-stream body)})))
