;; Copyright © 2022, JUXT LTD.

(ns juxt.site.test-helpers.oauth
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.pprint :refer [pprint]]
   [juxt.site.util :refer [make-nonce]]
   [juxt.site.test-helpers.handler :refer [*handler*]]
   [malli.core :as malli]
   [ring.util.codec :as codec]))

;; This are the uri-maps used by the tests

(def AUTH_SERVER {"https://auth.example.org" "https://auth.example.test"})

(def RESOURCE_SERVER {"https://auth.example.org" "https://auth.example.test"
                      "https://data.example.org" "https://data.example.test"})

(defn implicit-authorization-request
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

(defn implicit-authorization-response!
  "Authorize response"
  [uri args]
  (let [request (implicit-authorization-request uri (assoc args :state (make-nonce 10)))]
    (*handler* request)))

(malli/=>
 implicit-authorization-response!
 [:=> [:cat
       [:string]
       [:map
        ["client_id" :string]
        ["scope" {:optional true} [:sequential :string]]]]
  [:map
   ["access_token" {:optional true} :string]
   ["error" {:optional true} :string]]])

(defn implicit-authorize!
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

(malli/=>
 authorize!
 [:=> [:cat
       [:string]
       [:map
;;        ^{:doc "to authenticate with authorization server"} [:juxt.site/session-token :string]
        ["client_id" :string]
        ["scope" {:optional true} [:sequential :string]]]]
  [:map
   ["access_token" {:optional true} :string]
   ["error" {:optional true} :string]]])

;; TODO: Not sure I like the make- prefix any more

(defn make-authorization-request [m]
  {:ring.request/method :get
   :juxt.site/uri "https://auth.example.test/oauth/authorize"
   :ring.request/query
   (codec/form-encode m)})

(defn make-token-request [params]
  (let [payload (codec/form-encode params)]
    {:ring.request/method :post
     :juxt.site/uri "https://auth.example.test/oauth/token"
     :ring.request/headers
     {"content-type" "application/x-www-form-urlencoded"
      "content-length" (str (count (.getBytes payload)))}
     :ring.request/body (io/input-stream (.getBytes payload))}))

(defn make-token-info-request [params]
  (let [payload (codec/form-encode params)]
    {:ring.request/method :post
     :juxt.site/uri "https://auth.example.test/token-info"
     :ring.request/headers
     {"content-type" "application/x-www-form-urlencoded"
      "content-length" (str (count (.getBytes payload)))}
     :ring.request/body (io/input-stream (.getBytes payload))}))

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
