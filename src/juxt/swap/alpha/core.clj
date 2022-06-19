;; Copyright © 2022, JUXT LTD.

(ns juxt.swap.alpha.core
  ;; When promoting this ns, move the defmethods that require all these
  ;; dependencies:
  (:require
   [juxt.site.alpha.util :refer [random-bytes as-hex-str]]
   [juxt.pass.alpha.util :refer [make-nonce]]
   [ring.util.codec :as codec]
   [juxt.site.alpha :as-alias site]
   [malli.core :as m]
   [malli.error :a me]
   [xtdb.api :as xt]
   [clojure.edn :as edn]
   [clojure.string :as str]))

;; See Factor, https://factorcode.org/
;; See K's XY language, https://www.nsl.com/k/xy/xy.htm

(defmulti word
  (fn [stack [word & queue] env]
    ;; A word can be a symbol, or a vector containing a symbol and any
    ;; arguments.
    (if (symbol? word) word (first word))))

(defmethod word 'break [stack [_ & queue] env]
  (throw (ex-info "BREAK" {:stack stack
                           :queue queue
                           :env env
                           })))

;; no-op is identity
(defmethod word 'no-op [stack queue env]
  [stack queue env])

;; TODO: What is the Factor equivalent name?
(defmethod word 'env [[el & stack] [_ & queue] env]
  [(cons (get env el) stack) queue env])

;; TODO: What is the Factor equivalent name?
(defmethod word 'juxt.swap.alpha.xtdb/entity [[id & stack] [_ & queue] {::site/keys [db] :as env}]
  (if-let [e (xt/entity db id)]
    [(cons e stack) queue env]
    ;; TODO: Arguably the developer's decision - add a word that throws if
    ;; there's a nil at the top of the stack
    (throw (ex-info "No such entity" {:id id}))))

;; TODO: What is the Factor equivalent name?
(defmethod word 'call [[quotation & stack] [_ & queue] env]
  (assert list? quotation)
  [stack (concat quotation queue) env])

;; TODO: What is the Factor equivalent name, if any?
(defmethod word 'bytes-to-string [[bytes & stack] [_ & queue] env]
  [(cons (String. bytes) stack) queue env])

;; TODO: What is the Factor equivalent name, if any?
(defmethod word 'read-edn-string [[el & stack] [_ & queue] env]
  [(cons (edn/read-string el) stack) queue env])

(defmethod word 'new-map [[n & stack] [_ & queue] env]
  (let [[els stack] (split-at (* 2 n) stack)]
    [(cons (apply hash-map els) stack) queue env]))

;; hashtables
(defmethod word 'associate [[v k & stack] [_ & queue] env]
  [(cons {k v} stack) queue env])

(defmethod word 'first [[coll & stack] [_ & queue] env]
  [(cons (first coll) stack) queue env])

(defmethod word 'second [[coll & stack] [_ & queue] env]
  [(cons (second coll) stack) queue env])

(defmethod word 'symbol [[coll & stack] [_ & queue] env]
  [(cons (symbol coll) stack) queue env])

(defmethod word '_3array [[z y x & stack] [_ & queue] env]
  [(cons (vector x y z) stack) queue env])

(defmethod word '_2array [[y x & stack] [_ & queue] env]
  [(cons (vector x y) stack) queue env])

(defmethod word 'append [[seq2 seq1 & stack] [_ & queue] env]
  [(cons (cond->> (concat seq1 seq2)
           (vector? seq1) vec) stack) queue env])

(defmethod word 'push [[seq elt & stack] [_ & queue] env]
  [(cons (cond (vector? seq) (conj seq elt)
               (list? seq) (concat seq [elt])) stack) queue env])

(defmethod word '>list [[sequence & stack] [_ & queue] env]
  [(cons (apply list sequence) stack) queue env])

(defmethod word '>vector [[sequence & stack] [_ & queue] env]
  [(cons (apply vector sequence) stack) queue env])

(defmethod word '>lower [[s & stack] [_ & queue] env]
  [(cons (str/lower-case s) stack) queue env])

(defmethod word 'validate [[schema & stack] [_ & queue] env]
  (let [schema (m/schema schema)]
    (if-not (m/validate schema (first stack))
      ;; Not sure why Malli throws this error here: No implementation of
      ;; method: :-form of protocol: #'malli.core/Schema found for class: clojure.lang.PersistentVector
      ;;
      ;; Workaround is to pr-str and read-string
      (throw
       (ex-info
        "Failed validation check"
        (read-string (pr-str (m/explain schema (first stack))))))
      [stack queue env])))

;; Shuffle words - see
;; https://docs.factorcode.org/content/article-shuffle-words.html

;; drop
;; 2drop
;; 3drop
;; nip
;; 2nip

