;; Copyright © 2021, JUXT LTD.

(ns juxt.site.util)

(defn assoc-when-some [m k v]
  (cond-> m v (assoc k v)))

;;TODO find out what is different about this compared to assoc-when-some above
(defn assoc-some
  "Associates a key with a value in a map, if and only if the value is not nil."
  ([m k v]
   (if (or (nil? v) (false? v)) m (assoc m k v)))
  ([m k v & kvs]
   (reduce (fn [m [k v]] (assoc-some m k v))
           (assoc-some m k v)
           (partition 2 kvs))))

(defn hexdigest
  "Returns the hex digest of an object.
  computing entity-tags."
  ([input] (hexdigest input "SHA-256"))
  ([input hash-algo]
   (let [hash (java.security.MessageDigest/getInstance hash-algo)]
     (. hash update input)
     (let [digest (.digest hash)]
       (apply str (map #(format "%02x" (bit-and % 0xff)) digest))))))

(defn uuid-str []
  (str (java.util.UUID/randomUUID)))

(defn uuid-bytes []
  (.getBytes (uuid-str)))

(defn sha
  "Return a byte-array"
  ([bytes] (sha bytes "SHA3-224"))
  ([bytes algo]
   (let [hash (java.security.MessageDigest/getInstance algo)]
     (. hash update bytes)
     (.digest hash))))

(def SECURE_RANDOM (java.security.SecureRandom/getInstanceStrong))

(defn random-bytes [size]
  (let [result (byte-array size)]
    (.nextBytes SECURE_RANDOM result)
    result))

(defn as-hex-str
  "This uses java.util.HexFormat which requires Java 17 and above. If required,
  this can be re-coded, see
  https://stackoverflow.com/questions/9655181/how-to-convert-a-byte-array-to-a-hex-string-in-java
  and similar. For the size parameter, try 12."
  [bytes]
  (.formatHex (java.util.HexFormat/of) bytes))

(defn as-b64-str [bytes]
  (.encodeToString (java.util.Base64/getEncoder) bytes))

(def mime-types
  {"html" "text/html;charset=utf-8"
   "js" "application/javascript"
   "map" "application/json"
   "css" "text/css"
   "png" "image/png"
   "adoc" "text/asciidoc"})

(defn paths
  "Given a nested structure, return the paths to each leaf."
  [form]
  (if (coll? form)
    (for [[k v] (if (map? form) form (map vector (range) form))
          w (paths v)]
      (cons k (if (coll? w) w [w])))
    (list form)))

(comment
  (for [path
        (paths {:x {:y {:z [:a :b :c] :z2 [0 1 {:u {:v 1}}]}}
                :p {:q {:r :s :t :u :y (fn [_] nil)}}})
        :when (not (fn? (last path)))]
    path))

(defn deep-replace
  "Apply f to x, where x is a map value, collection member or scalar, anywhere in
  the form's structure. This is similar, but not identical to,
  clojure.walk/postwalk."
  [form f]
  (cond
    (map? form) (reduce-kv (fn [acc k v] (assoc acc k (deep-replace v f))) {} form)
    (vector? form) (mapv (fn [i] (deep-replace i f)) form)
    (coll? form) (map (fn [i] (deep-replace i f)) form)
    :else (f form)))

(comment
  (deep-replace {:a :b :c [identity {:x [{:g [:a :b identity]}]}]} #(if (fn? %) :replaced %)))

(defn etag [representation]
  (format
   "\"%s\""
   (subs
    (hexdigest
     (cond
       (:juxt.http/body representation)
       (:juxt.http/body representation)
       (:juxt.http/content representation)
       (.getBytes (:juxt.http/content representation)
                  (get representation :juxt.http/charset "UTF-8")))) 0 32)))

(defn make-nonce
  "This uses java.util.HexFormat which requires Java 17 and above. If required,
  this can be re-coded, see
  https://stackoverflow.com/questions/9655181/how-to-convert-a-byte-array-to-a-hex-string-in-java
  and similar. For the size parameter, try 12."
  [size]
  (as-hex-str (random-bytes size)))

(defn make-code-verifier [size]
  (assert (<= 43 size 128) "Invalid size")
  (apply str
         (map char
              (repeatedly size
                          #(rand-nth
                            (concat
                             (range (int \A) (inc (int \Z)))
                             (range (int \a) (inc (int \z)))
                             (range (int \0) (inc (int \9)))
                             [\- \. \_ \~]))))))

(defn base64-urlencode [arg]
  (let [bytes
        (cond
          (instance? BigInteger arg) (.toByteArray arg)
          :else arg)]
    (.encodeToString (.withoutPadding (java.util.Base64/getUrlEncoder)) bytes)))

;; See https://www.rfc-editor.org/rfc/rfc7636#appendix-A
(defn code-challenge [code-verifier]
  (base64-urlencode (sha (.getBytes code-verifier) "SHA-256")))
