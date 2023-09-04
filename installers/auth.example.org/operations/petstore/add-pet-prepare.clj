(let [content-type (-> *ctx*
                           :juxt.site/received-representation
                           :juxt.http/content-type)
          body (-> *ctx*
                   :juxt.site/received-representation
                   :juxt.http/body)

          pet (case content-type
                "application/json"
                (some->
                 body
                 (String.)
                 jsonista.core/read-value-with-keywords))]

      (let [id (:id pet)]
        {:docs [(merge
                 pet
                 {:xt/id (format "https://data.example.org/petstore/pet/%s" (or id "UNKNOWN"))
                  :juxt.site/type "https://data.example.org/types/pet"
                  :juxt.site/methods
                  {:get
                   {:juxt.site/operation
                    "https://auth.example.org/operations/petstore/get-pet-by-id"}
                   :delete
                   {:juxt.site/operation
                    "https://auth.example.org/operations/petstore/delete-pet-by-id"}
                   :post
                   {:juxt.site/operation
                    "https://auth.example.org/operations/petstore/update-pet-by-id"}}
                  :juxt.site/protection-spaces
                  #{"https://auth.example.org/protection-spaces/bearer"}
                     :juxt.site/access-control-allow-origins
                  [[".*" {:juxt.site/access-control-allow-origin "*"
                          :juxt.site/access-control-allow-methods [:get]
                          :juxt.site/access-control-allow-headers ["authorization"]}]]
                  :juxt.site/rules
                  '[[(allowed? subject operation resource permission)
                     [subject :juxt.site/user user]
                     [permission :juxt.site/role role]
                     [role :juxt.site/type "https://meta.juxt.site/types/role"]
                     [role-assignment :juxt.site/type "https://meta.juxt.site/types/role-assignment"]
                     [role-assignment :juxt.site/role role]
                     [role-assignment :juxt.site/user user]]

                    [(allowed? subject operation resource permission)
                     [subject :juxt.site/application app]
                     [permission :juxt.site/role role]
                     [role :juxt.site/type "https://meta.juxt.site/types/role"]
                     [role-assignment :juxt.site/type "https://meta.juxt.site/types/role-assignment"]
                     [role-assignment :juxt.site/role role]
                     [role-assignment :juxt.site/application app]]]})
                {:xt/id (format "https://data.example.org/petstore/pet/%s.json" (or id "UNKNOWN"))
                 :juxt.http/content-type "application/json"
                 :juxt.site/variant-of (format "https://data.example.org/petstore/pet/%s" (or id "UNKNOWN"))
                 :juxt.site/protection-spaces
                 #{"https://auth.example.org/protection-spaces/bearer"}
                 :juxt.site/respond
                 {:juxt.site.sci/program
                  (pr-str '(let [content (str (jsonista.core/write-value-as-string *state*) "\r\n")]
                           (-> *ctx*
                               (assoc :ring.response/body content)
                               (update :ring.response/headers assoc "content-length" (str (count (.getBytes content)))))))}
                 :juxt.site/access-control-allow-origins
                 [[".*" {:juxt.site/access-control-allow-origin "*"
                         :juxt.site/access-control-allow-methods [:get]
                         :juxt.site/access-control-allow-headers ["authorization"]}]]}]}))
