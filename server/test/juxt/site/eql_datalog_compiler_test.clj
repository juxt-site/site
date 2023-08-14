;; Copyright © 2022, JUXT LTD.

(ns juxt.site.eql-datalog-compiler-test
  (:require
   [clojure.java.io :as io]
   [clojure.test :refer [deftest is testing use-fixtures] :as t]
   [clojure.tools.logging :as log]
   [edn-query-language.core :as eql]
   [jsonista.core :as json]
   [juxt.grab.alpha.document :as grab.document]
   [juxt.grab.alpha.parser :as grab.parser]
   [juxt.grab.alpha.schema :as grab.schema]
   [juxt.site.eql-datalog-compiler :as eqlc]
   [juxt.site.graphql-eql-compiler :refer [graphql->eql-ast]]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.test-helpers.handler :refer [*handler* handler-fixture]]
   [juxt.site.test-helpers.install :refer [perform-operation!]]
   [juxt.site.test-helpers.local-files-util :refer [install-bundles!]]
   [juxt.site.test-helpers.oauth :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* system-xt-fixture]]
   [ring.util.codec :as codec]
   [xtdb.api :as xt]))

(def AUTH_SERVER
  {"https://auth.example.org" "https://auth.hospital.com"})

(def RESOURCE_SERVER
  {"https://auth.example.org" "https://auth.hospital.com"
   "https://data.example.org" "https://hospital.com"})

