;; Copyright © 2023, JUXT LTD.

(ns juxt.site.jwt
  (:require
   [xtdb.api :as xt])
  (:import
   (com.auth0.jwt JWT)
   (com.auth0.jwt.algorithms Algorithm)))

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

(defn decode-jwt [jwt public-key]
  (let [verifier (get-verifier public-key)
        decoded-jwt (.verify verifier jwt)]

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
              (.getClaims decoded-jwt))}))

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

(defn new-access-token [claims keypair]
  (assert (map? keypair))
  (new-jwt
   {"typ" "at+jwt"
    "kid" (:juxt.site/kid keypair)}
   claims
   keypair))

(defn verify-jwt [jwt keypair]
  (assert (string? jwt))
  (assert (map? keypair))
  (let [kf (java.security.KeyFactory/getInstance "RSA")
        key-spec (case (:juxt.site/public-key-format keypair)
                   "X.509" (new java.security.spec.X509EncodedKeySpec (.decode (java.util.Base64/getDecoder) (:juxt.site/public-key keypair))))
        public-key (.generatePublic kf key-spec)
        jwt (decode-jwt jwt public-key)]
    jwt))

(comment
  (let [kp (xt/entity (repl/db) "https://auth.site.test/keypairs/testkp")
        jwt (new-jwt {"typ" "at+jwt"} {"iss" "foo"} kp)
        ]
    (time
     (verify-jwt jwt kp))))

(defn get-kid [jwt]
  (.asString (.getHeaderClaim (JWT/decode jwt) "kid")))

(defn lookup-keypair [db kid]
  (assert kid)
  (first
   (map first
        (xt/q db '{:find [(pull e [*])]
                   :where [[e :juxt.site/type "https://meta.juxt.site/types/keypair"]
                           [e :juxt.site/kid kid]]
                   :in [kid]}
              kid))))
