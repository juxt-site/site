;; Copyright © 2022, JUXT LTD.

(ns juxt.site.eql-datalog-compiler
  (:require
   [clojure.walk :refer [postwalk]]
   [juxt.site.operations :as operations]
   [xtdb.api :as xt]))

(defn- compile-ast*
  [db ctx ast]
  (assert (map? ctx))
  (assert (number? (:depth ctx)))
  (let [depth (:depth ctx)
        operation-id (-> ast :params :juxt.site/operation)
        _ (assert operation-id "Operation must be specified on metadata")
        operation (when operation-id (xt/entity db operation-id))
        _ (when operation-id (assert operation (format "Operation not found: %s" operation-id)))
        rules (when operation (operations/operation->rules db operation-id))
        _ (when operation (assert (seq rules) (format "No rules found for operation %s" operation-id)))

        parent-operation (:juxt.site/operation ctx)

        additional-where-clauses
        (concat
         ;; Context
         (when-let [parent-operation-id (:xt/id parent-operation)]
           (get-in operation [:juxt.site/operation-contexts parent-operation-id :juxt.site/additional-where-clauses]))
         ;; Parameters
         (mapcat
          (fn [[k v]]
            (when-let [clauses
                       (get-in operation [:juxt.site/params k :juxt.site/additional-where-clauses])]
              (postwalk
               (fn [x] (if (= x '$) v x))
               clauses)))
          (:params ast)))]

    (reduce
     (fn [acc node]
       (case (:type node)
         :prop
         (update-in acc [:find 0] #(list 'pull 'e (conj (last %) (:key node))))
         :join
         (let [{:keys [dispatch-key]} node]
           (-> acc
               (update-in [:find 1] (fnil assoc {}) dispatch-key (symbol (name dispatch-key)))
               (assoc :keys '[root joins])
               (update :where conj [`(~'q ; sub-query
                                      ~(compile-ast*
                                        db
                                        (-> ctx
                                            (assoc :juxt.site/operation operation)
                                            (update :depth inc))
                                        node)
                                      ~'e ; e becomes the parent
                                      ~'subject
                                      ~'purpose)
                                    (symbol (name dispatch-key))])))
         :else acc))

     `{:find [(~'pull ~'e [])]
       :keys [~'root]
       :where
       ~(cond-> `[[~'operation :xt/id ~operation-id]
                  ~'[permission :juxt.site/type "https://meta.juxt.site/types/permission"]
                  ~'[permission :juxt.site/operation operation]
                  ;; We must rename 'allowed?' here because we
                  ;; cannot allow rules from parent queries to
                  ;; affect rules from sub-queries. In other
                  ;; words, sub-queries must be completely
                  ;; isolated.
                  ~(list (symbol (str "depth" depth) "allowed?") 'subject 'operation 'e 'permission)]
          additional-where-clauses (-> (concat additional-where-clauses) vec))
       :rules ~(mapv (fn [rule]
                       (update rule 0 #(apply list (cons (symbol (str "depth" depth) "allowed?") (rest %))))
                       ) rules)
       :in ~(if (pos? (:depth ctx)) '[parent subject purpose] '[subject purpose])}

     (:children ast))))

(defn compile-ast
  "This function compiles an annotated EQL query to an XTDB/Core1 query"
  [db ast]
  (map
   (fn [child]
     (compile-ast* db {:depth 0} child))
   (:children ast)))

(defn prune-result [result]
  (postwalk
   (fn [x] (if (:root x) (merge (:root x) (:joins x)) x))
   result))
