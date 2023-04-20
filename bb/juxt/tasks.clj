;; Copyright © 2023, JUXT LTD.

(ns juxt.tasks
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
   #"(https://.*?example.org)([\p{Alnum}-]+)*"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn get-group-resources [group-name]
  (get-in GROUPS [group-name :juxt.site/resources]))

(defn apply-uri-map [uri-map resources]
  (postwalk
   (fn walk-fn [node]
     (cond
       (string? node) (uri-map-replace node uri-map)
       :else node))
   resources))

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
                  :opts (or opts {})})]
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

(defn install! [resources uri-map parameter-map install-opts]

  ;; Can we access juxt.site.test-helpers.local-files-util/install-resource-groups! from here?

  ;; 1. Ask tree to return an installer-seq
  (let [installer-map (ciu/unified-installer-map
                       (io/file (System/getenv "SITE_HOME") "installers")
                       uri-map)
        installers (ciu/installer-seq resources installer-map parameter-map)
        existing (set (edn/read-string (push! `(~'find-resources ~(mapv :juxt.site/uri installers)) {:title "Retrieving existing resources"})))
        remaining-installers (remove (comp existing :juxt.site/uri) installers)
        heading (or (:title install-opts) *heading* "TITLE")]

    (cond
      (pos? (count existing))
      (when (confirm (format "%s\n\nResources to overwrite\n\n%s\n\nResources to install\n\n%s\n\nGo ahead?\n"
                             heading
                             (str/join "\n" (sort existing))
                             (str/join "\n" (sort (map :juxt.site/uri remaining-installers)))))
        (push! `(~'call-installers! (quote ~installers)) {}))

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
  (ls `(~'ls-type ~(format "https://meta.juxt.site/types/%s" typ))))

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
              :default "https://"}))

(defn input-data-base-uri []
  (input-uri {:prompt "Enter data base URI"
              :default "https://"}))

(defn bootstrap [{:keys [auth-base-uri]}]
  ;; Use install-resource-groups!
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        resources
        (->>
         (get-in GROUPS ["juxt/site/bootstrap" :juxt.site/resources])
         (mapv #(str/replace % "https://auth.example.org" auth-base-uri)))]
    (install!
     resources
     {"https://auth.example.org" auth-base-uri}
     {}
     {:title "Bootstrapping"
      :success-message "Bootstrap succeeded"})))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

(defn openid [{:keys [auth-base-uri iss client-id client-secret]}]
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        params
        (binding [*heading* "Register OpenID client"]
          (into
           {}
           [
            #_["issuer-configuration"
             (str auth-base-uri
                  "/openid/issuers/"
                  (url-encode
                   (input
                    {:prompt "Issuer"
                     :value iss})))]

            ["iss" iss]


            ["client-id" client-id]

            #_["client-configuration"
             (str auth-base-uri
                  "/openid/clients/"
                  (url-encode
                   (input
                    {:prompt "Client ID"
                     :value client-id})))]

            ["client-secret"
             (input
              {:prompt "Client Secret"
               :value client-secret})]

            #_["session-scope" (str auth-base-uri "/session-scopes/openid-login-session")]
            ["session-scope" "openid-login-session"]]))]

    (install!
     [(str auth-base-uri "/login-with-openid")
      (str auth-base-uri "/openid/callback")]
     {"https://auth.example.org" auth-base-uri}
     params
     {:title "Installing OpenAPI"})))

(defn system-api [{:keys [auth-base-uri data-base-uri]}]
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        data-base-uri (or data-base-uri (input-data-base-uri))

        uri-map {"https://auth.example.org" auth-base-uri
                 "https://data.example.org" data-base-uri}

        resources (->> (get-group-resources "juxt/site/system-api")
                       (apply-uri-map uri-map))]

    (install! resources uri-map {} {:title "Installing System API"})))

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

(defn auth-server [{:keys [auth-base-uri]}]
  (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
        kid "default-auth-server"
        uri-map {"https://auth.example.org" auth-base-uri}
        resources
        (->>
         (get-group-resources "juxt/site/oauth-authorization-server")
         (apply-uri-map uri-map))]
    (install!
     resources
     uri-map
     {"session-scope" (str auth-base-uri "/session-scopes/openid-login-session")
      "keypair" (format "%s/keypairs/%s" auth-base-uri kid)
      "authorization-code-length" 12
      "jti-length" 12}
     {:title "Installing authorization server"})))

(defn register-application
  [{:keys [auth-base-uri client-id origin resource-server redirect-uris scope]}]
  (binding [*heading* "Register application"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          client-id (input {:prompt "Client ID" :value client-id})
          uri-map {"https://auth.example.org" auth-base-uri}
          resources (->>
                     [(format "https://auth.example.org/clients/%s" client-id)]
                     (apply-uri-map uri-map))]

      (install!
       resources uri-map
       {}
       {:title (format "Adding OAuth client: %s" client-id)}))))

(defn add-user [{:keys [auth-base-uri data-base-uri username fullname iss nickname]}]
  (binding [*heading* "Add user"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          data-base-uri (or data-base-uri (input-data-base-uri))
          username (input {:prompt "Username" :value username})
          fullname (input {:prompt "Full name" :value fullname})
          iss (input {:prompt "Issuer" :value iss})
          nickname (input {:prompt "Nick name" :value nickname})

          user (format "%s/users/%s" data-base-uri (url-encode username))

          uri-map {"https://auth.example.org" auth-base-uri
                   "https://data.example.org" data-base-uri}

          resources (->>
                     ["https://data.example.org/users/{{username}}"
                      "https://data.example.org/openid/user-identities/{{iss|urlescape}}/nickname/{{nickname}}"]
                     (apply-uri-map uri-map))]

      (install!
       resources uri-map
       {"user" user
        "username" username
        "fullname" fullname
        "iss" iss
        "nickname" nickname}

       {:title (format "Adding user: %s" username)}))))

(defn grant-role [{:keys [auth-base-uri data-base-uri username rolename]}]
  (binding [*heading* "Grant role to user"]
    (let [auth-base-uri (or auth-base-uri (input-auth-base-uri))
          data-base-uri (or data-base-uri (input-data-base-uri))
          username (input {:prompt "Username" :value username})
          rolename (input {:prompt "Role" :value rolename})
          uri-map {"https://auth.example.org" auth-base-uri
                   "https://data.example.org" data-base-uri}
          resources (->>
                     ["https://auth.example.org/role-assignments/{{username}}-{{rolename}}"]
                     (apply-uri-map uri-map))]
      (install!
       resources uri-map
       {"username" username
        "rolename" rolename}
       {:title (format "Granting role %s to %s" rolename username)}))))

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
          :user ~(format "%s/users/%s" data-base-uri username)
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

          resources [scope]
          uri-map {"https://auth.example.org" auth-base-uri}]

      (install!
       resources uri-map
       {"operations-in-scope" (set (map str/trim (str/split operations-as-csv #",")))
        "description" description}
       {:title (format "Adding scope: %s" scope)}))))

(defn reinstall [{:keys [auth-base-uri resource]}]
  (install!
   [resource]
   {"https://auth.example.org" auth-base-uri}
   {}
   {:title (format "Reinstalling %s" resource)}))
