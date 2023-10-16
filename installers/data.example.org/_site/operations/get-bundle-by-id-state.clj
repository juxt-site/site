(let [query-params (:ring.request/query *ctx*)
      bundle
      (if query-params
        (let [bundle-id (-> query-params ring.util.codec/form-decode (get "bundle-id"))]
          (first (first
                  (xt/q '{:find [(pull e [*])]
                          :where [[e :juxt.site/type "https://data.example.org/types/bundle"]
                                  [e :xt/id bundle-id]]
                          :in [bundle-id]}
                        (str "https://data.example.org/bundles/" bundle-id)))))
        *resource*)]
  (reduce-kv #(if (not= "juxt.site" (namespace %2))
                (assoc %1 %2 %3)
                %1)
             {}
             bundle))
