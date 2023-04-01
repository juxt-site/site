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

;; This are the uri-maps used by the tests

(def AUTH_SERVER {"https://auth.example.org" "https://auth.example.test"})

(def RESOURCE_SERVER {"https://auth.example.org" "https://auth.example.test"
                      "https://data.example.org" "https://data.example.test"})

#_(defn implicit-authorization-request
  "Create a request that can be sent to the authorization_endpoint of an
  authorization server"
  [uri {client-id "client_id"
        scope "scope"
        state :state}]
  {:ring.request/method :get
   :juxt.site/uri uri
   :ring.request/query
   (codec/form-encode
    (cond->
        {"response_type" "token"
         "client_id" client-id
         "state" state}
        scope (assoc "scope" (codec/url-encode (str/join " " scope)))))})

#_(defn implicit-authorization-response!
  "Authorize response"
  [uri args]
  (let [request (implicit-authorization-request uri (assoc args :state (make-nonce 10)))]
    (*handler* request)))

#_(malli/=>
 implicit-authorization-response!
 [:=> [:cat
       [:string]
       [:map
        ["client_id" :string]
        ["scope" {:optional true} [:sequential :string]]]]
  [:map
   ["access_token" {:optional true} :string]
   ["error" {:optional true} :string]]])

#_(defn implicit-authorize!
  "Authorize a client, and return decoded fragment parameters as a string->string map"
  [uri args]
  (let [response (implicit-authorization-response! uri args)
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

    (codec/form-decode encoded-access-token)))

;; TODO: Not sure I like the make- prefix any more

(defn make-authorization-request [uri m]
  {:ring.request/method :get
   :juxt.site/uri uri
   :ring.request/query
   (codec/form-encode m)})

(defn make-token-request [uri params]
  (let [payload (codec/form-encode params)]
    {:ring.request/method :post
     :juxt.site/uri uri
     :ring.request/headers
     {"content-type" "application/x-www-form-urlencoded"
      "content-length" (str (count (.getBytes payload)))}
     :ring.request/body (io/input-stream (.getBytes payload))}))

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
           session-token client code-challenge-method redirect-uri scope]
    :or {;;authorization-uri "https://auth.example.test/oauth/authorize"
         ;;token-uri "https://auth.example.test/oauth/token"
         code-challenge-method "S256"}
    :as args}]
  (assert authorization-uri "Must provide authorization-uri")
  (assert grant-type "Must provide grant-type")
  (assert session-token "Must provide session-token")
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

      )))

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
           {:new-value {"authorization" new-value}
            :existing-value {"authorization" existing-value}})))
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
