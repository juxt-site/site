; Copyright © 2022, JUXT LTD.

(ns juxt.site.operations
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.tools.logging :as log]
   [crypto.password.bcrypt :as bcrypt]
   [java-http-clj.core :as hc]
   [jsonista.core :as json]
   [juxt.grab.alpha.parser :as graphql.parser]
   [juxt.grab.alpha.schema :as graphql.schema]
   [juxt.site.http-authentication :as http-authn]
   [juxt.site.jwt :as jwt]
   [juxt.site.openid-connect :as openid-connect]
   [juxt.site.util :refer [make-nonce as-b64-str] :as util]
   [juxt.site.xt-util :as xt-util]
   [malli.core :as malli]
   [malli.error :as malli.error]
   [ring.util.codec :as codec]
   [sci.core :as sci]
   [xtdb.api :as xt]
   [juxt.site.sci-api :as api]
   juxt.site.schema))

(defn operation->rules
  "Determine rules for the given operation id. A rule is bound to the
  given operation."
  [db operation-uri]
  (mapv
   #(conj (second %) ['operation :xt/id (first %)])
   (xt/q db '{:find [e rules]
              :where [[e :xt/id operation-uri]
                      [e :juxt.site/rules rules]]
              :in [operation-uri]}
         operation-uri)))

