;; Copyright © 2022, JUXT LTD.

(ns juxt.site.test-helpers.oauth
  (:require
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [malli.core :as malli]
   [jsonista.core :as json]
   [juxt.site.util :as util :refer [make-nonce]]
   [juxt.site.test-helpers.handler :refer [*handler*]]
   [juxt.site.test-helpers.login :as login :refer [with-session-token]]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]))

;; These are the uri-maps used by the tests

(def AUTH_SERVER {"https://auth.example.org" "https://auth.example.test"})

(def RESOURCE_SERVER {"https://auth.example.org" "https://auth.example.test"
                      "https://data.example.org" "https://data.example.test"})

;; TODO: Not sure I like the make- prefix any more
(defn make-authorization-request [uri m]
  (let [payload-bytes (.getBytes (codec/form-encode m))]
    {:ring.request/method :post
     :ring.request/headers {"origin" "https://petstore.example.com"
                            "content-type" "application/x-www-form-urlencoded"
                            "content-length" (str (count payload-bytes))}
     :juxt.site/uri uri
     :ring.request/body (io/input-stream payload-bytes)}))

(defn make-token-request [uri params]
  (let [payload (codec/form-encode params)]
    {:ring.request/method :post
     :juxt.site/uri uri
     :ring.request/headers
     {"content-type" "application/x-www-form-urlencoded"
      "content-length" (str (count (.getBytes payload)))
      "origin" "https://petstore.example.com"}
     :ring.request/body (io/input-stream (.getBytes payload))}))

(defn client-credentials-token-request
  [uri {:keys [client-id client-secret]}]
  (->
   (make-token-request uri {"grant_type" "client_credentials"})
   (assoc-in [:ring.request/headers "authorization"]
             (format "Basic %s" (util/as-b64-str (.getBytes (str client-id ":" client-secret)))))))

(defn request-token-with-client-credentials
  [uri opts]
  (let [response
        (*handler* (client-credentials-token-request uri opts))
        status (:ring.response/status response)]
    (when-not (= 200 status)
      (throw (ex-info "Unexpected response status" {:status status :response response})))
    (-> response
        :ring.response/body
        json/read-value
        (get "access_token"))))

(defn make-token-info-request [uri params]
  (let [payload (codec/form-encode params)]
    {:ring.request/method :post
     :juxt.site/uri uri
     :ring.request/headers
     {"content-type" "application/x-www-form-urlencoded"
      "content-length" (str (count (.getBytes payload)))}
     :ring.request/body (io/input-stream (.getBytes payload))}))

