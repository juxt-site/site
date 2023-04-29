;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.tasks
  (:require
   [juxt.site.install.common-install-util :as ciu]
   [bblgum.core :as b]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]))

(def GROUPS
  (edn/read-string
   (slurp (io/file (System/getenv "SITE_HOME") "installers/groups.edn"))))

(def ^:dynamic *no-confirm* nil)

(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https?://.*?example.org)([\p{Alnum}-]+)*"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn get-group-installers [group-name]
  (get-in GROUPS [group-name :juxt.site/installers]))

(defn apply-uri-map [uri-map installers]
  (postwalk
   (fn walk-fn [node]
     (cond
       (string? node) (uri-map-replace node uri-map)
       :else node))
   installers))

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

(defn confirm
  ([prompt] (confirm prompt {}))
  ([prompt opts]
   (if *no-confirm*
     true
     (let [{:keys [status result]}
           (b/gum {:cmd :confirm
                   :as :bool
                   :args [prompt]
                   :opts (merge
                          {:selected.background "#A51"
                           ;; "affirmative" "Delete ALL"
                           ;; "negative" "Cancel"
                           }
                          opts
                          )})]
       (when-not (zero? status)
         (throw
          (ex-info "gum process exited with non-zero status" {:status status})))
       result))))

(def ^:dynamic *heading*)

(defn input [{:keys [heading prompt header value]
              :or {heading *heading*}
              :as opts}]
  (if (and *no-confirm* value)
    value
    (let [{:keys [status result]}
          (b/gum {:cmd :input
                  :opts (cond-> opts
                          true (assoc :header.foreground "#C72" :prompt.foreground "#444" :width 60)
                          true (dissoc :heading :prompt)
                          (nil? header) (assoc :header (str heading "\n\n" prompt)))})]
      (when-not (zero? status)
        (throw
         (ex-info "gum process exited with non-zero status" {:status status})))
      (first result))))

(defn choose [choices opts]
  (if (and *no-confirm* (:value opts))
    (:value opts)
    (let [{:keys [status result]}
          (b/gum {:cmd :choose
                  :args choices
                  :opts (->
                         (merge {:header (str (or (:heading opts) *heading*) "\n")
                                 :header.foreground "#C72"
                                 :item.foreground "#444"
                                 :selected.foreground "#C72"
                                 :cursor.foreground "#AAA"
                                 :limit 1}
                                opts)
                         (dissoc :heading :description))})]
      (when-not (zero? status)
        (throw
         (ex-info "gum process exited with non-zero status" {:status status})))
      (first result))))

;; Use site-push as a command in order to show a spinner
(defn push! [expr opts]
  (let [{:keys [status result]}
        (b/gum {:cmd :spin
                :args ["/bin/bash" (format "%s/bin/site-push" (System/getenv "SITE_HOME")) "-e" (pr-str expr)]
                :opts (->
                       (merge
                        {:spinner "points"
                         :spinner.foreground "#C72"
                         :show-output true
                         :title "Installing"}
                        (select-keys opts [:title]))
                       (update :title str "..."))})]

    (if (pos? status)
      (do ;; replace with throwing exception
        (println "ERROR")
        (pprint result))
      (str/join " " result))))

