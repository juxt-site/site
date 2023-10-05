;; Copyright © 2022, JUXT LTD.

(ns juxt.site.graphql-compiler
  (:require
   [juxt.grab.alpha.parser :as parser]
   [juxt.grab.alpha.document :as document]
   [juxt.grab.alpha.schema :as schema]))

(defn selection->operation-id
  [{name :juxt.grab.alpha.graphql/name,
    scoped-type-name :juxt.grab.alpha.document/scoped-type-name,
    :as _selection} schema]
  (get-in schema [:juxt.grab.alpha.schema/types-by-name
                  scoped-type-name
                  :juxt.grab.alpha.schema/fields-by-name
                  name
                  :juxt.grab.alpha.schema/directives-by-name
                  "site"
                  :juxt.grab.alpha.graphql/arguments
                  "operation"]))

(declare build-query-for-selection-set)

(defn get-alias-or-name-from-selection-set
  [selection-set]
  (or (get selection-set :juxt.grab.alpha.graphql/alias)
      (get selection-set :juxt.grab.alpha.graphql/name)))

(defn build-where-clause
  [compiled-schema operation-ids operation-rules-map subquery-data incoming-resources? arguments]
  (let [entity-selection-clause (if incoming-resources? ['e :xt/id 'input-id] ['e :xt/id '_])
        operations-ids-as-single-or-set (if (vector? operation-ids)
                                       (set operation-ids)
                                       operation-ids)
        where-clause [entity-selection-clause
                      ['operation :juxt.site/type "https://meta.juxt.site/types/operation"]
                      ['operation :xt/id operations-ids-as-single-or-set]
                      ['permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                      ['permission :juxt.site/operation operations-ids-as-single-or-set]
                      '(allowed? permission subject operation e)
                      '(include? operation e)]]
    (cond-> where-clause
      (seq subquery-data) (-> ;; Add the clause to pull the key into the query
                           (into (map #(vector
                                        'e
                                        (keyword (:juxt.grab.alpha.graphql/name %))
                                        (symbol (get-alias-or-name-from-selection-set %)))
                                      subquery-data))
                           ;; Add a clause for the subquery
                           (into (map #(vector (list 'q
                                                     (build-query-for-selection-set % compiled-schema operation-rules-map true)
                                                     'subject 'purpose (symbol (get-alias-or-name-from-selection-set %)))
                                               (symbol (str "inner-"(get-alias-or-name-from-selection-set %))))

                                      subquery-data)))
      (seq arguments) (conj (list 'arguments-match? 'e 'operation arguments)))))

(defn build-find-clause
  [pull-fields subquery-data]
  (let [find-clause (if (seq pull-fields)
                      ['e (list 'pull 'e pull-fields)]
                      ['e {}])]
    (cond-> find-clause
      (seq subquery-data) (conj
                           (reduce
                            (fn [acc n]
                              (assoc acc
                                     (keyword (get-alias-or-name-from-selection-set n))
                                     (symbol (str "inner-" (get-alias-or-name-from-selection-set n)))))
                            {}
                            subquery-data)))))

(defn build-in-clause
  [incoming-resources?]
  (let [in-clause '[subject purpose]]
    (cond-> in-clause
      incoming-resources? (conj 'input-id))))

(defn build-query-xtdb
  [compiled-schema operation-ids fields-to-pull operation-rules-map subquery-data incoming-resources? arguments]
  (let [pull-fields (vec fields-to-pull)
        where-clause (build-where-clause compiled-schema operation-ids operation-rules-map subquery-data incoming-resources? arguments)
        find-clause (build-find-clause pull-fields subquery-data)
        in-clause (build-in-clause incoming-resources?)]
    {:find find-clause
     :where where-clause
     :rules operation-rules-map
     :in in-clause}))


(defn name-scoped-name-pair->operations
  [{name :juxt.grab.alpha.graphql/name,
    scoped-type-name :juxt.grab.alpha.document/scoped-type-name} schema]
  (get-in schema [:juxt.grab.alpha.schema/types-by-name
                  scoped-type-name
                  :juxt.grab.alpha.schema/fields-by-name
                  name
                  :juxt.grab.alpha.schema/directives-by-name
                  "site"
                  :juxt.grab.alpha.graphql/arguments
                  "operation"]))


(defn build-query-for-selection-set
  [selection-set compiled-schema operation-rules incoming-resources?]
  (let [operations (name-scoped-name-pair->operations selection-set compiled-schema)
        sel-set (:juxt.grab.alpha.graphql/selection-set selection-set)
        grouped-by-inners (group-by (comp some? :juxt.grab.alpha.graphql/selection-set) sel-set)]
    (build-query-xtdb
     compiled-schema
     operations
     (map (comp keyword :juxt.grab.alpha.graphql/name) (get grouped-by-inners false))
     operation-rules
     (get grouped-by-inners true)
     incoming-resources?
     (update-keys
      (get selection-set :juxt.grab.alpha.graphql/arguments {})
      keyword))))

(defn selection-set->name-scoped-name-pair
  [schema selection-set]
  (let [type-entries (filter :juxt.grab.alpha.graphql/selection-set selection-set)
        current-level-entries (map #(select-keys % [:juxt.grab.alpha.graphql/name
                                                    :juxt.grab.alpha.document/scoped-type-name])
                                   type-entries)
        inner-type-entries (map :juxt.grab.alpha.graphql/selection-set type-entries)]
    (if (seq inner-type-entries)
      (let [inner-results (flatten (map #(selection-set->name-scoped-name-pair
                                          schema %)
                                        inner-type-entries))]
        (distinct (concat inner-results current-level-entries)))
      current-level-entries)))

(defn query-doc->operations
  [query-document schema]
  (let [root-selection-set
        (->
         query-document
         :juxt.grab.alpha.document/operations
         first
         :juxt.grab.alpha.graphql/selection-set)
        name-scoped-name-pairs (selection-set->name-scoped-name-pair schema root-selection-set)]
    (reduce (fn [acc n] (let [operations (name-scoped-name-pair->operations n schema)]
                          (cond
                            (vector? operations) (into acc operations)
                            (some? operations) (conj acc operations)
                            :else (throw
                                      (ex-info
                                       "Failed to find linked operations for field. Ensure @site directive is available in the schema for this field."
                                       {:target-pair n :schema schema})))
                          (if (vector? operations)
                            (into acc operations)
                            (conj acc operations))))
            #{}
            name-scoped-name-pairs)))

(defn compile-schema
  [schema-string]
  (-> schema-string
      parser/parse
      schema/compile-schema))

(defn query->query-doc
  [query-string compiled-schema]
  (-> query-string
      parser/parse
      (document/compile-document* compiled-schema)))