(defn operations->rules
  "Determine rules for the given operation ids. Each rule is bound to the given
  operation."
  [db operations]
  (mapv
   #(conj (second %) ['operation :xt/id (first %)])
   (xt/q db {:find ['e 'rules]
             :where [['e :xt/id (set operations)]
                     ['e :juxt.site/rules 'rules]]})))

(defn check-permissions
  [{db :juxt.site/db,
    subject-uri :juxt.site/subject-uri,
    operation-uri :juxt.site/operation-uri,
    resource-uri :juxt.site/resource-uri,
    scope :juxt.site/scope,
    purpose :juxt.site/purpose}]

  (assert (or (nil? subject-uri) (string? subject-uri)))
  (assert (or (nil? resource-uri) (string? resource-uri)))
  (assert (or (nil? scope) (set? scope)))

  (let [rules (operation->rules db operation-uri)]

    (when-not (seq rules)
      ;; No rules
      (throw
       (ex-info
        "Operation denied, no rules"
        {:subject subject-uri
         :operation operation-uri
         :resource resource-uri
         :scope scope
         :purpose purpose})))

    (let [query (if scope
                  {:find '[(pull permission [*]) ]
                   :where
                   '[
                     [operation :juxt.site/type "https://meta.juxt.site/types/operation"]

                     ;; Only consider a permitted operation
                     [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                     [permission :juxt.site/operation operation]
                     (allowed? subject operation resource permission)

                     ;; Only permissions that match our purpose
                     [permission :juxt.site/purpose purpose]

                     ;; When scope limits operations, restrict operations that have the scope
                     [operation :juxt.site/scope s]
                     [(contains? scope s)]]

                   :rules rules

                   :in '[subject operation resource scope purpose]}

                  {:find '[(pull permission [*]) ]
                   :where
                   '[
                     [operation :juxt.site/type "https://meta.juxt.site/types/operation"]

                     ;; Only consider a permitted operation
                     [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                     [permission :juxt.site/operation operation]
                     (allowed? subject operation resource permission)

                     ;; Only permissions that match our purpose
                     [permission :juxt.site/purpose purpose]]

                   :rules rules

                   :in '[subject operation resource purpose]})

          permissions (try
                        (map first
                             (if scope
                               (xt/q db query subject-uri operation-uri resource-uri scope purpose)
                               (xt/q db query subject-uri operation-uri resource-uri purpose)))
                        (catch Exception e
                          (throw (ex-info "Failed to query permissions" {:query query} e))))]

      (if (seq permissions)
        permissions
        (throw
         (ex-info
          (format "Operation denied, no permission (subject: %s, operation: %s)" subject-uri operation-uri)
          {::type :no-permission
           :juxt.site/subject-uri subject-uri
           :juxt.site/operation-uri operation-uri
           :juxt.site/resource-uri resource-uri
           :juxt.site/query query
           :juxt.site/scope scope
           :juxt.site/error
           {:juxt.site/ex-data
            (if-not subject-uri
              {:ring.response/status 401
               :ring.response/body "<!DOCTYPE html><h1>Unauthorized</h1>"}

              {:ring.response/status 403
               :ring.response/body "<!DOCTYPE html><h1>Forbidden</h1>"})}}))))))

(defn allowed-resources
  "Given a set of possible operations, and possibly a subject and purpose, which
  resources are allowed?"
  [db operation {subject :juxt.site/subject, purpose :juxt.site/purpose}]
  (let [rules (operation->rules db operation)
        query {:find '[resource]
               :where
               '[
                 [operation :juxt.site/type "https://meta.juxt.site/types/operation"]

                 ;; Only consider a permitted operation
                 [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                 [permission :juxt.site/operation operation]
                 (allowed? subject operation resource permission)

                 ;; Only permissions that match our purpose
                 [permission :juxt.site/purpose purpose]]

               :rules rules

               :in '[subject operation purpose]}]

    (try
      (xt/q db query (:xt/id subject) operation purpose)
      (catch Exception cause
        (throw
         (ex-info
          "Operations query failed"
          {:query query
           :rules rules
           :subject subject
           :operation operation
           :operation-entity (xt/entity db operation)
           :purpose purpose}
          cause))))))

(malli/=>
 allowed-resources
 [:=> [:cat
       :any
       :string
       [:map
        [:juxt.site/subject {:optional true}]
        [:juxt.site/purpose {:optional true}]]]
  :any])

;; TODO: How is this call protected from unauthorized use? Must call this with
;; access-token to verify subject.
(defn allowed-subjects
  "Given a resource and an operation, which subjects can access?"
  [db resource operation {:keys [purpose]}]
  (let [rules (operation->rules db operation)]
    (->> (xt/q
          db
          {:find '[subject]
           :keys '[subject]
           :where
           '[
             [operation :juxt.site/type "https://meta.juxt.site/types/operation"]

             ;; Only consider a permitted operation
             [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
             [permission :juxt.site/operation operation]
             (allowed? subject operation resource permission)

             ;; Only permissions that match our purpose
             [permission :juxt.site/purpose purpose]

             #_[access-token :juxt.site/subject subject]]

           :rules rules

           :in '[resource operation purpose]}

          resource operation purpose))))

#_(defn pull-allowed-resource
  "Given a subject, an operation and a resource, pull the allowed
  attributes."
  [db operation resource ctx]
  (let [check-result
        (check-permissions
         db
         operation
         (assoc ctx :juxt.site/resource resource))

        pull-expr (vec (mapcat
                        (fn [{operation :juxt.site/operation}]
                          (:juxt.site/pull operation))
                        check-result))]
    (xt/pull db pull-expr (:xt/id resource))))

#_(malli/=>
 pull-allowed-resource
 [:=> [:cat
       :any
       :string
       :juxt.site/resource
       [:map
        [:juxt.site/subject {:optional true}]
        [:juxt.site/purpose {:optional true}]]]
  :any])

(defn pull-allowed-resources
  "Given a subject and an operation, which resources are allowed, and
  get me the documents. If resources-in-scope is given, only consider
  resources in that set."
  [db operation {subject :juxt.site/subject,
                 purpose :juxt.site/purpose,
                 include-rules :juxt.site/include-rules,
                 resources-in-scope :juxt.site/resources-in-scope}]
  (assert (string? operation))
  (let [rules (operation->rules db operation)
        _ (when-not (seq rules)
            (throw (ex-info "No rules found for operation" {:operation operation})))
        results
        (xt/q
         db
         {:find '[resource (pull operation [:xt/id :juxt.site/pull]) purpose permission]
          :keys '[resource operation purpose permission]
          :where
          (cond-> '[
                    ;; Only consider given operations
                    [operation :juxt.site/type "https://meta.juxt.site/types/operation"]

                    ;; Only consider allowed permssions
                    [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                    [permission :juxt.site/operation operation]
                    (allowed? subject operation resource permission)

                    ;; Only permissions that match our purpose
                    [permission :juxt.site/purpose purpose]]

            include-rules
            (conj '(include? subject operation resource))

            resources-in-scope
            (conj '[(contains? resources-in-scope resource)]))

          :rules (vec (concat rules include-rules))

          :in '[subject operation purpose resources-in-scope]}

         (:xt/id subject) operation purpose (or resources-in-scope #{}))]

    ;; TODO: Too complex, extract this and unit test. The purpose here it to
    ;; apply the pull of each relevant operation to each result, and merge the
    ;; results into a single map.
    (doall
     (for [[resource resource-group] (group-by :resource results)]
       (apply merge
              (for [{:keys [operation]}
                    ;; TODO: Purpose and permission are useful metadata, how do
                    ;; we retain in the result? with-meta?
                    resource-group]
                (xt/pull db (:juxt.site/pull operation '[*]) resource)))))))

(malli/=>
 pull-allowed-resources
 [:=> [:cat
        :any
        :string
        [:map
         [:juxt.site/subject {:optional true}]
         [:juxt.site/purpose {:optional true}]]]
   :any])

(defn join-with-pull-allowed-resources
  "Join collection on given join-key with another pull of allowed-resources with
  given operations and options."
  [db coll join-key operations options]
  (let [idx (->>
             (assoc options :juxt.site/resources-in-scope (set (map join-key coll)))
             (pull-allowed-resources db operations)
             (group-by :xt/id))]
    (map #(update % join-key (comp first idx)) coll)))

(defn allowed-operations
  "Return all the operations that a subject is allowed to perform, along
  with the permissions that permit them."
  [db {subject :juxt.site/subject, purpose :juxt.site/purpose}]
  (let [
        ;; Start with a list of all operations
        operations
        (set
         (map first
              (xt/q db '{:find [e]
                         :where [[e :juxt.site/type "https://meta.juxt.site/types/operation"]]})))

        rules (operations->rules db operations)]

    (->>
     (xt/q
      db
      {:find '[(pull operation [*]) permission]
       :keys '[juxt.site/operation juxt.site/permission]
       :where
       '[
         [operation :juxt.site/type "https://meta.juxt.site/types/operation"]

         ;; Only consider given operations
         ;; TODO: Is this necessary
         [(contains? operations operation)]

         ;; Only consider a permitted operation
         [permission :juxt.site/type "https://meta.juxt.site/types/permission"]
         [permission :juxt.site/operation operation]
         (allowed? subject operation resource permission)

         ;; Only permissions that match our purpose
         [permission :juxt.site/purpose purpose]]

       :rules rules

       :in '[subject operations resource purpose]}

      (:xt/id subject)
      operations
      nil
      purpose)

     ;; We want to list unique operations but associated with the
     ;; permissions that let the subject have access.
     (group-by :juxt.site/operation)
     (reduce-kv
      (fn [acc operation permissions]
        (conj acc {:juxt.site/operation operation
                   :juxt.site/permitted-by (mapv :juxt.site/permission permissions)}))
      []))))

(defn common-sci-namespaces [operation]
  {
   'user
   {'pprint-str (fn [x] (with-out-str (pprint x)))}

   'com.auth0.jwt.JWT
   {'decode (fn decode [x] (com.auth0.jwt.JWT/decode x))}

   'crypto.password.bcrypt {'encrypt bcrypt/encrypt}

   'java-http-clj.core
   {'send hc/send}

   'jsonista.core
   {'write-value-as-string (fn [x] (json/write-value-as-string x (json/object-mapper {:pretty true})))
    'write-value-as-bytes (fn [x] (json/write-value-as-bytes x (json/object-mapper {:pretty true})))
    'read-value json/read-value
    'read-value-with-keywords (fn [x] (json/read-value x (json/object-mapper {:decode-key-fn true})))}

   'juxt.site
   {'decode-id-token juxt.site.openid-connect/decode-id-token
    'verify-authorization-code
    (fn [{:keys [code-verifier code-challenge code-challenge-method]}]
      (assert code-verifier)
      (assert code-challenge)
      (assert code-challenge-method)
      (case code-challenge-method
        "S256" (let [new-code-challenge (util/code-challenge code-verifier)]
                 {:verified? (= code-challenge new-code-challenge)
                  :code-challenge code-challenge
                  :code-verifier code-verifier
                  :new-code-challenge new-code-challenge})))}

   'juxt.site.malli
   {'validate (fn validate [schema value] (malli/validate schema value))
    'explain-input (fn explain [input]
                     (->
                      (malli/explain (get-in operation [:juxt.site.malli/input-schema]) input)
                      (malli.error/humanize)))
    'validate-input
    (fn validate-input [input]
      (let [schema (get-in operation [:juxt.site.malli/input-schema])
            valid? (malli/validate schema input)]
        (when-not valid?
          (throw
           (ex-info
            "Validation failed"
            {:error :validation-failed
             :input input
             :schema schema
             :ring.response/status 400})))
        input))}

   'log
   {'trace (fn [message] (log/trace message))
    'debug (fn [message] (log/debug message))
    'info (fn [message] (log/info message))
    'warn (fn [message] (log/warn message))
    'error (fn [message] (log/error message))}

   'grab
   {'parse graphql.parser/parse
    'compile-schema graphql.schema/compile-schema*}

   'ring.util.codec
   {'form-encode codec/form-encode
    'form-decode codec/form-decode}

   'clojure.walk
   {'keywordize-keys
    clojure.walk/keywordize-keys}

   'clojure.pprint
   {'pprint pprint}})

;; Remove anything in the ctx that will upset nippy. However, in the future
;; we'll definitely want to record all inputs to operations, so this is an
;; opportunity to decide which entries form the input 'record' and which are
;; only transitory for the purposes of responnding to the request.
(defn sanitize-ctx [ctx]
  (dissoc ctx :juxt.site/xt-node :juxt.site/db))

(declare bundle->tx-ops)

(defn prepare-sci-opts [operation ctx]
  {:namespaces
   (merge-with
    merge
    {'user {'*ctx* (sanitize-ctx ctx)
            'logf (fn [fmt & fmt-args]
                    (log/infof (apply format fmt fmt-args)))
            'log (fn [message]
                   (log/info message))}

     'xt
     {
      ;; Unsafe due to violation of strict serializability, hence
      ;; marked as entity*
      'entity*
      (fn [eid]
        (if-let [db (:juxt.site/db ctx)]
          (xt/entity db eid)
          (throw (ex-info "Cannot call entity* as no database in context" {}))))}

     'juxt.site.util
     {'make-nonce make-nonce}

     'juxt.site
     {'generate-key-pair
      (fn [algo]
        (.generateKeyPair (java.security.KeyPairGenerator/getInstance algo)))
      'get-public-key (fn [kp] (.getPublic kp))
      'get-private-key (fn [kp] (.getPrivate kp))
      'get-encoded (fn [k] (as-b64-str (.getEncoded k)))
      'get-modulus (fn [k] (.getModulus k))
      'get-public-exponent (fn [k] (.getPublicExponent k))
      'get-key-format (fn [k] (.getFormat k))

      'bundle->tx-ops
      (fn [bundle]
        (bundle->tx-ops
         (:juxt.site/subject-uri ctx)
         ;; TODO: Warning, illegal use of db in prepare. Rather, we
         ;; should pull out the operations and their hashes, creating a
         ;; mapping for installer-seq->tx-ops to map operation-uri to
         ;; an operation, and ensure that the same operation used in
         ;; the prepare is used in the transact (via a hash).
         (:juxt.site/db ctx)
         bundle))}}

    (common-sci-namespaces operation))

   :classes
   {'java.util.Date java.util.Date
    'java.time.Instant java.time.Instant
    'java.time.Duration java.time.Duration
    'java.time.temporal.ChronoUnit java.time.temporal.ChronoUnit
    'java.security.KeyPairGenerator java.security.KeyPairGenerator
    }}
  )

(defn do-prepare
  "Return a map of the result of any juxt.site/prepare entry. The
  prepare phase is used to validate input, create unique randomized
  numbers. Anything that can be done in advance of a transaction, but
  without accessing the database (which may not be the same database
  as the one the transaction sees)."
  [operation ctx]
  (when-let [prepare-program (some-> operation :juxt.site/prepare :juxt.site.sci/program)]
    (try
      (sci/eval-string
       prepare-program
       (prepare-sci-opts operation ctx))
      (catch clojure.lang.ExceptionInfo e
        (throw
         (ex-info
          (format "Prepare failed for operation %s" (:xt/id operation))
          ;; The point of this is that we want to allow the
          ;; thrower to set status, headers.
          ;;
          ;; TODO: We should take the latest ctx (given as a
          ;; parameter), and return it as the
          ;; juxt.site/request-context entry in the ex-info but
          ;; with the status, headers, and body merged into
          ;; it. This is a common idiom so there should be a
          ;; convenience function to help do this.
          (merge (ex-data e) (ex-data (.getCause e)))
          e))))))

(defn prepare-tx-op [{resource :juxt.site/resource,
                      operation :juxt.site/operation,
                      :as ctx}]
  (when-not operation
    (throw (ex-info "An operation is required in the prepare phase" {:operation-uri (:juxt.site/operation-uri ctx)})))
  ;; Prepare the transaction - this work happens prior to the
  ;; transaction, on a single node, and may be wasted work if the
  ;; transaction ultimately fails. However, it is a good place to do
  ;; anything that is non-deterministic which can't be done in the
  ;; transaction, such as computing secure random numbers.
  (let [prepare (do-prepare operation ctx)]
    (if-let [tx-ops (:juxt.site/tx-ops prepare)]
      ;; A special case where the prepare program has returned the
      ;; tx-ops it wants to run with. This also allows us to avoid the
      ;; recursive tx-fn problem which means that sub-tx-fn errors are
      ;; swallowed by XTv1.
      tx-ops

      ;; The normal case where we invoke the do-operation-tx-fn.
      (let [do-operation-tx-fn (:juxt.site/do-operation-tx-fn operation)]
        (when-not do-operation-tx-fn
          (throw
           (ex-info
            "Failed to determine :juxt.site/do-operation-tx-fn"
            {:operation-uri (:xt/id operation)})))
        [[:xtdb.api/fn do-operation-tx-fn
          (cond-> (select-keys ctx [:juxt.site/subject-uri
                                    :juxt.site/subject
                                    :juxt.site/operation-index
                                    :juxt.site/operation-uri
                                    :juxt.site/purpose
                                    :juxt.site/scope
                                    :juxt.site/prepare])
            prepare (assoc :juxt.site/prepare prepare)
            resource (assoc :juxt.site/resource-uri (:xt/id resource)))]]))))

(defn apply-ops!
  [xt-node tx-ops]
  (let [tx (xt/submit-tx xt-node tx-ops)
        {:xtdb.api/keys [tx-id] :as tx} (xt/await-tx xt-node tx)]

    ;; If the transaction has failed to commit, we pull out the
    ;; underlying exception document that XTDB has recorded in
    ;; transaction log and document store. Operations are able to
    ;; throw exceptions with ex-data containing response status,
    ;; headers and body.
    (when-not (xt/tx-committed? xt-node tx)
      (let [exception-doc (xt-util/tx-exception-doc xt-node tx-id)
            {message :juxt.site/message, ex-data :juxt.site/ex-data} (get-in exception-doc [:juxt.site.xt/ex-data :juxt.site/error])]
        (throw
         (ex-info
          (format "Transaction failed to be committed (tx-id=%d)" tx-id)
          (into {:xtdb.api/tx-id tx-id
                 ;;:juxt.site/request-context ctx
                 :juxt.site/exception-doc exception-doc
                 :ring.response/status 500}
                ;; Surface the transaction error's response suggestions
                (select-keys
                 ex-data
                 [:ring.response/status
                  :ring.response/headers
                  :ring.response/body]))
          (when message
            (ex-info message (or ex-data {})))))))

    (xt/db xt-node tx)))

(defn- prepare-operation
  [{:keys [entities-by-id current-operation-index] :as acc}
   real-subject-uri ;; the subject performing this operation
   {subject-uri :juxt.site/subject-uri,
    operation-uri :juxt.site/operation-uri,
    input :juxt.site/input}
   operation-in-db]

  ;; TODO: Assert that we either have a real-subject-uri
  ;; or (installer) subject-uri but not both. This will alert us to
  ;; cases where there is ambiguity, and allow us to push back hard on
  ;; system subject until it's minimised or got rid of altogether.

  (try
    (update acc :tx-ops concat
            (prepare-tx-op
             (cond-> {:juxt.site/subject-uri (or real-subject-uri subject-uri)
                      :juxt.site/operation-uri operation-uri
                      :juxt.site/operation-index current-operation-index
                      :juxt.site/operation
                      (or (get entities-by-id operation-uri)
                          operation-in-db
                          (throw (ex-info "Failed to find operation!" {:operation-uri operation-uri})))}
               input
               (merge {:juxt.site/received-representation
                       {:juxt.http/content-type "application/edn"
                        :juxt.http/body (.getBytes (pr-str input))}}))))
    (catch Exception e
      (update acc :errors conj
              (ex-info
               (format "Failed to prepare %s" operation-uri)
               {:operation-uri operation-uri
                :operation-index current-operation-index}
               e)))))

(defn bundle->tx-ops
  "Given a sequence of installers, return a collection of XTDB
  transaction operations. The db argument is used to lookup the
  operation which is required when preparing the transaction."
  [subject-uri db {:keys [installers title uri] :as bundle-map}]
  (let [{:keys [tx-ops errors]}
        (->> installers

             ;; If we create an operation and later perform that
             ;; operation in the same bundle, then when we prepare to
             ;; perform the operation, the operation won't exist in
             ;; the database (all the prepares have to be completed in
             ;; batch, before any are transacted). Therefore we adopt
             ;; a strategy of allowing the prepare step to 'see'
             ;; operations that appear in the bundle, prior to
             ;; locating them as usual in the database.
             (reduce
              (fn [{:keys [current-operation-index dependency-list] :as acc}
                  {init-data :juxt.site/init-data
                   dependencies :juxt.site/dependencies
                   uri :juxt.site/uri
                   :as installer}]
                (let [{operation-uri :juxt.site/operation-uri
                       input :juxt.site/input
                       :as init-data}
                      init-data]

                  (when-not input
                    (throw
                     (ex-info
                      (format "No input for installer: %s" (pr-str installer))
                      {:operation-uri operation-uri})))

                  (when (seq dependencies)
                    (doall (map
                            (fn [dep]
                              (or (xt/entity db dep)
                                  ((set dependency-list) dep)
                                  (throw (ex-info (format "Dependency '%s' missing, needed to install '%s'" dep uri)
                                                  {:dependency dep
                                                   :uri uri
                                                   :deplist dependency-list}))))
                            dependencies)))

                  (cond-> acc
                    true (update :dependency-list #(into % (conj dependencies uri)))
                    (:xt/id input) (update :entities-by-id assoc (:xt/id input) input)
                    (not operation-uri) (update :tx-ops conj [:xtdb.api/put input])

                    operation-uri (prepare-operation subject-uri init-data (xt/entity db operation-uri))

                    ;; Increment operation-index
                    current-operation-index (update :current-operation-index inc))))

              {:entities-by-id {}
               :dependency-list #{}
               :current-operation-index 0
               :tx-ops []
               :errors []}))]

    (when (seq errors)
      ;; Completely abort
      (throw
       (ex-info
        (format
         (cond-> "Failed to prepare %d operation"
           (> (count errors) 1) (str "s"))
         (count errors))
        {:errors errors})))

    ;; Return the tx-ops
    (into tx-ops
          ;; Add the bundle
          [[:xtdb.api/put (update (assoc bundle-map :xt/id uri)
                                  :installers
                                  #(mapv :juxt.site/uri %))]
           [:xtdb.api/put {:xt/id (str uri ".json")
                           :juxt.http/content-type "application/json"
                           :juxt.site/variant-of uri
                           :juxt.site/respond
                           {:juxt.site.sci/program
                            (pr-str '(let [content (str (jsonista.core/write-value-as-string *state*) "\r\n")]
                                       (-> *ctx*
                                           (assoc :ring.response/body content)
                                           (update :ring.response/headers assoc "content-length" (str (count (.getBytes content)))))))}
                           :juxt.site/protection-spaces #{"https://auth.example.org/protection-spaces/bearer"}
                           :juxt.site/access-control-allow-origins
                           [[".*" {:juxt.site/access-control-allow-origin "*"
                                   :juxt.site/access-control-allow-methods [:get]
                                   :juxt.site/access-control-allow-headers ["authorization"]}]]}]])))

(defn transact-sci-opts
  [db prepare subject operation resource permissions]
  {:namespaces
   (merge-with
    merge
    {'user
     {'*operation* operation
      '*resource* resource
      '*permissions* permissions
      '*prepare* prepare
      '*subject* subject}

     ;; Allowed to access the database
     'xt
     {'entity (fn [id] (xt/entity db id))
      'q (fn [& args] (apply xt/q db args))}

     'juxt.site
     {'match-identity
      (fn [m]
        (log/infof "Matching identity: %s" m)
        (let [q {:find ['id]
                 :where (into
                         [['id :juxt.site/type "https://meta.juxt.site/types/user-identity"]
                          `(~'or
                            [~'id :juxt.site.jwt.claims/sub ~(:juxt.site.jwt.claims/sub m)]
                            [~'id :juxt.site.jwt.claims/nickname ~(:juxt.site.jwt.claims/nickname m)])])}]
          (log/infof "Query used: %s" (pr-str q))
          (let [result (ffirst (xt/q db q))]
            (log/infof "Result: %s" result)
            result)))

      ;; TODO: Rather than password check in the
      ;; transaction function (requiring the password
      ;; to be stored in the transaction-log), this
      ;; should be moved to the prepare step.
      'match-identity-with-password
      (fn [m password password-hash-key]
        (ffirst
         (xt/q db {:find ['id]
                   :where (into
                           [['id :juxt.site/type "https://meta.juxt.site/types/user-identity"]
                            ['id password-hash-key 'password-hash]
                            ['(crypto.password.bcrypt/check password password-hash)]
                            ]
                           (for [[k v] m] ['id k v]))
                   :in ['password]} password)))

      'lookup-applications
      (fn [client-id] (api/lookup-applications db client-id))

      'lookup-scope
      (fn [scope]
        (let [results (xt/q
                       db
                       '{:find [(pull e [*])]
                         :where [[e :juxt.site/type "https://meta.juxt.site/types/oauth-scope"]]})]

          (if (= 1 (count results))
            (ffirst results)
            (if (seq results)
              (throw
               (ex-info
                (format "Multiple documents for scope: %s" scope)
                {:scope scope
                 :documents (map :xt/id results)}))
              (throw
               (ex-info
                (format "No such scope: %s" scope)
                {:error "invalid_scope"}))))))

      'lookup-authorization-code
      (fn [code]
        (first
         (map first
              (xt/q db '{:find [(pull e [*])]
                         :where [[e :juxt.site/code code]
                                 [e :juxt.site/type "https://meta.juxt.site/types/authorization-code"]]
                         :in [code]}
                    code))))

      'lookup-access-token
      (fn [token]
        (first
         (map first
              (xt/q db '{:find [(pull e [*])]
                         :where [[e :juxt.site/token token]
                                 [e :juxt.site/type "https://meta.juxt.site/types/access-token"]]
                         :in [token]}
                    token))))

      'lookup-refresh-token
      (fn [token]
        (first
         (map first
              (xt/q db '{:find [(pull e [*])]
                         :where [[e :juxt.site/token token]
                                 [e :juxt.site/type "https://meta.juxt.site/types/refresh-token"]]
                         :in [token]}
                    token))))

      ;; TODO: Rename to make it clear this is a JWT
      ;; access token. Other access tokens might be
      ;; possible.
      'make-access-token
      (fn [claims keypair-id]
        (let [keypair (xt/entity db keypair-id)]
          (when-not keypair
            (throw (ex-info (format "Keypair not found: %s" keypair-id) {:keypair-id keypair-id})))
          (try
            (jwt/new-access-token claims keypair)
            (catch Exception cause
              (throw
               (ex-info
                "Failed to make access token"
                {:claims claims
                 :keypair-id keypair-id}
                cause))))))

      'decode-access-token
      (fn [access-token]
        (let [kid (jwt/get-kid access-token)
              _ (when-not kid
                  (throw (ex-info "No key id in access-token, should try all possible keypairs" {})))
              keypair (jwt/lookup-keypair db kid)]
          (when-not keypair
            (throw (ex-info "Keypair not found" {:kid kid})))
          (jwt/verify-jwt access-token keypair)))}

     'grab
     {'parsed-types
      (fn parsed-types [schema-id]
        (map :juxt.grab/type-definition
             (map first
                  (xt/q db '{:find [(pull e [:juxt.grab/type-definition])]
                             :where [[e :juxt.site/type "https://meta.juxt.site/types/graphql-type"]
                                     [e :juxt.site/graphql-schema schema-id]]
                             :in [schema-id]}
                        schema-id))))}}

    (common-sci-namespaces operation))

   :classes
   {'java.util.Date java.util.Date
    'java.time.Instant java.time.Instant
    'java.time.Duration java.time.Duration
    'java.time.temporal.ChronoUnit java.time.temporal.ChronoUnit}

   ;; We can't allow random numbers to be computed as they
   ;; won't be the same on each node. If this is a problem, we
   ;; can replace with a (non-secure) PRNG seeded from the
   ;; tx-instant of the tx. Note that secure random numbers
   ;; should not be generated this way anyway, since then it
   ;; would then be possible to mount an attack based on
   ;; knowledge of the current time. Instead, secure random
   ;; numbers should be generated in the operation's 'prepare'
   ;; step.
   :deny `[loop recur rand rand-int]})

(defn do-operation-in-tx-fn
  "This function is applied within a transaction function. It should be
  fast, but at least doesn't have to worry about the database being
  stale!"
  [xt-ctx
   {subject-uri :juxt.site/subject-uri
    subject :juxt.site/subject
    operation-index :juxt.site/operation-index
    operation-uri :juxt.site/operation-uri
    resource-uri :juxt.site/resource-uri
    purpose :juxt.site/purpose
    scope :juxt.site/scope
    prepare :juxt.site/prepare}]
  (let [db (xt/db xt-ctx)
        tx (xt/indexing-tx xt-ctx)
        _ (assert operation-uri)
        operation (xt/entity db operation-uri)
        resource (xt/entity db resource-uri)

        _ (when-not operation
            (throw
             (ex-info
              (format "Operation '%s' not found in db" operation-uri)
              {:operation-uri operation-uri})))

        permissions
        (check-permissions
         {:juxt.site/db db
          :juxt.site/subject-uri subject-uri
          :juxt.site/operation-uri operation-uri
          :juxt.site/resource-uri resource-uri
          :juxt.site/scope scope
          :juxt.site/purpose purpose})]

    (try
      (assert (or (nil? subject-uri) (string? subject-uri)) "Subject to do-operation-in-tx-fn expected to be a string, or null")
      (assert (or (nil? resource-uri) (string? resource-uri)) "Resource to do-operation-in-tx-fn expected to be a string, or null")

      ;; Check that we /can/ call the operation
      (let [
            fx
            (cond
              ;; Official: SCI
              (-> operation :juxt.site/transact :juxt.site.sci/program)
              (try
                (sci/eval-string
                 (-> operation :juxt.site/transact :juxt.site.sci/program)
                 (transact-sci-opts db prepare subject operation resource permissions))

                (catch clojure.lang.ExceptionInfo e
                  ;; The sci.impl/callstack contains a volatile which isn't freezable.
                  ;; Also, we want to unwrap the original cause exception.
                  ;; Possibly, in future, we should get the callstack
                  (throw (or (.getCause e) e))))

              ;; There might be other strategies in the future (although the
              ;; fewer the better really)
              :else
              (throw
               (ex-info
                "Submitted operations should have a valid juxt.site/transact entry"
                {:operation operation})))

            _ (log/debugf "FX are %s" (with-out-str (pprint fx)))

            ;; Validate
            _ (doseq [effect fx]
                (when-not (and (vector? effect)
                               (keyword? (first effect))
                               (if (= :xtdb.api/put (first effect))
                                 (map? (second effect))
                                 true))
                  (throw (ex-info (format "Invalid effect: %s" effect) {:juxt.site/operation operation :effect effect}))))

            xtdb-ops (filter (fn [[effect]] (= (namespace effect) "xtdb.api")) fx)

            ;; Decisions we've made which don't update the database but should
            ;; be record and reflected in the response.
            other-response-fx
            (remove
             (fn [[kw]]
               (or
                (= (namespace kw) "xtdb.api")
                (= kw :juxt.site/apply-to-request-context)))
             fx)

            result-fx
            (conj
             xtdb-ops
             ;; Add an operation log entry for this transaction
             [:xtdb.api/put
              (into
               (cond-> {:xt/id (cond-> (str (:juxt.site/events-base-uri operation) (:xtdb.api/tx-id tx))
                                 operation-index (str "/" operation-index))
                        :juxt.site/type "https://meta.juxt.site/types/event"
                        :xtdb.api/tx-id (:xtdb.api/tx-id tx)
                        :juxt.site/subject-uri subject-uri
                        :juxt.site/operation-uri operation-uri
                        :juxt.site/purpose purpose
                        :juxt.site/puts
                        (vec
                         (keep
                          (fn [[tx-op {id :xt/id}]]
                            (when (= tx-op :xtdb.api/put) id))
                          xtdb-ops))
                        :juxt.site/deletes
                        (vec
                         (keep
                          (fn [[tx-op {id :xt/id}]]
                            (when (= tx-op :xtdb.api/delete) id))
                          xtdb-ops))}

                 operation-index (assoc :juxt.site/tx-event-index operation-index)

                 tx (into tx)

                 ;; It is useful to denormalise and see the explicit
                 ;; user or application in the event.
                 true (into (select-keys subject [:juxt.site/user :juxt.site/application]))

                 (seq other-response-fx)
                 (assoc :juxt.site/response-fx other-response-fx)))])]

        result-fx)

      (catch Throwable e
        (let [create-error-structure
              (fn create-error-structure [error]
                (let [cause (.getCause error)]
                  (cond-> {:juxt.site/message (.getMessage error)
                           :juxt.site/ex-data
                           (-> (ex-data error)
                               ;; Otherwise we might get 'Unfreezable
                               ;; type: class clojure.lang.Volatile'
                               (dissoc :sci.impl/callstack))}
                    cause (assoc :juxt.site/cause (create-error-structure cause)))))]
          (throw
           (ex-info
            "Error during transaction"
            {:juxt.site/subject-uri subject-uri
             :juxt.site/operation-uri operation-uri
             :juxt.site/error (create-error-structure e)}
            e)))))))

(defn apply-response-fx [ctx fx]
  (reduce
   (fn [ctx [op & args]]
     (case op
       :ring.response/status (assoc ctx :ring.response/status (first args))
       :ring.response/headers (update ctx :ring.response/headers (fnil into {}) (first args))
       :ring.response/body (assoc ctx :ring.response/body (first args))
       (throw
        (ex-info
         (format "Op not recognized: %s" op)
         {:op op :args args}))))
   ctx fx))

(defn perform-ops!
  "With a context containing at least an xt-node, and a sequence of
  successive operation contexts, perform the operations and return the
  the context modified with any fx produced by the operations. The
  context will also contain a modified database under :juxt.site/db."
  [{xt-node :juxt.site/xt-node, :as ctx} invocations]
  (let [tx-ops (mapcat prepare-tx-op invocations)
        new-db (apply-ops! xt-node tx-ops)
        ;; Modify context with new db
        ctx (assoc ctx :juxt.site/db new-db)
        ;; We pull out an event-doc for each performed operation
        event-docs (xt-util/tx-event-docs
                    xt-node
                    (get-in (xt/db-basis new-db) [:xtdb.api/tx :xtdb.api/tx-id]))
        ;; We take the last of these event docs, but should we check
        ;; that any preceeding events do not contain any
        ;; response-fx? (TODO)
        result (last event-docs)]

    (cond-> ctx
      (seq (:juxt.site/response-fx result))
      (apply-response-fx (:juxt.site/response-fx result))

      ;; Just for info
      result (assoc :juxt.site/operation-result result))))


;; TODO: Since it is possible that a permission is in the queue which might
;; grant or revoke an operation, it is necessary to run this check 'head-of-line'
;; and submit a transaction function. This will avoid any non-determinism caused
;; by a race-condition and retain proper serialization of transactions.
;;
;; For a fuller discussion on determinism and its benefits, see
;; https://www.cs.umd.edu/~abadi/papers/abadi-cacm2018.pdf
;;
;; Update (2023-08-01): We don't yet know whether we're updating the
;; database, or just reporting on the current (possibly stale) db of
;; the request. Therefore we can do this check now, to let the request
;; through, in case we won't be transacting.
(defn wrap-authorize-with-operation [h]
  (fn [{db :juxt.site/db,
        resource :juxt.site/resource,
        uri :juxt.site/uri,
        subject :juxt.site/subject,
        scope :juxt.site/scope,
        subject-is-ephemeral? :juxt.site/subject-is-ephemeral?,
        method :ring.request/method,
        :as req}]

    (assert (or (nil? subject) (map? subject)))
    (assert (or (nil? resource) (map? resource)))

    (let [db (cond-> db
               subject-is-ephemeral?
               (xt/with-tx [[:xtdb.api/put subject]]))

          method (if (= method :head) :get method)
          operation-uri (get-in resource [:juxt.site/methods method :juxt.site/operation])

          operation (when operation-uri
                      (xt/entity db operation-uri))
          _ (when (and operation-uri (nil? operation))
              (when (not= method :options)
                (throw
                 (ex-info
                  (format "No such operation: %s" operation-uri)
                  {:juxt.site/request-context req
                   :missing-operation operation-uri
                   :resource resource
                   :method method}))))

          permissions
          (when operation-uri
            (try
              (check-permissions
               (cond-> {:juxt.site/db db
                        :juxt.site/operation-uri operation-uri}
                 ;; When the resource is in the database, we can add it to the
                 ;; permission checking in case there's a specific permission for
                 ;; this resource.
                 subject (assoc :juxt.site/subject-uri (:xt/id subject))
                 resource (assoc :juxt.site/resource-uri (:xt/id resource))
                 scope (assoc :juxt.site/scope scope)))
              (catch clojure.lang.ExceptionInfo e
                (if (= :no-permission (::type (ex-data e)))
                  ;; This isn't a great solution. We ideally want
                  ;; to be able to call check-permissions without
                  ;; it throwing an exception. But in many cases,
                  ;; the caller wants the exception to log the
                  ;; permissions query.
                  []
                  ;; Else rethrow
                  (throw e)))))]

      (cond
        (seq permissions)
        (h (assoc req
                  :juxt.site/operation-uri operation-uri
                  :juxt.site/operation operation
                  :juxt.site/permissions permissions))

        (= method :options) (h req)

        (and (nil? operation) (not :juxt.site.admin-server/admin-server))
        (throw (ex-info "No operation" (select-keys req [:juxt.site/uri])))

        subject
        (throw
         (ex-info
          (format "No permission for this operation (%s) with subject (%s) and scope (%s)"
                  operation-uri (:xt/id subject) scope)
          {:ring.response/status 403
           :ring.response/headers {"access-control-allow-origin" "*"}
           :operation-uri operation-uri
           :subject subject
           :scope scope
           :juxt.site/request-context req}))

        ;; We are in a protection space, so this is HTTP Authentication (401
        ;; + WWW-Authenticate header)
        (:juxt.site/protection-spaces resource)
        (let [protection-spaces (:juxt.site/protection-spaces resource)]
          (throw
           (ex-info
            (format "No anonymous permission for operation (try authenticating!): %s" (pr-str operation))
            {:ring.response/status 401
             :ring.response/headers
             {"www-authenticate" (http-authn/www-authenticate-header db protection-spaces)
              "access-control-allow-origin" "*"}
             :juxt.site/request-context req})))

        (:juxt.site/session-scope req)
        ;; We are inside a session-scope. Therefore, we can
        ;; respond with a redirect to a page that will establish (immediately
        ;; or eventually), the cookie.
        (let [session-scope (:juxt.site/session-scope req)
              login-uri (:juxt.site/login-uri session-scope)
              redirect (str
                        login-uri
                        "?return-to="
                        (codec/url-encode
                         (cond-> uri
                           (not (str/blank? (:ring.request/query req)))
                           (str "?" (:ring.request/query req)))))]
          ;; If we are in a session-scope that contains a login-uri, let's redirect to that
          ;;                (def req req)
          (throw
           (ex-info
            (format "No anonymous permission for operation (try logging in!): %s" (pr-str operation))
            {:ring.response/status 302
             :ring.response/headers {"location" redirect}
             :juxt.site/request-context req})))

        operation

        ;; We are outside a protection space, there is nothing we can do
        ;; except return a 403 status.

        ;; We MUST NOT return a 401 UNLESS we can
        ;; set a WWW-Authenticate header (which we can't, as there is no
        ;; protection space). 403 is the only option afforded by RFC 7231: "If
        ;; authentication credentials were provided in the request ... the
        ;; client MAY repeat the request with new or different credentials. "
        ;; -- Section 6.5.3, RFC 7231
        (throw
         (ex-info
          (format "No anonymous permission for operation: %s" (pr-str operation))
          {:ring.response/status 403
           :ring.response/headers {"access-control-allow-origin" "*"}
           :juxt.site/request-context req}))

        :else
        ;; There is no operation to protect
        (h req)))))

(comment
  (sci/eval-string
   "(+ (clojure.core/rand) 10)"
   {:namespaces {'clojure.core {'rand (constantly 0.5)}}
    ;;:deny '[+]
    }
   ))
