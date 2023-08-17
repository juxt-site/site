;; Copyright © 2023, JUXT LTD.

(ns juxt.site.tx-test
  (:require
   [clojure.set :as set]
   [xtdb.db :as xt.db]
   [xtdb.codec :refer [crux->xt]]
   [clojure.test :refer [deftest is are use-fixtures]]
   [juxt.site.logging :refer [with-logging]]
   [juxt.site.repl :as repl]
   [juxt.site.test-helpers.xt :refer [system-xt-fixture *xt-node*]]
   [juxt.site.test-helpers.fixture :refer [with-fixtures]]
   [juxt.site.xt-util :as xt-util]
   [xtdb.api :as xt]))

(use-fixtures :each system-xt-fixture)

(deftest tx-exception-doc-test
  (let [tx-ops
        [[:xtdb.api/put {:xt/id ::fail
                         :xt/fn '(fn [ctx message]
                                   (throw (ex-info message {:foo "foo"})))}]

         [:xtdb.api/put {:xt/id ::create-person
                         :xt/fn '(fn [ctx eid name age op-ix]
                                   (let [{:xtdb.api/keys [tx-id]} (xtdb.api/indexing-tx ctx)]
                                     [[::xt/put {:xt/id eid :name name :age age}]
                                      [::xt/put {:xt/id (str "/events/" tx-id "/" op-ix)
                                                 :juxt.site/type "https://meta.juxt.site/types/event"
                                                 :op-ix op-ix}]]))}]

         [:xtdb.api/put {:xt/id ::increment-age
                         :xt/fn '(fn [ctx eid op-ix]
                                   (let [db (xtdb.api/db ctx)
                                         entity (xtdb.api/entity db eid)
                                         {:xtdb.api/keys [tx-id]} (xtdb.api/indexing-tx ctx)]
                                     [[::xt/put (update entity :age inc)]
                                      [::xt/put {:xt/id (str "/events/" tx-id "/" op-ix)
                                                 :juxt.site/type "https://meta.juxt.site/types/event"
                                                 :op-ix op-ix}]]))}]

         [:xtdb.api/fn ::create-person "https://example.org/users/alice" "Alice" 40 0]
         [:xtdb.api/fn ::create-person "https://example.org/users/bob" "Bob" 42 1]
         [:xtdb.api/fn ::increment-age "https://example.org/users/bob" 2]
         [:xtdb.api/fn ::fail "Whoops!"]]

        tx1 (xt/submit-tx *xt-node* tx-ops)
        ;; This is to test that we only see tx1
        tx2 (xt/submit-tx *xt-node* [[:xtdb.api/put {:xt/id :dummy}]])
        _ (xt/await-tx *xt-node* tx2)
        exception-doc (->> tx1
                           :xtdb.api/tx-id
                           (xt-util/tx-exception-doc *xt-node*))]

    (is (= {:juxt.site.xt/failed? true
            :juxt.site.xt/exception 'clojure.lang.ExceptionInfo
            :juxt.site.xt/message "Whoops!"
            :juxt.site.xt/ex-data {:foo "foo"}}
           (dissoc exception-doc :xt/id)))))