(defn acquire-access-token!
  "Having thoroughly tested the authorization flows, we can now provide
  a convenience function which can be useful for further testing."
  [{:keys [grant-type authorization-uri token-uri
           session-token client code-challenge-method redirect-uri scope
           username password]
    :or {code-challenge-method "S256"}
    :as args}]
  (assert (or authorization-uri token-uri) "Must provide either authorization-uri, token-uri or both")
  (assert grant-type "Must provide grant-type")
  (let [db (xt/db *xt-node*)
        client-doc (xt/entity db client)
        _ (assert client-doc (str "Client not registered: " client))
        client-id (:juxt.site/client-id client-doc)
        _ (assert client-id (str "No client-id for client: " client))]
    (case grant-type
      "authorization_code"
      (let [code-verifier (util/make-code-verifier 64)
            code-challenge (util/code-challenge code-verifier)
            {:ring.response/keys [status headers] :as response}
            (with-session-token session-token
              (*handler*
               (make-authorization-request
                authorization-uri
                ;; See https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
                (merge
                 ;; REQUIRED
                 {"response_type" "code"
                  "client_id" client-id}
                 ;; OPTIONAL
                 (when redirect-uri {"redirect_uri" redirect-uri})
                 (when scope {"scope" (str/join " " scope)})
                 ;; RECOMMENDED
                 {"state" (util/make-nonce 4)}
                 ;; PKCE
                 {"code_challenge" code-challenge
                  "code_challenge_method" code-challenge-method}))))
            _ (when (not= 303 status)
                (throw (ex-info "Unexpected response" {:response response})))


            {:strs [location]} headers
            [_ _ query-string] (re-matches #"(https://.+?)\?(.*)" location)

            {:strs [code error] :as query} (codec/form-decode query-string)

            _ (when error
                (throw (ex-info "Error from authorize request" query)))

            _ (assert token-uri "For grant_type of authorization_code, must provide token-uri")

            token-request
            (make-token-request
             token-uri
             ;; See https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
             (merge
              ;; REQUIRED
              {"grant_type" "authorization_code"
               "code" code
               "redirect_uri" (first (:juxt.site/redirect-uris client-doc))
               "client_id" client-id}
              ;; PKCE
              {"code_verifier" code-verifier}))

            {:ring.response/keys [status body] :as response}
            (*handler* token-request)]

        (when (= status 500)
          (throw (ex-info "Error on token acquisition" {:response response})))

        ;; Avoid confusion later
        (assert (contains? #{200 400} status) (str status))

        (json/read-value body))

      "implicit"
      (let [state (make-nonce 10)
            request (make-authorization-request
                     authorization-uri
                     (merge
                      ;; See https://www.rfc-editor.org/rfc/rfc6749#section-4.2.1
                      {"response_type" "token"
                       "client_id" client-id
                       ;; "redirect_uri" redirect-uri ; OPTIONAL
                       }
                      (when scope {"scope" (str/join " " scope)})
                      {"state" state}))

            response (with-session-token session-token
                       (*handler* request))
            _ (case (:ring.response/status response)
                (302 303) :ok
                400 (throw (ex-info "Client error" (assoc args :response response)))
                403 (throw (ex-info "Forbidden to authorize" (assoc args :response response)))
                (throw (ex-info "Unexpected error" (assoc args :response response))))

            location-header (-> response :ring.response/headers (get "location"))

            [_ _ encoded-access-token]
            (re-matches #"https://(.*?)/.*?#(.*)" location-header)]

        (when-not encoded-access-token
          (throw (ex-info "No access-token fragment" {:response response})))

        (codec/form-decode encoded-access-token))

      "password"
      (let [_ (assert username "Must provide username")
            _ (assert password "Must provide username")
            token-request (make-token-request
                           token-uri
                           ;; See https://www.rfc-editor.org/rfc/rfc6749#section-4.3.2
                           (merge
                            ;; REQUIRED
                            {"grant_type" "password"
                             "username" username
                             "password" password
                             "client_id" client-id}
                            ;; OPTIONAL
                            (when scope {"scope" (str/join " " scope)})))

            {:ring.response/keys [status body] :as response}
            (*handler* token-request)]

        (when (= status 500)
          (throw (ex-info "Error on token acquisition" {:response response})))

        ;; Avoid confusion later
        (assert (contains? #{200 400} status) (str status))

        (json/read-value body))

      "client_credentials"
      (let [client-secret (:juxt.site/client-secret client-doc)
            authorization
            (str "Basic " (.encodeToString
                           (java.util.Base64/getEncoder)
                           (.getBytes (format "%s:%s" client-id client-secret))))
            token-request
            (-> (make-token-request
                 token-uri
                 ;; See https://www.rfc-editor.org/rfc/rfc6749#section-4.3.2
                 (merge
                  ;; REQUIRED
                  {"grant_type" "client_credentials"}
                  ;; OPTIONAL
                  (when scope {"scope" (str/join " " scope)})))
                (assoc-in [:ring.request/headers "authorization"] authorization))
            {:ring.response/keys [status body] :as response}
            (*handler* token-request)]

        (when (= status 500)
          (throw (ex-info "Error on token acquisition" {:response response})))

        ;; Avoid confusion later
        (assert (contains? #{200 400} status) (str status))
        (json/read-value body)))))

(malli/=>
 acquire-access-token!
 [:=>
  [:cat
   [:map
    [:grant-type [:enum ["authorization_code" "implicit"]]]
    [:authorization-uri [:re "https://.+"]]]]
  [:map
   ["access_token" {:optional true} :string]
   ["error" {:optional true} :string]]])

;; TODO: Consolidate this with above function: acquire-access-token!
(defn refresh-token!
  [{:keys [refresh-token scope]}]
  (let [{:ring.response/keys [status body] :as response}
        (*handler*
         (make-token-request
          "https://auth.example.test/oauth/token"
          ;; See https://www.rfc-editor.org/rfc/rfc6749#section-6
          (merge
           {"grant_type" "refresh_token"
            "refresh_token" refresh-token}
           (when scope {"scope" scope}))))

        _ (when (= status 500)
            (throw (ex-info "Error on token refresh" {:response response})))

        _ (assert (contains? #{200 400} status) (str status))]

    (json/read-value body)))

(defn assoc-bearer-token [req token]
  (update-in
   req
   [:ring.request/headers "authorization"]
   (fn [existing-value]
     (let [new-value (format "Bearer %s" token)]
       (when (and existing-value (not= existing-value new-value))
         (throw
          (ex-info
           "To avoid confusion when debugging, assoc-bearer-token will not override an already set authorization header"
           {})))
       new-value))))

(defmacro with-bearer-token [token & body]
  `(let [dlg# *handler*
         token# ~token]
     (when-not token#
       (throw (ex-info "with-bearer-token called without a bearer token" {})))
     (binding [*handler*
               (fn [req#]
                 (dlg# (assoc-bearer-token req# token#)))]
       ~@body)))

(defn assoc-basic-authorization [req username password]
  (update-in
   req
   [:ring.request/headers "authorization"]
   (fn [existing-value]
     (let [new-value (format "Basic %s" (codec/base64-encode (.getBytes (format "%s:%s" username password))))]
       (when (and existing-value (not= existing-value new-value))
         (throw
          (ex-info
           "To avoid confusion when debugging, assoc-basic-authorization will not override an already set authorization header"
           {})))
       new-value))))

(defmacro with-basic-authorization [username password & body]
  `(let [dlg# *handler*
         username# ~username
         password# ~password]
     (when-not username#
       (throw (ex-info "with-basic-authorization called without a username" {})))
     (when-not password#
       (throw (ex-info "with-basic-authorization called without a password" {})))
     (binding [*handler*
               (fn [req#]
                 (dlg# (assoc-basic-authorization req# username# password#)))]
       ~@body)))