(defn install! [installers uri-map parameter-map install-opts]

  ;; Can we access juxt.site.test-helpers.local-files-util/install-resource-groups! from here?

  ;; 1. Ask tree to return an installer-seq
  (let [installers (apply-uri-map uri-map installers)
        installer-map (ciu/unified-installer-map
                       (io/file (System/getenv "SITE_HOME") "installers")
                       uri-map)
        installers-seq (ciu/installer-seq installers installer-map parameter-map)
        existing (set (edn/read-string (push! `(~'find-resources ~(mapv :juxt.site/uri installers-seq)) {:title "Retrieving existing resources"})))
        remaining-installers (remove (comp existing :juxt.site/uri) installers-seq)
        heading (or (:title install-opts) *heading* "TITLE")]

    (cond
      (pos? (count existing))
      (when (confirm (format "%s\n\nResources to overwrite\n\n%s\n\nResources to install\n\n%s\n\nGo ahead?\n"
                             heading
                             (str/join "\n" (sort existing))
                             (str/join "\n" (sort (map :juxt.site/uri remaining-installers)))))
        (push! `(~'call-installers! (quote ~installers-seq)) {}))

      :else
      (when (confirm (format "%s\n\n%s\n\nInstall these resources?\n"
                             heading
                             (str/join "\n" (sort (map :juxt.site/uri remaining-installers)))))
        (push! `(~'call-installers! (quote ~remaining-installers)) {}))))

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

(defn ls
  ([]
   (if-let [qualifier (first *command-line-args*)]
     (ls `(~'ls ~qualifier))
     (ls '(ls))))
  ([cmd]
   (let [resources (eval-and-read! (pr-str cmd))
         sw (java.io.StringWriter.)]
     (with-open [out (java.io.PrintWriter. sw)]
       (binding [*out* out]
         (doseq [res resources]
           (println res))))
     (when-not (str/blank? (.toString sw))
       (let [{:keys [status result]}
             (b/gum {:cmd :filter
                     :opts {:placeholder "Select resource"
                            :fuzzy false
                            :indicator "⮕"
                            :indicator.foreground "#C72"
                            :match.foreground "#C72"}
                     :in (io/input-stream (.getBytes (.toString sw)))})]
         (when (zero? status)
           (let [expr `(~'e ~(first result))]
             (pprint (eval-and-read! (pr-str expr))))))))))

(defn ls-type [typ]
  (ls `(~'ls-type ~typ)))

(defn ls-site-type [typ]
  (ls `(~'ls-site-type ~typ)))

(defn input-uri [{:keys [prompt default]}]
  (let [grab (fn [prefix] (input
                           {:header (str prefix prompt)
                            :value default}))]
    (loop [base-uri (grab "")]
      (if (re-matches #"https?://.+" base-uri)
        base-uri
        (recur (grab "Bad format. "))))))

(defn input-auth-base-uri []
  (input-uri {:prompt "Enter auth base URI"
              :default "https://"}))

(defn input-data-base-uri []
  (input-uri {:prompt "Enter data base URI"
              :default "https://"}))

(defn bootstrap [{:keys [auth-base-uri]}]
  ;; Use install-resource-groups!
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        installers
        (->>
         (get-in GROUPS ["juxt/site/bootstrap" :juxt.site/installers])
         (mapv #(str/replace % "https://auth.example.org" auth-base-uri)))]
    (install!
     installers
     {"https://auth.example.org" auth-base-uri}
     {}
     {:title "Bootstrapping"
      :success-message "Bootstrap succeeded"})))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

(defn system-api [{:keys [auth-base-uri data-base-uri]}]
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        data-base-uri (or data-base-uri (input-data-base-uri))

        uri-map {"https://auth.example.org" auth-base-uri
                 "https://data.example.org" data-base-uri}

        installers (get-group-installers "juxt/site/system-api")]

    (install! installers uri-map {} {:title "Installing System API"})))

(defn random-string [size]
  (apply str
       (map char
            (repeatedly size
                        (fn []
                          (rand-nth
                           (concat
                            (range (int \A) (inc (int \Z)))
                            (range (int \a) (inc (int \z)))
                            (range (int \0) (inc (int \9))))))))))

(defn auth-server [{:keys [auth-base-uri session-scope]}]
  (binding [*heading* "Deploy OAuth2 Authorization Server"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          kid (random-string 16)
          uri-map {"https://auth.example.org" auth-base-uri}

          session-scope
          (or
           session-scope
           (let [choices [["OpenID (Recommended for production)"
                           (str auth-base-uri "/session-scopes/openid-login-session")]
                          ["Login form (dev only)"
                           (str auth-base-uri "/session-scopes/form-login-session")]]
                 selected (get (zipmap (map second choices) (map first choices)) session-scope)]
             (-> (into {} choices)
                 (get (choose (mapv first choices) (cond-> {} selected (assoc :selected selected)))))))

          installers
          (get-group-installers "juxt/site/oauth-authorization-server")]
      (install!
       installers
       uri-map
       {"session-scope" session-scope
        "kid" kid
        "authorization-code-length" 12
        "jti-length" 12}
       {:title "Installing authorization server"}))))

(defn register-application
  [{:keys [auth-base-uri client-id origin resource-server redirect-uris scope]}]
  (binding [*heading* "Register application"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          client-id (or client-id (input {:prompt "Client ID" :value client-id}))
          uri-map {"https://auth.example.org" auth-base-uri}
          installers [(format "https://auth.example.org/clients/%s" client-id)]]

      (install! installers uri-map {}
       {:title (format "Adding OAuth client: %s" client-id)}))))

(defn- add-user-input [{:keys [auth-base-uri data-base-uri username user-type fullname iss nickname]}]
  (binding [*heading* "Add user"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          data-base-uri (or data-base-uri (input-data-base-uri))

          username (input {:prompt "Username" :value username})
          fullname (input {:prompt "Full name" :value fullname})

          user (format "%s/_site/users/%s" data-base-uri (url-encode username))

          user-type (or
                     user-type
                     (let [choices [["OpenID (Recommended for production)" :openid]
                                    ["password (dev only)" :password]]
                           selected (get (zipmap (map second choices) (map first choices)) user-type)]
                       (-> (into {} choices)
                           (get (choose (mapv first choices)
                                        (cond-> {} selected (assoc :selected selected)))))))

          user-details {"auth-base-uri" auth-base-uri
                        "data-base-uri" data-base-uri
                        "user" user
                        "username" username
                        "fullname" fullname
                        "user-type" user-type}]
      (case user-type
        :openid
        (let [iss (input {:prompt "OpenID Issuer" :value iss :placeholder "https://"})
              nickname (input {:prompt "Nick name" :value nickname})]
          (merge user-details {"iss" iss "nickname" nickname}))

        :password
        (let [password (input {:prompt "Password" :password true})]
          (merge user-details {"password" password}))))))

(defn- grant-role-input [{:keys [auth-base-uri data-base-uri username rolename]}]
  (binding [*heading* "Grant role to user"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          data-base-uri (or data-base-uri (input-data-base-uri))
          username (or username (input {:prompt "Username" :value username}))
          rolename (or rolename (input {:prompt "Role" :value rolename}))]
      {"auth-base-uri" auth-base-uri
       "data-base-uri" data-base-uri
       "username" username
       "rolename" rolename})))

(defn add-user [defaults]
  (binding [*heading* "Add user"]
    (let [parameters (add-user-input defaults)
          {:strs [auth-base-uri data-base-uri user username fullname user-type]} parameters

          uri-map {"https://auth.example.org" auth-base-uri
                   "https://data.example.org" data-base-uri}

          installers (cond-> ["https://data.example.org/_site/users/{{username}}"]
                       (= user-type :openid) (conj "https://data.example.org/_site/openid-user-identities/{{iss|urlescape}}/nickname/{{nickname}}")
                       (= user-type :password (conj "https://data.example.org/_site/user-identities/{{username}}")))]

      (install! installers uri-map parameters
                {:title (case user-type
                          :openid (format "Adding OpenID user: %s" username)
                          :password (format "Adding user: %s" username))}))))

(defn grant-role [defaults]
  (binding [*heading* "Grant role to user"]
    (let [{:strs [auth-base-uri data-base-uri username rolename] :as parameters}
          (grant-role-input defaults)

          uri-map {"https://auth.example.org" auth-base-uri
                   "https://data.example.org" data-base-uri}

          installers ["https://auth.example.org/role-assignments/{{username}}-{{rolename}}"]]

      (install! installers uri-map
                (select-keys parameters ["username" "rolename"])
                {:title (format "Granting role %s to %s" rolename username)}))))

(defn add-system-user [defaults]
  (let [{:strs [auth-base-uri data-base-uri username user-type] :as parameters} (add-user-input defaults)

        uri-map {"https://auth.example.org" auth-base-uri
                 "https://data.example.org" data-base-uri}

        installers
        (cond-> ["https://data.example.org/_site/users/{{username}}"
                 "https://auth.example.org/role-assignments/{{username}}-{{rolename}}"]
          (= user-type :openid) (conj "https://data.example.org/_site/openid-user-identities/{{iss|urlescape}}/nickname/{{nickname}}")
          (= user-type :password) (conj "https://data.example.org/_site/user-identities/{{username}}"))]

    (install!
     installers
     uri-map
     (assoc
      (select-keys
       parameters
       (case user-type
         :openid ["user" "username" "fullname" "iss" "nickname"]
         :password ["user" "username" "fullname" "password"]))
      "rolename" "System")
     {:title (format "Adding system user: %s" username)})))

(defn install-login-form [{:keys [auth-base-uri]}]
  (binding [*heading* "Install login form"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          uri-map {"https://auth.example.org" auth-base-uri}
          installers ["https://auth.example.org/login-with-form"]]

      (install! installers uri-map {} {:title "Installing login form"}))))

(defn openid [{:keys [auth-base-uri iss client-id client-secret]}]
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        params
        (binding [*heading* "Register OpenID client"]
          (into
           {}
           [
            ["iss" iss]
            ["client-id" client-id]
            ["client-secret"
             (input
              {:prompt "Client Secret"
               :value client-secret})]
            ["session-scope" "openid-login-session"]]))]

    (install!
     [(str auth-base-uri "/login-with-openid")
      (str auth-base-uri "/openid/callback")]
     {"https://auth.example.org" auth-base-uri}
     params
     {:title "Installing OpenAPI"})))

(defn request-access-token
  [{:keys [auth-base-uri data-base-uri username client-id duration]}]
  (binding [*heading* "Requesting access token"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          data-base-uri (or data-base-uri (input-data-base-uri))
          username (input {:prompt "Username" :value username})
          client-id (input {:prompt "Client-id" :value client-id})
          duration (input {:prompt "Duration" :value duration})]
      (push!
       `(~'make-access-token!
         {:authorization-server ~auth-base-uri
          :user ~(format "%s/_site/users/%s" data-base-uri username)
          :client-id ~client-id
          :duration ~duration})
       {}))))

#_(defn register-scope
  [{:keys [auth-base-uri scope description operations]}]
  (binding [*heading* "Register scope"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))

          scope (input {:prompt "Scope" :value (or scope (str auth-base-uri "/scopes/"))})

          description
          (input {:prompt "Description"
                  :value (or description "")})

          operations-as-csv
          (input {:prompt "Operations (comma separated)"
                  :value (or (str/join ", " operations) (str auth-base-uri "/operations/"))})

          installers [scope]
          uri-map {"https://auth.example.org" auth-base-uri}]

      (install!
       installers uri-map
       {"operations-in-scope" (set (map str/trim (str/split operations-as-csv #",")))
        "description" description}
       {:title (format "Adding scope: %s" scope)}))))

(defn reinstall [{:keys [auth-base-uri resource]}]
  (install!
   [resource]
   {"https://auth.example.org" auth-base-uri}
   {}
   {:title (format "Reinstalling %s" resource)}))