;; Failing test - because we aren't yet able to recurse the exceptions
;; of the sub-tx-fns. But hopefully we can do so in XTDBv2
(comment
  (deftest tx-exception-recursive-doc-test
    (let [tx-ops
          [[:xtdb.api/put {:xt/id ::fail
                           :xt/fn '(fn [ctx message]
                                     (throw (ex-info message {:foo "foo"})))}]

           [:xtdb.api/put {:xt/id ::create-person
                           :xt/fn '(fn [ctx eid name age op-ix]
                                     (let [{:xtdb.api/keys [tx-id]} (xtdb.api/indexing-tx ctx)]
                                       [[::xt/put {:xt/id eid :name name :age age}]
                                        [::xt/put {:xt/id (str "/events/" tx-id "/" op-ix)
                                                   :juxt.site/type "https://meta.juxt.site/types/event"
                                                   :op-ix op-ix}]]))}]

           [:xtdb.api/put {:xt/id ::increment-age
                           :xt/fn '(fn [ctx eid op-ix]
                                     (let [db (xtdb.api/db ctx)
                                           entity (xtdb.api/entity db eid)
                                           {:xtdb.api/keys [tx-id]} (xtdb.api/indexing-tx ctx)]
                                       [[::xt/put (update entity :age inc)]
                                        [::xt/put {:xt/id (str "/events/" tx-id "/" op-ix)
                                                   :juxt.site/type "https://meta.juxt.site/types/event"
                                                   :op-ix op-ix}]]))}]

           [:xtdb.api/put {:xt/id ::batch
                           :xt/fn '(fn [ctx]
                                     [[:xtdb.api/fn ::create-person "https://example.org/users/alice" "Alice" 40 0]
                                      [:xtdb.api/fn ::create-person "https://example.org/users/bob" "Bob" 42 1]
                                      [:xtdb.api/fn ::increment-age "https://example.org/users/bob" 2]
                                      [:xtdb.api/fn ::fail "Whoops!"]])}]

           ]

          tx1 (xt/submit-tx *xt-node* tx-ops)
          _ (xt/await-tx *xt-node* tx1)
          tx2 (xt/submit-tx *xt-node* [[:xtdb.api/fn ::batch]])
          _ (xt/await-tx *xt-node* tx2)

          exception-doc (->> tx1
                             :xtdb.api/tx-id
                             (xt-util/tx-exception-doc *xt-node*))

          tx-id (:xtdb.api/tx-id tx2)]

      (is exception-doc)

      (let [document-store (:document-store *xt-node*)]
          (with-open [tx-log (xt.db/open-tx-log (:tx-log *xt-node*) (dec tx-id) {})]
            (->> tx-log
                 iterator-seq
                 first                    ; narrow to this tx-id
                 :xtdb.tx.event/tx-events ; pull out events
                 (map #(get % 2))  ; get the document-hash of each event
                 set
                 (xt.db/fetch-docs document-store)

                 )))


      )))

(deftest tx-event-docs-test
  (let [tx-ops
        [[:xtdb.api/put {:xt/id ::fail
                         :xt/fn '(fn [ctx message]
                                   (throw (ex-info message {:foo "foo"})))}]

         [:xtdb.api/put {:xt/id ::create-person
                         :xt/fn '(fn [ctx eid name age op-ix]
                                   (let [{:xtdb.api/keys [tx-id]} (xtdb.api/indexing-tx ctx)]
                                     [[::xt/put {:xt/id eid :name name :age age}]
                                      [::xt/put {:xt/id (str "/events/" tx-id "/" op-ix)
                                                 :juxt.site/type "https://meta.juxt.site/types/event"
                                                 :op-ix op-ix}]]))}]

         [:xtdb.api/put {:xt/id ::increment-age
                         :xt/fn '(fn [ctx eid op-ix]
                                   (let [db (xtdb.api/db ctx)
                                         entity (xtdb.api/entity db eid)
                                         {:xtdb.api/keys [tx-id]} (xtdb.api/indexing-tx ctx)]
                                     [[::xt/put (update entity :age inc)]
                                      [::xt/put {:xt/id (str "/events/" tx-id "/" op-ix)
                                                 :juxt.site/type "https://meta.juxt.site/types/event"
                                                 :op-ix op-ix}]]))}]

         [:xtdb.api/fn ::create-person "https://example.org/users/alice" "Alice" 40 0]
         [:xtdb.api/fn ::create-person "https://example.org/users/bob" "Bob" 42 1]
         [:xtdb.api/fn ::increment-age "https://example.org/users/bob" 2]]

        tx1 (xt/submit-tx *xt-node* tx-ops)
        ;; This is to test that we only see tx1
        tx2 (xt/submit-tx *xt-node* [[:xtdb.api/put {:xt/id :dummy}]])
        _ (xt/await-tx *xt-node* tx2)]


    (is (= [{:juxt.site/type "https://meta.juxt.site/types/event",
             :op-ix 0,
             :crux.db/id "/events/0/0"}
            {:juxt.site/type "https://meta.juxt.site/types/event",
             :op-ix 1,
             :crux.db/id "/events/0/1"}
            {:juxt.site/type "https://meta.juxt.site/types/event",
             :op-ix 2,
             :crux.db/id "/events/0/2"}]
           (->> tx1
                :xtdb.api/tx-id
                (xt-util/tx-event-docs *xt-node*)
                (sort-by :op-ix))))))
