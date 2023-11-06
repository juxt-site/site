(let [query-params (:ring.request/query *ctx*)]
  (when query-params
    (let [bundle-id (-> query-params ring.util.codec/form-decode (get "bundle-id"))]
      (xt/entity-history (str "https://data.example.org/bundles/" bundle-id)))))
