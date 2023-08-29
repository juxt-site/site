;; Copyright © 2021, JUXT LTD.

(ns juxt.site.http-authentication
  (:require
   [juxt.reap.alpha.encoders :refer [www-authenticate]]
   [clojure.tools.logging :as log]
   crypto.password.bcrypt
   [juxt.reap.alpha.decoders :as reap]
   juxt.reap.alpha.rfc7235
   [xtdb.api :as xt]
   [juxt.site.xt-util :as xtu]
   [clojure.string :as str]))

(defn lookup-access-token [db token]
  (first
   (xt/q db '{:find [(pull sub [*]) (pull at [*])]
              :keys [subject access-token]
              :where [[at :juxt.site/token tok]
                      [at :juxt.site/type "https://meta.juxt.site/types/access-token"]
                      [at :juxt.site/subject sub]
                      [sub :juxt.site/type "https://meta.juxt.site/types/subject"]]
              :in [tok]} token)))

(defn authenticate-with-bearer-auth [req db token68 protection-spaces]
  (log/tracef "Protection-spaces are %s" (pr-str protection-spaces))
  (or
   (when (seq protection-spaces)
     (let [{:keys [subject access-token]}
           (lookup-access-token db token68)
           scope (:juxt.site/scope access-token)]
       (cond-> req
         subject (assoc :juxt.site/subject-uri (:xt/id subject)
                        :juxt.site/subject subject
                        :juxt.site/access-token access-token)
         scope (assoc :juxt.site/scope scope))))
   req))

;; TODO (idea): Tie bearer token to other security aspects such as
;; remote IP so that the bearer token is more difficult to use if
;; intercepted. This can be extended to other claims in the JWT,
;; restricting the token to time periods.

;; One downside of Basic Authentication is the lack of a 'session'

(defn assoc-basic-auth-subject [req seed protection-space]
  (let [subject (into seed
                      {:xt/id (format "https://example.org/_site/subjects/%s" (random-uuid))
                       :juxt.site/type "https://meta.juxt.site/types/subject"
                       :juxt.site/protection-space (:xt/id protection-space)})]
    (assoc req
           :juxt.site/subject subject
           ;; This means that the subject's life-cycle is that of the request
           :juxt.site/subject-is-ephemeral? true)))

(defn authenticate-with-basic-auth [req db token68 protection-spaces]
  (when-let [{canonical-root-uri :juxt.site/canonical-root-uri,
              authorization-server :juxt.site/authorization-server,
              :as protection-space} (first protection-spaces)]
    (let [[_ username password]
          (re-matches
           #"([^:]*):([^:]*)"
           (String. (.decode (java.util.Base64/getDecoder) token68)))

          query '{:find [(pull e [*])]
                  :where [(matches? e username password canonical-root-uri authorization-server)]

                  :rules [[(matches? e username password canonical-root-uri authorization-server)
                           [e :juxt.site/type "https://meta.juxt.site/types/user-identity"]
                           [e :juxt.site/username username]
                           [e :juxt.site/password-hash password-hash]
                           [e :juxt.site/canonical-root-uri canonical-root-uri]
                           ;; TODO: We could also add an operation realm here
                           [(crypto.password.bcrypt/check password password-hash)]]

                          ;; Basic HTTP Authentication can also used
                          ;; to authenticate OAuth2 clients
                          [(matches? e username password canonical-root-uri authorization-server)
                           [e :juxt.site/type "https://meta.juxt.site/types/application"]
                           [e :juxt.site/client-id username]
                           [e :juxt.site/client-secret password]
                           [e :juxt.site/authorization-server authorization-server]
                           ]]

                  :in [username password canonical-root-uri authorization-server]}

          candidates
          (map first
               (xt/q db query username password canonical-root-uri authorization-server
                     ;;canonical-root-uri realm
                     ))]

      ;; It's unlikely, but if there are multiple user-identities or
      ;; clients with the same username/password then we will just
      ;; take the first one, but warn of this case.
      (when (> (count candidates) 1)
        (log/warnf "Multiple candidates in basic auth found for username %s, using first found" username))

      (when-let [candidate (first candidates)]
        (let [candidate-types (:juxt.site/type candidate)
              candidate-types (if (string? candidate-types) #{candidate-types} candidate-types)]
          (log/infof "candidate-types: %s" (pr-str candidate-types))
          (assoc-basic-auth-subject
           req
           (cond-> {}
             (contains? candidate-types "https://meta.juxt.site/types/user-identity")
             (assoc :juxt.site/user-identity (:xt/id candidate)
                    :juxt.site/user (:juxt.site/user candidate))
             (contains? candidate-types "https://meta.juxt.site/types/application")
             (assoc :juxt.site/application (:xt/id candidate)))
           protection-space))))))

(defn www-authenticate-header
  "Create the WWW-Authenticate header value"
  [db protection-spaces]
  (log/tracef "protection-spaces: %s" protection-spaces)
  (str/trim
   (www-authenticate
    (for [ps-id protection-spaces
          :let [ps (xtu/entity db ps-id)
                realm (:juxt.site/realm ps)]]
      {:juxt.reap.alpha.rfc7235/auth-scheme (:juxt.site/auth-scheme ps)
       :juxt.reap.alpha.rfc7235/auth-params
       (cond-> []
         realm (conj
                {:juxt.reap.alpha.rfc7235/auth-param-name "realm"
                 :juxt.reap.alpha.rfc7235/auth-param-value realm}))}))))

(defn authenticate-with-authorization-header
  [{db :juxt.site/db, :as req}
   authorization-header protection-spaces]
  (let [{:keys [juxt.reap.alpha.rfc7235/auth-scheme
                juxt.reap.alpha.rfc7235/token68]}
        (reap/authorization authorization-header)]
    (case (.toLowerCase auth-scheme)
      "basic"
      (or
       (authenticate-with-basic-auth
        req db token68
        (filter #(= (:juxt.site/auth-scheme %) "Basic") protection-spaces))
       req)

      "bearer"
      (authenticate-with-bearer-auth
       req db token68
       (filter #(= (:juxt.site/auth-scheme %) "Bearer") protection-spaces))

      (throw
       (ex-info
        "Auth scheme unsupported"
        {:juxt.site/request-context
         (cond-> (assoc req :ring.response/status 401)
           protection-spaces
           (assoc
            :ring.response/headers
            {"www-authenticate"
             (www-authenticate-header db protection-spaces)}))})))))

(defn authenticate
  "Authenticate a request. Return a modified request, with information about user,
  roles and other credentials."
  [{db :juxt.site/db, resource :juxt.site/resource, :as req}]

  ;; TODO: This might be where we also add the 'on-behalf-of' info

  (let [protection-spaces
        ;; TODO: Materialize aot such that we don't have to go back to database
        ;; XT2(link-traversal)
        (keep #(xtu/entity db %) (:juxt.site/protection-spaces resource []))
        ;;req (cond-> req protection-spaces (assoc :juxt.site/protection-spaces protection-spaces))
        authorization-header (get-in req [:ring.request/headers "authorization"])]

    (cond-> req
      authorization-header (authenticate-with-authorization-header authorization-header protection-spaces))))

(defn ^:deprecated login-template-model [req]
  {:query (str (:ring.request/query req))})

(defn ^:deprecated unauthorized-template-model [req]
  {:redirect (str
              (:ring.request/path req)
              (when-let [query (:ring.request/query req)] (str "?" query)))})
