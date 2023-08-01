;; Copyright © 2023, JUXT LTD.

(ns juxt.site.jwt
  (:require
   [xtdb.api :as xt]
   [juxt.site.util :as util]
   [juxt.site.xt-util :as xtu])
  (:import
   (com.auth0.jwt JWT)
   (com.auth0.jwt.algorithms Algorithm)
   (java.time Instant Duration)
   (java.util Date)))

(memoize
 (defn get-algorithm [key]
   (Algorithm/RSA256 key)))

;; TODO: Test me
(defn make-jwt
  "Create and sign a new JWT. See RFC 9068 for conformance details."
  [header payload signing-key]
  ;; Speed up?
  (let [signer (get-algorithm signing-key)]
    (->
     (reduce-kv
      (fn [acc n claim]
        (if (nil? claim)
          (.withNullClaim acc n)
          (case n
            "aud" (.withAudience acc (into-array String [claim]))
            "exp" (.withExpiresAt acc claim)
            "iat" (.withIssuedAt acc claim)
            "iss" (.withIssuer acc claim)
            "jti" (.withJWTId acc claim)
            "kid" (.withKeyId acc claim)
            "ntb" (.withNotBefore acc claim)
            "sub" (.withSubject acc claim)
            (if (sequential? claim)
              (let [fc (first claim)]
                (.withArrayClaim acc n (cond
                                         (instance? Integer fc) (into-array Integer claim)
                                         (instance? Long fc) (into-array Long claim)
                                         :else (into-array String (map str claim)))))
              (.withClaim acc n claim)))))
      (->
       (JWT/create)
       (.withHeader header))
      payload)
     (.sign signer))))

(memoize
 (defn get-verifier [key]
   (->
    (JWT/require (get-algorithm key))
    ;; 2 mins leeway
    (.acceptLeeway (* 30 60))
    (.build))))

(defn- jwt->edn [decoded-jwt]
  {:header {"alg" (.getAlgorithm decoded-jwt)
            "cty" (.getContentType decoded-jwt)
            "kid" (.getKeyId decoded-jwt)
            "typ" (.getType decoded-jwt)}
   :claims (reduce-kv
            (fn [acc k v]
              (assoc acc k
                     (case k
                       "exp" (.asLong v)
                       "iat" (.asLong v)
                       "nbf" (.asLong v)
                       "aud" (.asString v)
                       "iss" (.asString v)
                       "jti" (.asString v)
                       (.asString v))))
            {}
            (.getClaims decoded-jwt))})

(defn decode-jwt
  ([jwt] (jwt->edn (JWT/decode jwt)))
  ([jwt public-key]
   (let [verifier (get-verifier public-key)
         decoded-jwt (.verify verifier jwt)]
     (jwt->edn decoded-jwt))))

(defn new-jwt [header payload keypair]
  (assert (map? header))
  (assert (map? payload))
  (assert (map? keypair))
  (let [decoded (.decode (java.util.Base64/getDecoder) (:juxt.site/private-key keypair))
        format (:juxt.site/private-key-format keypair)
        _ (when-not format
            (throw (ex-info "No keypair format found" {:keypair-id (:xt/id keypair)})))
        kf (java.security.KeyFactory/getInstance "RSA")
        key-spec (case format
                   "PKCS#8" (new java.security.spec.PKCS8EncodedKeySpec decoded)
                   (throw (ex-info "Unrecognised keyspec" {:format format})))
        private-key (.generatePrivate kf key-spec)]
    (make-jwt header payload private-key)))

;; TODO: This should make it explicit that we're creating a new
;; JWT. There may be other types of access token.
(defn new-access-token [claims keypair]
  (assert (map? claims))
  (assert (map? keypair))
  (new-jwt
   {"typ" "at+jwt"
    "kid" (:juxt.site/kid keypair)}
   claims
   keypair))

