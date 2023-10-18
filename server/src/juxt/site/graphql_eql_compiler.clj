;; Copyright © 2022, JUXT LTD.

(ns juxt.site.graphql-eql-compiler
  (:require
   [juxt.grab.alpha.document :as document]))

(defn- graphql->eql-ast*
  [schema field]
  (let [{scoped-type-name :juxt.grab.alpha.document/scoped-type-name} field
        gtype (some-> schema :juxt.grab.alpha.schema/types-by-name (get scoped-type-name))
        sel-name (:juxt.grab.alpha.graphql/name field)
        k (case sel-name
            "id" :xt/id
            "_type" :juxt.site/type
            (keyword sel-name))
        field-def (some-> gtype :juxt.grab.alpha.graphql/field-definitions (->> (some (fn [fdef] (when (= (:juxt.grab.alpha.graphql/name fdef) sel-name) fdef)))))
        site-dir (some-> field-def :juxt.grab.alpha.graphql/directives (->> (some (fn [dir] (when (= (:juxt.grab.alpha.graphql/name dir) "site") dir)))))
        args (reduce-kv (fn [acc k v]
                          (assoc acc (keyword k) v))
                        {} (:juxt.grab.alpha.graphql/arguments field))
        operation-uri (some-> site-dir :juxt.grab.alpha.graphql/arguments (get "operation"))]

    (cond
      (:juxt.grab.alpha.graphql/selection-set field)
      {:type :join
       :dispatch-key k
       :key k
       :params (cond-> args
                 operation-uri (assoc :juxt.site/operation-uri operation-uri))
       :children (mapv #(graphql->eql-ast* schema %)
                       (:juxt.grab.alpha.graphql/selection-set field))}

      :else
      {:type :prop
       :dispatch-key k
       :key k})))

(defn graphql->eql-ast
  [schema op]
  {:type :root
   :children (mapv
              (fn [field] (graphql->eql-ast* schema field))
              (:juxt.grab.alpha.graphql/selection-set op))})
