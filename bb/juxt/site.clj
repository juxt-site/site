;; Copyright © 2023, JUXT LTD.

(ns juxt.site
  (:require
   [bblgum.core :as b]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.string :as str]
   [juxt.installer-tree :refer [resource-installers]]))

(defn read-line* [r]
  (let [sb (java.lang.StringBuilder.)]
    (loop [c (.read r)]
      (when (not= c 10)
        (.append sb (char c))
        (recur (.read r))))
    (.toString sb)))

(defn read-object [r]
  (binding [*read-eval* false]
    (edn/read {:readers {'error (fn [x] x)}} r)))

(defn read-string* [r]
  (binding [*read-eval* false]
    (edn/read-string {:readers {'error (fn [x] x)}} r)))

(defn slurp-prompt [r]
  (let [prompt (read-object r)]
    (when-not (= 'site> prompt)
      (throw (ex-info "Unexpected prompt" {:prompt prompt})))))

(defn eval-and-read [reader writer expr]
  (binding [*out* writer]
    (println expr))
  (let [obj (read-object reader)]
    (slurp-prompt reader)
    obj))

(defn connect
  "Return function that evaluates and expression via the REPL"
  [host port]
  (let [s (java.net.Socket. host port)
        writer (io/writer (.getOutputStream s))
        reader (java.io.PushbackReader. (java.io.InputStreamReader. (.getInputStream s)))
        copyright-banner (read-line* reader)
        _ (assert (re-matches #"Site by JUXT. Copyright.*" copyright-banner))
        help-message (read-line* reader)
        _ (assert (re-matches #"Type :quit to exit, :help for help." help-message))]

    (slurp-prompt reader)
    (partial eval-and-read reader writer)))

(def eval-and-read! (connect "localhost" 50505))

(defn confirm [prompt]
  (let [{:keys [status result]}
        (b/gum {:cmd :confirm
                :as :bool
                :args [prompt]
                :opts {}})]
    (when-not (zero? status)
      (throw
       (ex-info "gum process exited with non-zero status" {:status status})))
    result))

(defn input [opts]
  (let [{:keys [status result]}
        (b/gum {:cmd :input
                :opts opts})]
    (when-not (zero? status)
      (throw
       (ex-info "gum process exited with non-zero status" {:status status})))
    (first result)))

(defn choose [choices opts]
  (let [{:keys [status result]}
        (b/gum {:cmd :choose
                :args choices
                :opts (or opts {})})]
    (when-not (zero? status)
      (throw
       (ex-info "gum process exited with non-zero status" {:status status})))
    (first result)))

;; Use site-push as a command in order to show a spinner
(defn push! [expr opts]
  (let [{:keys [status result]}
        (b/gum {:cmd :spin
                :args ["/bin/bash" "bin/site-push" "-e" (pr-str expr)]
                :opts (->
                       (merge
                        {:spinner "points"
                         :spinner.foreground "#A80"
                         :show-output true
                         :title "Installing"}
                        (select-keys opts [:title]))
                       (update :title str "..."))})]

    (if (pos? status)
      (do ;; replace with throwing exception
        (println "ERROR")
        (pprint result))
      (str/join " " result))))

(defn install! [resources uri-map parameter-map install-opts]

  ;; 1. Ask tree to return an installer-seq
  (let [installers (resource-installers resources uri-map parameter-map)
        existing (set (edn/read-string (push! `(~'find-resources ~(mapv :id installers)) {})))
        remaining-installers (remove (comp existing :id) installers)]

    (push! `(~'call-installers! (quote ~remaining-installers)) {}))

  ;; TODO: 2. Exchange installer-seq with repl to enquire which resources have already installed.
  ;; (Perhaps we use a -f to 'force' a re-install, otherwise resources aren't overwritten)

  ;; TODO: 3. Amend the installer-seq accordingly

  )

;; End of infrastructure

(defn reset []
  (when (confirm "Factory reset and delete ALL resources?")
    (eval-and-read!
     (pr-str
      '(factory-reset!)))))

(defn ls []
  (let [resources (eval-and-read! (pr-str '(ls)))
        sw (java.io.StringWriter.)]
    (with-open [out (java.io.PrintWriter. sw)]
      (binding [*out* out]
        (doseq [res resources]
          (println res))))
    (when-not (str/blank? (.toString sw))
      (let [{:keys [status result]}
            (b/gum {:cmd :filter
                    :in (io/input-stream (.getBytes (.toString sw)))})]
        (when (zero? status)
          (let [expr `(~'e ~(first result))]
            (pprint (eval-and-read! (pr-str expr)))))))))

(defn input-uri [{:keys [prompt default]}]
  (let [grab (fn [prefix] (input
                           {:header (str prefix prompt)
                            :value default}))]
    (loop [base-uri (grab "")]
      (if (re-matches #"https://.+" base-uri)
        base-uri
        (recur (grab "Bad format. "))))))

(defn input-auth-base-uri []
  (input-uri {:prompt "Enter auth base URI"
              :default "https://auth.site.test"}))

(defn input-data-base-uri []
  (input-uri {:prompt "Enter data base URI"
              :default "https://data.site.test"}))

(defn bootstrap []
  (let [auth-base-uri (input-auth-base-uri)
        resources
        (->> ["https://auth.example.org/_site/do-action"
              "https://auth.example.org/_site/subjects/system"
              "https://auth.example.org/_site/actions/create-action"
              "https://auth.example.org/_site/actions/grant-permission"
              "https://auth.example.org/_site/permissions/system/bootstrap"
              "https://auth.example.org/_site/actions/install-not-found"
              "https://auth.example.org/_site/permissions/system/install-not-found"
              "https://auth.example.org/_site/not-found"
              "https://auth.example.org/_site/actions/get-not-found"
              "https://auth.example.org/_site/permissions/get-not-found"]
             (mapv #(str/replace % "https://auth.example.org" auth-base-uri)))]
    (install!
     resources
     {"https://auth.example.org" auth-base-uri}
     {}
     {:title "Bootstrapping"
      :success-message "Bootstrap succeeded"})
    #_(push!
     `(~'converge!
       ~resources
       {"https://auth.example.org" ~auth-base-uri}
       {})
     {:title "Bootstrapping"
      :success-message "Bootstrap succeeded"})))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

(defn openid []
  (let [auth-base-uri (input-auth-base-uri)
        params
        (into
         {}
         [
          ["issuer-configuration"
           (str auth-base-uri
                "/openid/issuers/"
                (url-encode
                 (input
                  {:header "Issuer"
                   :value "https://juxt.eu.auth0.com"})))]

          ["client-configuration"
           (str auth-base-uri
                "/openid/clients/"
                (url-encode
                 (input
                  {:header "Client ID"
                   :value "d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"})))]

          ["client-secret"
           (input
            {:header "Client Secret"
             :value "gvk-mNdDmyaFsJwN_xVKHPH4pfrInYqJE1r8lRrn0gmoKI4us0Q5Eb7ULdruYZjD"})]

          ["session-scope" (str auth-base-uri "/session-scopes/openid-login-session")]])]

    (install!
     [(str auth-base-uri "/login-with-openid")
      (str auth-base-uri "/openid/callback")]
     {"https://auth.example.org" auth-base-uri}
     params
     {:title "Installing OpenAPI"})))

(defn system-api []
  (let [auth-base-uri (input-auth-base-uri)
        data-base-uri (input-data-base-uri)
        resources
        (->>
         [ ;; API resources
          "https://data.example.org/_site/openapi.json"
          ;; /actions
          "https://auth.example.org/actions/system-api/get-actions"
          "https://auth.example.org/permissions/system-api/get-actions"
          "https://data.example.org/_site/actions"
          "https://data.example.org/_site/actions.html"
          "https://data.example.org/_site/actions.json"
          ;; /users
          "https://auth.example.org/actions/system-api/get-users"
          "https://data.example.org/_site/users"
          "https://data.example.org/_site/users.html"
          "https://data.example.org/_site/users.json"
          ;; Roles
          "https://auth.example.org/roles/SystemReadonly"
          "https://auth.example.org/permissions/by-role/SystemReadonly/system-api/get-users"]
         (mapv #(str/replace % "https://auth.example.org" auth-base-uri))
         (mapv #(str/replace % "https://data.example.org" data-base-uri)))

        uri-map {"https://auth.example.org" auth-base-uri
                 "https://data.example.org" data-base-uri}

        ]
    (install! resources uri-map {} {:title "Installing System API"})
    ))

(defn auth-server []
  (let [auth-base-uri (input-auth-base-uri)
        data-base-uri (input-data-base-uri)
        resources
        (->>
         ["https://auth.example.org/oauth/authorize"
          "https://auth.example.org/actions/oauth/authorize"
          "https://auth.example.org/actions/install-authorization-server"
          "https://auth.example.org/permissions/system/install-authorization-server"
          "https://auth.example.org/permissions/system/register-client"]
         (mapv #(str/replace % "https://auth.example.org" auth-base-uri))
         (mapv #(str/replace % "https://data.example.org" data-base-uri)))

        uri-map {"https://auth.example.org" auth-base-uri
                 "https://data.example.org" data-base-uri}]

    (install!
     resources
     uri-map
     {"session-scope" (str auth-base-uri "/session-scopes/openid-login-session")}
     {:title "Installing authorization server"})))

(defn register-swagger-ui []
  (let [auth-base-uri (input-auth-base-uri)
        client-id (input {:header "Client ID" :value "swagger-ui"})
        resources [(format "%s/clients/%s" auth-base-uri client-id)]
        uri-map {"https://auth.example.org" auth-base-uri}]
    (install!
     resources uri-map
     {"client-type" "public"
      "redirect-uri" "https://swagger-ui.site.test/oauth2-redirect.html"}
     {:title (format "Adding OAuth client: %s" client-id)})))

(defn add-user []
  (let [auth-base-uri (input-auth-base-uri)
        username (input {:header "Username" :value "mal"})
        user (format "%s/users/%s" auth-base-uri (url-encode username))
        fullname (input {:header "Full name" :value "Malcolm Sparks"})
        iss (input {:header "Issuer" :value "https://juxt.eu.auth0.com"})
        nickname (input {:header "Nick name" :value "malcolmsparks"})
        resources [user
                   (format "%s/openid/user-identities/%s/nickname/%s"
                           auth-base-uri (url-encode iss) (url-encode nickname))

                   ;; TODO: The grant-permission action should not
                   ;; here, rather, create a new action called
                   ;; 'permit-user-to-authorize' which can take the
                   ;; actual user, and this action can be permitted to
                   ;; others without granting them the all-powerful
                   ;; grant-permission permission.
                   (format "%s/permissions/%s-can-authorize" auth-base-uri username)]

        uri-map {"https://auth.example.org" auth-base-uri}]

    (install!
     resources uri-map
     {"user" user
      "fullname" fullname}
     {:title (format "Adding user: %s" username)})))

(defn users []
  (println *command-line-args*)
  )