(defmethod word 'dup [[el & stack] [_ & queue] env]
  [(cons el (cons el stack)) queue env])

;; 2dup
;; 3dup

(defmethod word 'over [[y x & stack] [_ & queue] env]
  [(cons x (cons y (cons x stack))) queue env])

;; 2over

(defmethod word 'pick [[z y x & stack] [_ & queue] env]
  [(cons x (cons z (cons y (cons x stack)))) queue env])

(defmethod word 'swap [[x y & stack] [_ & queue] env]
  [(cons y (cons x stack)) queue env])

(defmethod word 'of [[k m & stack] [_ & queue] env]
  [(cons (get m k) stack) queue env])

(declare eval-quotation)

(defmethod word 'dip [[x & stack] [[_ quotation] & queue] env]
  (let [stack (eval-quotation stack quotation env)]
    [(cons x stack) queue env]))

(defmethod word 'if [[cond t f & stack] [_ & queue] env]
  [stack (concat (if cond t f) queue) env])

(defmethod word '<array-map> [stack [_ & queue] env]
  [(cons (array-map) stack) queue env])

;; "Alternative conditional form that preserves the cond value if it is true."
;; WARNING: reversing t and f from Factor (since this feels better when in a list)
(defmethod word 'if*
  [[t f cond & stack] [_ & queue] env]
  (if cond
    [(cons cond stack) (concat t queue) env]
    [stack (concat f queue) env]))

(defmethod word 'juxt.swap.alpha.xtdb/q
  [[q & stack] [_ & queue] env]
  (assert (map? q))
  (assert (::site/db env))
  (let [db (::site/db env)
        [in stack] (split-at (count (:in q)) stack)
        results (apply xt/q db q in)]
    [(cons results stack) queue env]))

(defmethod word 'set-at
  [[m k v & stack] [_ & queue] env]
  [(cons (assoc m k v) stack) queue env])

(defmethod word 'assoc [[k v m & stack] [_ & queue] env]
  [(cons (assoc m k v) stack) queue env])

(defmethod word 'random-bytes
  [[size & stack] [_ & queue] env]
  [(cons (random-bytes size) stack) queue env])

(defmethod word 'as-hex-string
  [[bytes & stack] [_ & queue] env]
  [(cons (as-hex-str bytes) stack) queue env])

(defmethod word 'str
  [[s1 s2 & stack] [_ & queue] env]
  [(cons (str s1 s2) stack) queue env])

(defmethod word 'juxt.site.alpha/form-decode
  [[encoded & stack] [_ & queue] env]
  [(cons (codec/form-decode encoded) stack)
   queue
   env])

;; This could be in another ns
;; TODO: Rewrite with args on stack
(defmethod word 'find-matching-identity-on-password-query
  [[{:keys [username-in-identity-key password-hash-in-identity-key]} & stack]
   [_ & queue] env]
  [(cons {:find '[e]
          :where [
                  ['e username-in-identity-key 'username]
                  ['e password-hash-in-identity-key 'password-hash]
                  ['(crypto.password.bcrypt/check password password-hash)]]
          :in '[username password]} stack) queue env])

(defmethod word 'make-nonce
  [[size & stack] [_ & queue] env]
  [(cons (make-nonce size) stack) queue env])

(defmethod word 'xtdb.api/put
  [[doc & stack] [_ & queue] env]
  [(cons [:xtdb.api/put doc] stack) queue env])

(defmethod word 'ex-info
  [[msg ex-data & stack] [_ & queue] env]
  [(cons (ex-info msg ex-data) stack) queue env])

(defmethod word 'throw
  [[err & stack] [_ & queue] env]
  (throw err))

(defmethod word 'juxt.site.alpha/apply-to-request-context
  [[quotation & stack] [_ & queue] env]
  [(cons [:juxt.site.alpha/apply-to-request-context quotation] stack) queue env])

(defn word* [stack [w & queue] env]
  (cond
    (symbol? w)
    (word stack (cons w queue) env)
    (list? w) ; switch from postfix to prefix notation
    [stack (concat (reverse w) queue) env]
    :else
    [(cons w stack) queue env]))

(defn eval-quotation [stack queue env]
  ;; Naiive implementation. A production implementation would put an upper limit
  ;; on the number of iterations to prevent overly long running transactions.

  ;; For performance optimization, consider using a transient or a
  ;; java.util.Deque for both stack and queue. Since neither the stack nor queue
  ;; escape, and is run in a single-thread, the data structures can be
  ;; transient. However, see https://clojure.org/reference/transients that
  ;; claims that lists cannot be made transient "as there is no benefit to be
  ;; had.". So lists may be already fast enough.

  (loop [[stack queue env] [stack queue env]]
    (assert list? stack)
    (assert list? queue)
    (assert map? env)
    (if (seq queue)
      (recur (word* stack queue env))
      stack)))