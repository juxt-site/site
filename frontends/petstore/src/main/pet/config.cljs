(ns pet.config)

(def config {"frontend-server" "http://localhost:3000"
             "resource-server" "http://localhost:4444"
             "authorization-server" "http://localhost:4440"
             "client-id" "petstore"})


(defn authorize-payload []
  (let [scopes (for [path ["/scopes/system/self-identification"
                           "/scopes/petstore/read"
                           "/scopes/petstore/write"]]
                 (str (get config "authorization-server") path))]
    {"origin" (get config "resource-server")
     "client_id" (get config "client-id")
     "authorization_endpoint" (str (get config "authorization-server") "/oauth/authorize")
     "token_endpoint" (str (get config "authorization-server") "/oauth/token")
     "redirect_uri" (str (get config "frontend-server") "/oauth-redirect.html")
     "requested_scopes" scopes
     }))