(defn login-with-form!
  "Return a session id (or nil) given a map of fields."
  [username password]
  (let [form (codec/form-encode {"username" username "password" password})
        body (.getBytes form)
        req {:juxt.site/uri "https://auth.hospital.com/login-with-form"
             :ring.request/method :post
             :ring.request/headers
             {"content-length" (str (count body))
              "content-type" "application/x-www-form-urlencoded"}
             :ring.request/body (io/input-stream body)}
        response (*handler* req)
        {:strs [set-cookie]} (:ring.response/headers response)
        [_ token] (when set-cookie (re-matches #"[a-z]+=(.*?);.*" set-cookie))]
    (when-not token
      (throw
       (ex-info
        (format "Login failed: %s" (String. (:ring.response/body response)))
        {:username username
         :response response})))
    token))

(defn install-hospital! []
  (install-bundles!
   ["juxt/site/bootstrap"
    ["juxt/site/keypair" {"kid" "test-kid"}]
    "juxt/site/user-model"
    "juxt/site/password-based-user-identity"
    "juxt/site/sessions"
    ["juxt/site/oauth-authorization-endpoint"
     {"session-scope" "https://auth.hospital.com/session-scopes/form-login-session"
      "authorization-code-length" 12
      "jti-length" 12}]
    "juxt/site/oauth-token-endpoint"]
   RESOURCE_SERVER)

  ;; TODO: Create a bundle for this
  (perform-operation!
   *xt-node*
   {:juxt.site/subject-uri "https://auth.hospital.com/_site/subjects/system"
    :juxt.site/operation-uri "https://auth.hospital.com/operations/oauth/register-application"
    :juxt.site/input {:juxt.site/client-id "local-terminal"
                      :juxt.site/client-type "confidential"
                      :juxt.site/resource-server "https://hospital.com"
                      :juxt.site/redirect-uris ["https://test-app.example.test/callback"]}})

  (install-bundles!
   ["juxt/site/example-users"
    "juxt/site/login-form"
    "juxt/site/protection-spaces"
    "juxt/site/hospital-demo"]
   RESOURCE_SERVER))

(defn with-hospital [f]
  (install-hospital!)
  (f))

(use-fixtures :each system-xt-fixture handler-fixture with-hospital)

(deftest eql-with-acl-test
  ;; Create some measurements
  (perform-operation!
   *xt-node*
   {:juxt.site/subject-uri "https://auth.hospital.com/_site/subjects/system"
    :juxt.site/operation-uri "https://hospital.com/hospital-demo/_site/operations/register-patient-measurement"
    :juxt.site/input {:xt/id "https://hospital.com/hospital-demo/measurements/5d1cfb88-cafd-4241-8c7c-6719a9451f1e"
                      :patient "https://hospital.com/hospital-demo/patients/004"
                      :reading {"heartRate" "120"
                                "bloodPressure" "137/80"}}})

  (perform-operation!
   *xt-node*
   {:juxt.site/subject-uri "https://auth.hospital.com/_site/subjects/system"
    :juxt.site/operation-uri "https://hospital.com/hospital-demo/_site/operations/register-patient-measurement"
    :juxt.site/input {:xt/id "https://hospital.com/hospital-demo/measurements/5d1cfb88-cafd-4241-8c7c-6719a9451f1e"
                      :patient "https://hospital.com/hospital-demo/patients/006"
                      :reading {"heartRate" "82"
                                "bloodPressure" "198/160"}}})

  (perform-operation!
   *xt-node*
   {:juxt.site/subject-uri "https://auth.hospital.com/_site/subjects/system"
    :juxt.site/operation-uri "https://hospital.com/hospital-demo/_site/operations/register-patient-measurement"
    :juxt.site/input {:xt/id "https://hospital.com/hospital-demo/measurements/eeda3b49-2e96-42fc-9e6a-e89e2eb68c24"
                      :patient "https://hospital.com/hospital-demo/patients/010"
                      :reading {"heartRate" "85"
                                "bloodPressure" "120/80"}}})

  (perform-operation!
   *xt-node*
   {:juxt.site/subject-uri "https://auth.hospital.com/_site/subjects/system"
    :juxt.site/operation-uri "https://hospital.com/hospital-demo/_site/operations/register-patient-measurement"
    :juxt.site/input {:xt/id "https://hospital.com/hospital-demo/measurements/5d1cfb88-cafd-4241-8c7c-6719a9451f1d"
                      :patient "https://hospital.com/hospital-demo/patients/010"
                      :reading {"heartRate" "87"
                                "bloodPressure" "127/80"}}})

  (let [alice-session-token
        (login-with-form! "alice" "garden")

        {alice-access-token "access_token" error "error"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :authorization-uri "https://auth.hospital.com/oauth/authorize"
          :client "https://auth.hospital.com/applications/local-terminal"
          :session-token alice-session-token
          ;; "scope" ["https://example.org/oauth/scope/read-personal-data"]
          })
        _ (is (nil? error) (format "OAuth2 grant error: %s" error))

        bob-session-token
        (login-with-form! "bob" "walrus")
        {bob-access-token "access_token"
         error "error"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :authorization-uri "https://auth.hospital.com/oauth/authorize"
          :client "https://auth.hospital.com/applications/local-terminal"
          :session-token bob-session-token
          ;;"scope" ["https://example.org/oauth/scope/read-personal-data"]
          }
         )
        _ (is (nil? error) (format "OAuth2 grant error: %s" error))]

    ;; Add a /patient/XXX resource to serve an individual patient.

    ;; https://hospital.com/hospital-demo/_site/operations/get-patient must perform an XT query.

    ;; In the future, it would be good if the http request can include a
    ;; header indicating the minimum required version in order to provide
    ;; read-your-own-writes consistency. Perhaps use standard http
    ;; conditional request headers for this.

    ;; The GET pathway skips the tx-fn (in the non-serializable case),
    ;; proceeding directly to calling add-payload.

    ;; Note: it would be useful to research whether a Flip database query
    ;; could be automatically limited by the operations in scope. This would
    ;; make it safer to allow people to add their own Flip quotations.

    ;; Here we have the conundrum: when the
    ;; https://example.org/hospital-demo/_site/operations/get-patient operation rule has the clause
    ;; '[resource :juxt.site/type
    ;; "https://example.org/types/patient"]' then it is not a permitted
    ;; operation. We must separate the operations that allow access to a
    ;; uri-template'd resource and the operations that create the body
    ;; payload.

    ;; Alice can access a particular patient because she has a particularly
    ;; broad permission on the get-patient operation

    (testing "Access to /hospital/patient/005"
      (let [response
            (*handler*
             {:ring.request/method :get
              :juxt.site/uri "https://hospital.com/hospital-demo/patients/005"
              :ring.request/headers
              {"authorization" (format "Bearer %s" alice-access-token)
               "accept" "application/json"}})]

        (is (= (json/write-value-as-string {"name" "Angie Solis"} (json/object-mapper {:pretty true}))
               (String. (:ring.response/body response))))
        (is (= 200 (:ring.response/status response))))

      ;; Bob can't see the patient details of Angie Solis
      (let [response (*handler*
                      {:ring.request/method :get
                       :juxt.site/uri "https://hospital.com/hospital-demo/patients/005"
                       :ring.request/headers
                       {"authorization" (format "Bearer %s" bob-access-token)
                        "accept" "application/json"}})]
        (is (= 403 (:ring.response/status response)))))

    (testing "List patients with /patients/"

      ;; Alice sees all 20 patients
      (let [response
            (*handler*
             {:ring.request/method :get
              :juxt.site/uri "https://hospital.com/hospital-demo/patients/"
              :ring.request/headers
              {"authorization" (format "Bearer %s" alice-access-token)
               "accept" "application/json"}})
            body (:ring.response/body response)
            result (some-> body json/read-value)]
        (is (= "application/json" (get-in response [:ring.response/headers "content-type"])))
        (is body)
        (is result)
        (is (vector? result))
        (is (= 20 (count result))))

      ;; Bob sees just 3 patients
      (let [response
            (*handler*
             {:ring.request/method :get
              :juxt.site/uri "https://hospital.com/hospital-demo/patients/"
              :ring.request/headers
              {"authorization" (format "Bearer %s" bob-access-token)
               "accept" "application/json"}})
            body (:ring.response/body response)
            result (json/read-value body)]
        (is (= "application/json" (get-in response [:ring.response/headers "content-type"])))
        (is (vector? result))
        (is (= 3 (count result)))))

    ;; We are calling juxt.site.operations/pull-allowed-resources which
    ;; provides our query, but we want to experiment with creating our own
    ;; query with sub-queries, which we can compile to with GraphQL.

    ;; Now we have a get-patient with rules that we can bring into a sub-query

    ;; Let's start with an EQL that represents our query.
    ;; Metadata attributed to the EQL contains operations.
    ;; The EQL could be the target of the compilation of a GraphQL query.

    (let [db (xt/db *xt-node*)
          extract-subject-with-token
          (fn [token]
            (:juxt.site/subject
             (ffirst
              (xt/q db '{:find [(pull e [*])]
                         :where [[e :juxt.site/token token]]
                         :in [token]} token))))
          alice (extract-subject-with-token alice-access-token)
          bob (extract-subject-with-token bob-access-token)]

      ;; Here are some EQL examples. These are easy to construct
      ;; manually or target with a compiler, for example, for the
      ;; production of GraphQL, XML or CSV.

      ;; The operations are associated with EQL properties using
      ;; metadata.

      ;; Operations are where 'Form' is defined. Or, more precisely,
      ;; operations are where 'Form' and 'Code' meet.

      ;; An operation defines the mapping from the Data to the Form (a
      ;; view of the data that best suits a given domain or
      ;; application context).

      ;; Additionally, operations define access controls that restrict
      ;; who can see what.

      ;; The data processing activities of a system are entirely
      ;; expressable in terms of operations.

      (testing "Graph query with two-levels of results"
        (let [q1 (first
                  ;; ^ The compilation process allows multiple queries to be
                  ;; specified in the EQL specification, each may be run in
                  ;; parallel. For now, we just run the first query.
                  (eqlc/compile-ast
                   db
                   (eql/query->ast
                    '[
                      {(:patients {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/get-patient"})
                       [:xt/id
                        :name
                        :juxt.site/type
                        {(:measurements {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/read-any-measurement"})
                         [:reading]}]}])))]

          (testing "Alice's view"
            (is (= #{{:name "Terry Levine"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/001"
                      :measurements nil}
                     {:name "Moshe Lynch"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/015"
                      :measurements nil}
                     {:name "Hazel Huynh"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/013"
                      :measurements nil}
                     {:name "Valarie Campos"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/019"
                      :measurements nil}
                     {:name "Lila Dickson"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/004"
                      :measurements nil}
                     {:name "Floyd Castro"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/006"
                      :measurements
                      [{:reading {"bloodPressure" "198/160" "heartRate" "82"}}]}
                     {:name "Jeannie Finley"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/002"
                      :measurements nil}
                     {:name "Beulah Leonard"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/008"
                      :measurements nil}
                     {:name "Francesco Casey"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/014"
                      :measurements nil}
                     {:name "Angie Solis"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/005"
                      :measurements nil}
                     {:name "Jewel Blackburn"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/003"
                      :measurements nil}
                     {:name "Sondra Richardson"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/010"
                      :measurements
                      [{:reading {"bloodPressure" "127/80" "heartRate" "87"}}
                       {:reading {"bloodPressure" "120/80" "heartRate" "85"}}]}
                     {:name "Monica Russell"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/009"
                      :measurements nil}
                     {:name "Rudy King"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/018"
                      :measurements nil}
                     {:name "Mark Richard"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/012"
                      :measurements nil}
                     {:name "Blanca Lindsey"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/017"
                      :measurements nil}
                     {:name "Elisabeth Riddle"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/020"
                      :measurements nil}
                     {:name "Melanie Black"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/007"
                      :measurements nil}
                     {:name "Kim Robles"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/011"
                      :measurements nil}
                     {:name "Darrel Schwartz"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/016"
                      :measurements nil}}
                   (eqlc/prune-result (xt/q db q1 alice nil)))))

          (testing "Bob's view"
            (is (= #{{:name "Lila Dickson"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/004"
                      :measurements nil}
                     {:name "Sondra Richardson"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/010"
                      :measurements
                      [{:reading {"bloodPressure" "127/80" "heartRate" "87"}}
                       {:reading {"bloodPressure" "120/80" "heartRate" "85"}}]}
                     {:name "Monica Russell"
                      :juxt.site/type "https://hospital.com/types/patient"
                      :xt/id "https://hospital.com/hospital-demo/patients/009"
                      :measurements nil}}
                   (eqlc/prune-result (xt/q db q1 bob nil)))))))

      (testing "Graph query with 3 levels of nesting"
        (let [q1 (first
                  (eqlc/compile-ast
                   db
                   (eql/query->ast
                    '[{(:doctors {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/get-doctor"})
                       [:xt/id
                        :name
                        :juxt.site/type
                        {(:patients {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/get-patient"})
                         [:xt/id
                          :name
                          :juxt.site/type
                          {(:readings {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/read-any-measurement"})
                           [:reading]}]}]}])))]

          (testing "Alice's view"
            (is (= #{{:name "Dr. Jack Conway"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/001"
                      :patients
                      [{:name "Terry Levine"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/001"
                        :readings nil}
                       {:name "Jeannie Finley"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/002"
                        :readings nil}
                       {:name "Jewel Blackburn"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/003"
                        :readings nil}
                       {:name "Angie Solis"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/005"
                        :readings nil}]}
                     {:name "Dr. Murillo"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/002"
                      :patients
                      [{:name "Lila Dickson"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/004"
                        :readings nil}
                       {:name "Angie Solis"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/005"
                        :readings nil}]}
                     {:name "Dr. Jackson"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/003"
                      :patients
                      [{:name "Floyd Castro"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/006"
                        :readings
                        [{:reading {"bloodPressure" "198/160" "heartRate" "82"}}]}
                       {:name "Sondra Richardson"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/010"
                        :readings
                        [{:reading {"bloodPressure" "127/80" "heartRate" "87"}}
                         {:reading {"bloodPressure" "120/80" "heartRate" "85"}}]}]}
                     {:name "Dr. Kim"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/004"
                      :patients nil}}
                   (eqlc/prune-result (xt/q db q1 alice nil)))))

          (testing "Bob's view"
            (is (= #{{:name "Dr. Jack Conway"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/001"
                      :patients nil}
                     {:name "Dr. Murillo"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/002"
                      :patients
                      [{:name "Lila Dickson"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/004"
                        :readings nil}]}
                     {:name "Dr. Jackson"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/003"
                      :patients
                      [{:name "Sondra Richardson"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/010"
                        :readings
                        [{:reading {"bloodPressure" "127/80" "heartRate" "87"}}
                         {:reading {"bloodPressure" "120/80" "heartRate" "85"}}]}]}
                     {:name "Dr. Kim"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/004"
                      :patients nil}}
                   (eqlc/prune-result (xt/q db q1 bob nil)))))))

      (testing "Graph query with parameters"
        ;; Get a particular doctor, by a simple search term.
        ;; Uses EQL parameters for this.
        (let [q1 (first
                  (eqlc/compile-ast
                   db
                   (eql/query->ast
                    '[{(:doctor {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/get-doctor"
                                 :search "jack"})
                       [:xt/id
                        :name
                        :juxt.site/type
                        {(:patients {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/get-patient"})
                         [:xt/id
                          :name
                          :juxt.site/type
                          {(:readings {:juxt.site/operation "https://hospital.com/hospital-demo/_site/operations/read-any-measurement"})
                           [:reading]}]}]}])))]

          (testing "Alice's view"
            (is (= #{{:name "Dr. Jack Conway"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/001"
                      :patients
                      [{:name "Terry Levine"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/001"
                        :readings nil}
                       {:name "Jeannie Finley"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/002"
                        :readings nil}
                       {:name "Jewel Blackburn"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/003"
                        :readings nil}
                       {:name "Angie Solis"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/005"
                        :readings nil}]}
                     {:name "Dr. Jackson"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/003"
                      :patients
                      [{:name "Floyd Castro"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/006"
                        :readings
                        [{:reading {"bloodPressure" "198/160" "heartRate" "82"}}]}
                       {:name "Sondra Richardson"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/010"
                        :readings
                        [{:reading {"bloodPressure" "127/80" "heartRate" "87"}}
                         {:reading {"bloodPressure" "120/80" "heartRate" "85"}}]}]}}
                   (eqlc/prune-result (xt/q db q1 alice nil)))))

          (testing "Bob's view"
            (is (= #{{:name "Dr. Jack Conway"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/001"
                      :patients nil}
                     {:name "Dr. Jackson"
                      :juxt.site/type "https://hospital.com/types/doctor"
                      :xt/id "https://hospital.com/hospital-demo/doctors/003"
                      :patients
                      [{:name "Sondra Richardson"
                        :juxt.site/type "https://hospital.com/types/patient"
                        :xt/id "https://hospital.com/hospital-demo/patients/010"
                        :readings
                        [{:reading {"bloodPressure" "127/80" "heartRate" "87"}}
                         {:reading {"bloodPressure" "120/80" "heartRate" "85"}}]}]}}
                   (eqlc/prune-result (xt/q db q1 bob nil))))))))

    ;; Modelling ideas

    ;; Doctor's have patients, patients have an assigned doctor.
    ;; A measurement must be taken by a doctor or other individual.
    ;; From the doctor, you can see patients.
    ;; A patient should be able to see their own medical file.

    #_(repl/e "https://hospital.com/hospital-demo/patients/014")

    ;; See NHS National role-based access control (RBAC) for developers
    ;; "The database consists of:
    ;; Job Roles (‘R’ codes) - the set of roles that can be assigned to users, for example Clinical Practitioner (R8000)
    ;; Activities (‘B’ codes) - the set of activities that users can perform, for
    ;;  example Amend Patient Demographics (B0825)"
    ;; -- https://digital.nhs.uk/developer/guides-and-documentation/security-and-authorisation/national-rbac-for-developers

    ;; https://digital.nhs.uk/developer/api-catalogue/spine-directory-service-fhir

    ;; Additional scenarios:

    ;; Alice, Bob, Carlos - multiple joins, 3-level queries, multiple concurrent operations

    ;; The challenge is to combine the following:

    ;; 1. GraphQL schemas where fields in queries reference operations. For example:
    ;;
    ;; type Hospital { patients: [String] @site(operation: https://hospital.com/hospital-demo/_site/operations/list-patients) }
    ;;
    ;; type Doctor { patients: [String] @site(operation: https://hospital.com/hospital-demo/_site/operations/list-patients-by-doctor) }

    ;; Should https://hospital.com/hospital-demo/_site/operations/list-patients-by-doctor exist
    ;; independently or instead be a reference to
    ;; https://hospital.com/hospital-demo/_site/operations/list-patients with a join key? The former
    ;; is overly cumbersome and would require a lot of extra operations and
    ;; associated admin costs. (DONE: we have gone with the notion of an operation being called in the context of another)

    ;; type Doctor {
    ;;   id ID
    ;;   patients(gender: String, costBasis: String): [Patient] @site(operation: "https://hospital.com/hospital-demo/_site/operations/list-patients" join: "primary-doctor")
    ;; }

    ;; The `patients` field transforms to a sub-query.

    ;; This sub-query is composed using the rules of list-patients.

    ;; Additional clauses are added that correspond to the arguments, with
    ;; optional arg->attribute mappings specified in (GraphQL) field
    ;; directive.

    ;; The 'join' key becomes an implicit argument. By default, the 'id' of
    ;; the doctor is passed as the argument value.

    ;; But, for many models, there is a xref relation. A patient's
    ;; relationship to a doctor is governed by a dedicated 'assignment'
    ;; document. This way, it is straight-forward to remove this assignment,
    ;; inspect a history of assignments, and to add further metadata about
    ;; the assignment.

    ;; The 'form' of the GraphQL should not expose this xref relation
    ;; directly, but use it to generate a mapping between patients and
    ;; doctors.

    ;; Where should the metadata for this xref relation be provided? For
    ;; example, if the assignment document has a type (and it certainly
    ;; should), where should this type be specificed? If it's directly in
    ;; the GraphQL SDL, then a) it both complicates and exposes the GraphQL
    ;; SDL to structural details and b) needs to be repeated for other
    ;; access protocols, like REST.

    ;; Therefore, it makes sense that the operations themselves understand how
    ;; to navigate these relationships. Operations can be both shared between
    ;; applications while still allowing applications to demand bespoke
    ;; operations where necessary.

    ;; Therefore it seems that operations are the 'form' documents.

    ;; Let's take the list-patients operation. In the context of a doctor, it
    ;; needs to know how to join on the doctor id. The 'parent context',
    ;; whether it be a hosital, doctor or other type, is extremely common
    ;; (since data is often emitted as DAGs). Therefore each operation should
    ;; be aware of the context in which it runs.

    ;; 2. Operations that have 'query' logic. Should that query logic be Flip?
    ;; Or reference other operations? To what extent is 'list-patients = fmap
    ;; get-patient' - is this a common case? Looks like we may need a
    ;; 'calculus' for defining operations in terms of other more fundamental
    ;; operations. Note: I think we're just seeing that get-patient and
    ;; list-patient *share* the same rules. There is no reason rules can't
    ;; be deduped via reference to independent documents, or even one to the
    ;; other:

    ;; {:xt/id "list-patients" :juxt.site/rules "get-patient"}
    ))