(defn verify-jwt [jwt keypair]
  (assert (string? jwt))
  (assert (map? keypair))
  ;; TODO: Replace "RSA" with (juxt.site/algorithm keypair)
  (let [kf (java.security.KeyFactory/getInstance "RSA")
        key-spec (case (:juxt.site/public-key-format keypair)
                   "X.509" (new java.security.spec.X509EncodedKeySpec (.decode (java.util.Base64/getDecoder) (:juxt.site/public-key keypair))))
        public-key (.generatePublic kf key-spec)
        jwt (decode-jwt jwt public-key)]
    jwt))

;; TODO: Rename from get-kid to extract-kid ?
(defn get-kid [jwt]
  (.asString (.getHeaderClaim (JWT/decode jwt) "kid")))

(defn lookup-keypair [xt-node kid]
  (assert kid)
  (first
   (map first
        (xt/q xt-node '{:find [(pull e [*])]
                        :where [[e :juxt.site/type "https://meta.juxt.site/types/keypair"]
                                [e :juxt.site/kid kid]]
                        :in [kid]}
              kid))))

(defn make-access-token! [xt-node {:keys [authorization-server user client-id duration]}]
  (let [client (ffirst
                (xt/q
                 xt-node
                 '{:find [(pull e [*])]
                   :where [[e :juxt.site/type "https://meta.juxt.site/types/application"]
                           [e :juxt.site/authorization-server issuer]
                           [e :juxt.site/client-id client-id]]
                   :in [issuer client-id]} authorization-server client-id))

        _ (when-not client
            (throw (ex-info "No client found" {:authorization-server authorization-server
                                               :client-id client-id})))

        kps
        (map first
             (xt/q
              xt-node
              '{:find [(pull kp [*])]
                :where [[kp :juxt.site/type "https://meta.juxt.site/types/keypair"]
                        [kp :juxt.site/issuer issuer]]
                :in [issuer]} authorization-server))

        [keypair another-keypair] kps

        _ (when another-keypair
            (throw
             (ex-info
              "More than one keypair installed for authorization-server, need to specify kid."
              {:keypairs (mapv :juxt.site/kid kps)
               :authorization-server authorization-server})))

        jti (util/make-nonce 16)
        aud (:juxt.site/resource-server client)

        iat (Instant/now)
        nbf iat

        exp (.plus iat (Duration/parse duration))

        iat (Date/from iat)
        exp (Date/from exp)

        _ (when-not (xtu/entity xt-node user)
            (throw (ex-info "User not found" {:user user})))

        user-identity-ref (str "https://auth.example.org/_site/user-identities/%s" (juxt.site.util/make-nonce 10))
        user-identity {:xt/id user-identity-ref
                       :juxt.site/user user
                       :juxt.site/issued-date iat
                       :juxt.site/expiry-date exp}

        subject (juxt.site.util/make-nonce 10)
        subject-doc {:xt/id (str "https://auth.example.org/subjects/" subject)
                     :juxt.site/type "https://meta.juxt.site/types/subject"
                     :juxt.site/issued-date iat
                     :juxt.site/expiry-date exp
                     :juxt.site/user-identity user-identity-ref
                     :juxt.site/user user}

        claims {"iss" authorization-server
                "jti" jti
                "iat" iat
                "nbf" nbf
                "exp" exp
                "aud" aud
                "sub" subject
                "client_id" client-id}

        access-token (new-access-token claims keypair)

        access-token-doc
        {:xt/id (str "https://auth.example.org/access-tokens/" jti)
         :juxt.site/type "https://meta.juxt.site/types/access-token"
         :juxt.site/jwt-id jti
         :juxt.site/subject subject
         :juxt.site/issuer authorization-server
         :juxt.site/issued-at iat
         :juxt.site/not-before nbf
         :juxt.site/expiry exp
         :juxt.site/audience aud
         :juxt.site/application (:xt/id client)
         :juxt.site/token access-token
         :juxt.site/keypair (:xt/id keypair)}]

    (xt/submit-tx
     xt-node
     [[:xtdb.api/put access-token-doc iat exp]
      [:xtdb.api/put subject-doc iat exp]
      [:xtdb.api/put user-identity iat exp]])

    {:access-token access-token}))