(deftest graphql-test

  (let [alice-session-token (login-with-form! "alice" "garden")
        {alice-access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :authorization-uri "https://auth.hospital.com/oauth/authorize"
          :client "https://auth.hospital.com/applications/local-terminal"
          :session-token alice-session-token
          ;; "scope" ["https://example.org/oauth/scope/read-personal-data"]
          })

        bob-session-token (login-with-form! "bob" "walrus")
        {bob-access-token "access_token"}
        (oauth/acquire-access-token!
         {:grant-type "implicit"
          :authorization-uri "https://auth.hospital.com/oauth/authorize"
          :client "https://auth.hospital.com/applications/local-terminal"
          :session-token bob-session-token
          ;;"scope" ["https://example.org/oauth/scope/read-personal-data"]
          }
         )

        db (xt/db *xt-node*)

        ;; This is just a function to extract the subjects from the
        ;; database.  These subjects are then used below to test directly
        ;; against the database, rather than going via Ring .
        extract-subject-with-token
        (fn [token]
          (:juxt.site/subject
           (ffirst
            (xt/q db '{:find [(pull e [*])]
                       :where [[e :juxt.site/token token]]
                       :in [token]} token))))
        alice (extract-subject-with-token alice-access-token)
        bob (extract-subject-with-token bob-access-token)

        schema
        (-> "juxt/site/schema.graphql"
            io/resource
            slurp
            grab.parser/parse
            grab.schema/compile-schema)

        eql-ast
        (graphql->eql-ast
         schema
         (-> "query GetDoctors { doctors(search: \"jack\") { id _type name patients { id _type name readings { id _type } } } }"
             grab.parser/parse
             (grab.document/compile-document schema)
             (grab.document/get-operation "GetDoctors")))

        q (first (eqlc/compile-ast db eql-ast))

        ]

    (testing "From GraphQL to database results"
      (testing "Alice's view"
        (is (= #{{:name "Dr. Jack Conway",
                  :juxt.site/type "https://hospital.com/types/doctor",
                  :xt/id "https://hospital.com/hospital-demo/doctors/001",
                  :patients
                  [{:name "Terry Levine",
                    :juxt.site/type "https://hospital.com/types/patient",
                    :xt/id "https://hospital.com/hospital-demo/patients/001",
                    :readings nil}
                   {:name "Jeannie Finley",
                    :juxt.site/type "https://hospital.com/types/patient",
                    :xt/id "https://hospital.com/hospital-demo/patients/002",
                    :readings nil}
                   {:name "Jewel Blackburn",
                    :juxt.site/type "https://hospital.com/types/patient",
                    :xt/id "https://hospital.com/hospital-demo/patients/003",
                    :readings nil}
                   {:name "Angie Solis",
                    :juxt.site/type "https://hospital.com/types/patient",
                    :xt/id "https://hospital.com/hospital-demo/patients/005",
                    :readings nil}]}
                 {:name "Dr. Jackson",
                  :juxt.site/type "https://hospital.com/types/doctor",
                  :xt/id "https://hospital.com/hospital-demo/doctors/003",
                  :patients
                  [{:name "Floyd Castro",
                    :juxt.site/type "https://hospital.com/types/patient",
                    :xt/id "https://hospital.com/hospital-demo/patients/006",
                    :readings nil}
                   {:name "Sondra Richardson",
                    :juxt.site/type "https://hospital.com/types/patient",
                    :xt/id "https://hospital.com/hospital-demo/patients/010",
                    :readings nil}]}}
               (eqlc/prune-result (xt/q db q alice nil))))))

    (testing "Bob's view"
      (is (= #{{:name "Dr. Jack Conway",
                :juxt.site/type "https://hospital.com/types/doctor",
                :xt/id "https://hospital.com/hospital-demo/doctors/001",
                :patients nil}
               {:name "Dr. Jackson",
                :juxt.site/type "https://hospital.com/types/doctor",
                :xt/id "https://hospital.com/hospital-demo/doctors/003",
                :patients
                [{:name "Sondra Richardson",
                  :juxt.site/type "https://hospital.com/types/patient",
                  :xt/id "https://hospital.com/hospital-demo/patients/010",
                  :readings nil}]}}
             (eqlc/prune-result (xt/q db q bob nil)))))))
