;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.tasks
  (:refer-clojure :exclude [find])
  (:require
   [aero.core :as aero]
   [babashka.cli :as cli]
   [babashka.http-client :as http]
   [babashka.tasks :as tasks]
   [bblgum.core :as b]
   [cheshire.core :as json]
   [clj-yaml.core :as yaml]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]
   [juxt.site.bb.parameters :refer [resolve-parameters]]
   [juxt.site.bb.user-input :as input]
   [juxt.site.install.common-install-util :as ciu]))

(defmacro stderr [& body]
  `(binding [*out* *err*]
     ~@body))

(defn merge-global-opts [opts]
  (-> opts
      (update :alias assoc :p :profile)
      (update :coerce assoc :profile :keyword)
      (update :coerce assoc :edn :boolean :txt :boolean :txt :boolean)))

(defn parse-opts
  "Take the :opts of the current task and add in globals"
  []
  (cli/parse-opts
   *command-line-args*
   (merge-global-opts (:opts (tasks/current-task)))))

(defn curl-config-file []
  (or
   (when (System/getenv "CURL_HOME")
     (io/file (System/getenv "CURL_HOME") ".curlrc"))
   (when (System/getenv "XDG_CONFIG_HOME")
     (io/file (System/getenv "XDG_CONFIG_HOME") ".curlrc"))
   (when (System/getenv "HOME")
     (io/file (System/getenv "HOME") ".curlrc"))))

(defn config-files []
  (for [dir [(io/file (System/getenv "XDG_CONFIG_HOME"))
             (io/file (System/getenv "HOME") ".config/site")]
        :when (and dir (.exists dir) (.isDirectory dir))
        file [(io/file dir "site-cli.edn")
              (io/file dir "site-cli.json")
              (io/file dir "site-cli.yaml")]]
    (.getAbsolutePath file)))

(defn config-file-task []
  (let [files (keep #(let [f (io/file %)]
                         (when (and (.exists f) (.isFile f))
                           (.getAbsolutePath f)))
                      (config-files))]
    (doseq [f files]
      (println f))))

(defn config-file []
  (let [candidates (config-files)
        files (keep #(let [f (io/file %)]
                         (when (and (.exists f) (.isFile f))
                           (.getAbsolutePath f)))
                      candidates)]
    (cond
      (empty? files) nil
      (and files (= 1 (count files))) (first files)
      :else (throw (ex-info (format "Too many (%d) possible configuration files" (count files))
                            {:candidates files})))))

(defn default-config
  "Return a default config which is useful for getting started"
  []
  {"admin-base-uri" "http://localhost:4911"
   "uri-map" {"https://auth.example.org" "http://localhost:4440"
              "https://data.example.org" "http://localhost:4444"}
   "installers-home" (str (System/getenv "SITE_HOME") "/installers")
   "client-credentials" {"ask-for-client-secret" true
                         "cache-client-secret" true}
   "curl" {"save-access-token-to-default-config-file" true}})

(defn configure
  "Create a static edn configuration file"
  [{:keys [auth-base-uri data-base-uri]}]
  (let [dir (some identity
             [(io/file (System/getenv "XDG_CONFIG_HOME"))
              (io/file (System/getenv "HOME") ".config/site")])
        config-file (io/file dir "site-cli.edn")]
    (when (.exists config-file)
      (throw (ex-info "Config file already exists" {:file config-file})))
    (spit
     config-file
     (with-out-str
       (pprint
        (cond-> (default-config)
          auth-base-uri (assoc-in ["uri-map" "https://auth.example.org"] auth-base-uri)
          data-base-uri (assoc-in ["uri-map" "https://data.example.org"] data-base-uri)
          ))))))

(defn profile [opts]
  (or
   (get opts :profile)
   (keyword (System/getenv "SITE_PROFILE"))
   :default))

(defn profile-task []
  (println (name (profile (parse-opts)))))

(defn config [opts]
  (if-let [config-file (config-file)]
    (condp re-matches config-file
      #".*\.edn" (aero/read-config
                  config-file
                  {:profile (profile opts)})
      #".*\.json" (json/parse-string (slurp config-file))
      #".*\.yaml" (yaml/parse-string (slurp config-file) {:keywords false})
      (throw (ex-info "Unrecognized config file" {:config-file config-file})))
    (default-config)))

(defn config-task []
  (let [{:keys [format] :as opts} (parse-opts)
        cfg (config opts)]
    (case format
      "edn" (pprint cfg)
      "json" (println (json/generate-string cfg {:pretty true}))
      "yaml" (println (yaml/generate-string cfg)))))

(defn ping []
  (let [opts (parse-opts)
        cfg (config opts)
        base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        url (str base-uri "/_site/healthcheck")
        {:keys [status body]} (try
                                (http/get url {:throw false})
                                (catch java.net.ConnectException _
                                  {:status 0}))]
    (println "Checking" url)
    (cond
      (= status 0)
      (println "No response")
      (= status 200)
      (do
        (print "Response:" body)
        (.flush *out*))
      :else
      (do
        (println "Not OK")
        (println body)
        ;;(System/exit 1)
        ))))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

(defn list-task []
  (let [{:keys [pattern] :as opts} (parse-opts)
        cfg (config opts)
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "The admin-server is not reachable."))
      (doseq [res (json/parse-string
                   (:body
                    (http/get
                     (cond-> (str admin-base-uri "/resources")
                       pattern (str "?pattern=" (url-encode pattern)))
                     {:headers {:accept "application/json"}})))]
        (println res)))))

(defn find []
  (let [{:keys [pattern] :as opts} (parse-opts)
        cfg (config opts)
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "The admin-server is not reachable."))
      (let [resources
            (json/parse-string
             (:body
              (http/get
               (cond-> (str admin-base-uri "/resources")
                 pattern (str "?pattern=" (url-encode pattern)))
               {:headers {:accept "application/json"}})))

            resource (cond
                       (= (count resources) 0)
                       nil
                       (= (count resources) 1)
                       (first resources)
                       :else
                       (let [sw (java.io.StringWriter.)
                             _ (with-open [out (java.io.PrintWriter. sw)]
                                 (binding [*out* out]
                                   (doseq [res resources] (println res))))
                             {:keys [status result]}
                             (b/gum {:cmd :filter
                                     :opts {:placeholder "Select resource"
                                            :fuzzy false
                                            :indicator "⮕"
                                            :indicator.foreground "#C72"
                                            :match.foreground "#C72"}
                                     :in (io/input-stream (.getBytes (.toString sw)))})]

                         (when (zero? status)
                           (first result))))]

        (when resource
          (print
           (:body
            (http/get
             (str admin-base-uri "/resource?uri=" (url-encode resource))))))))))

(defn- save-access-token [access-token]
  (let [opts (parse-opts)
        cfg (config opts)
        {access-token-file "access-token-file"
         save-access-token-to-default-config-file "save-access-token-to-default-config-file"}
        (get cfg "curl")]
    (cond
      save-access-token-to-default-config-file
      (let [config-file (curl-config-file)
            lines (if (.exists config-file)
                    (with-open [rdr (io/reader config-file)]
                      (into [] (line-seq rdr)))
                    [])
            new-lines
            (mapv (fn [line]
                    (if (re-matches #"oauth2-bearer\s+.+" line)
                      (format "oauth2-bearer %s" access-token)
                      line)) lines)]

        (spit config-file
              (clojure.string/join
               (System/getProperty "line.separator")
               (cond-> new-lines
                 (= lines new-lines)
                 (conj
                  "# This was added by site request-token"
                  (format "oauth2-bearer %s" access-token)))))
        (println "Access token saved to"
                 (str/replace
                  (.getAbsolutePath config-file)
                  (System/getenv "HOME") "$HOME")))

      access-token-file (spit access-token-file access-token)
      :else (println access-token))))

(defn cache-dir [opts]
  (let [parent-dir
        (or
         (when-let [dir (System/getenv "XDG_CACHE_HOME")] dir)
         (when-let [dir (System/getenv "HOME")] (io/file dir ".cache"))
         )
        fl (io/file parent-dir (str "site/" (name (get opts :profile :default))))]
    (.mkdirs (.getParentFile fl))
    fl))

(defn client-secret-file [opts client-id]
  (let [save-dir (io/file (cache-dir opts) "client-secrets")]
    (.mkdirs save-dir)
    (io/file save-dir client-id)))

(defn input-secret [client-id]
  (input/input {:header (format "Input client secret for %s" client-id)})
  #_(let [{status :status [secret] :result}
        (b/gum {:cmd :input
                :opts (cond-> {:header.foreground "#C72"
                               :prompt.foreground "#444"
                               :width 60
                               :header (format "Input client secret for %s" client-id)})})]
    ;; TODO: Check for status
    (println status)
    secret))

;; Not used?
(defn- client-secret
  "Only use when there is an admin server. We don't want to store client secrets on remote machines."
  [opts client-id]

  (let [cfg (config opts)
        _ (assert (not (get cfg "admin-base-uri")))

        secret-file (client-secret-file opts client-id)

        ask-for-client-secret? (get-in cfg ["client-credentials" "ask-for-client-secret"])
        cache-client-secret? (get-in cfg ["client-credentials" "cache-client-secret"])

        ;;_ (println "client-secret-file" client-secret-file " exists?" (.exists client-secret-file))
        secret (when (.exists secret-file)
                 (stderr
                   (println "Reading client secret from"
                            (str/replace
                             (.getAbsolutePath secret-file)
                             (System/getenv "HOME") "$HOME")))
                 (str/trim (slurp secret-file)))

        secret
        (or secret
            (when ask-for-client-secret?
              (let [{status :status [secret] :result}
                    (b/gum {:cmd :input
                            :opts (cond-> {:header.foreground "#C72"
                                           :prompt.foreground "#444"
                                           :width 60
                                           :header (format "Input client secret for %s" client-id)})})]
                (when cache-client-secret?
                  (stderr
                    (println "Writing client_secret to"
                             (str/replace
                              (.getAbsolutePath secret-file)
                              (System/getenv "HOME") "$HOME")))
                  (spit secret-file secret))
                secret)))]

    secret))

(defn forget-client-secret []
  (let [{:keys [client-id] :as opts} (parse-opts)
        secret-file (client-secret-file opts client-id)]
    (if (.exists secret-file)
      (do
        (println "Deleting" (.getAbsolutePath secret-file))
        (io/delete-file secret-file))
      (println "No such file:" (.getAbsolutePath secret-file)))))

(defn request-client-secret [admin-base-uri client-id]
  (assert admin-base-uri)
  (let [client-details
        (json/parse-string
         (:body
          (http/get
           (str admin-base-uri "/applications/" client-id)
           {"accept" "application/json"})))]
    (get client-details "juxt.site/client-secret")))

;; site request-token --client-secret $(site client-secret)
;; site request-token --username alice --password $(gum input --password)
(defn request-token
  "Acquire an access-token. Remote only."
  [{:keys [client-id grant-type] :as opts}]
  (let [cfg (config opts)
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        token-endpoint (str auth-base-uri "/oauth/token")
        grant-type (cond
                     grant-type grant-type
                     (or (:username opts) (:password opts)) "password"
                     :else "client_credentials")]
    (stderr
     (println
      (format "Requesting access-token from %s\n with grant-type %s" token-endpoint grant-type)))
    (case grant-type
      "password"
      (let [{:keys [username password]} opts
            password (or password (input/input {:header (format "Input password for %s" username)
                                                :password true}))
            {:keys [status body]}
            (http/post
             token-endpoint
             {:headers {:content-type "application/x-www-form-urlencoded"}
              :body (format "grant_type=%s&username=%s&password=%s&client_id=%s"
                            "password" username password client-id)
              :throw false})]

        (when-not username
          (throw (ex-info "username must be given" {})))

        (when-not password
          (throw (ex-info "password must be given" {})))

        (case status
          200 (get (json/parse-string body) "access_token")
          (print status body)))

      "client_credentials"
      (let [secret (or
                    (:client-secret opts)
                    (input-secret client-id))
            _ (when-not secret
                (println "No client-secret found")
                (System/exit 1))
            {:keys [status body]}
            (http/post
             token-endpoint
             {:basic-auth [client-id secret]
              :form-params {"grant_type" "client_credentials"}
              :throw false})]
        (case status
          200 (get (json/parse-string body) "access_token")
          (print status body))))))

(defn- retrieve-token
  [cfg]
  (let [{curl "curl" access-token-file "access-token"} cfg
        {save-access-token-to-default-config-file "save-access-token-to-default-config-file"} curl
        admin-base-uri (get cfg "admin-base-uri")
        client-id "site-cli"
        token (cond
                (and access-token-file save-access-token-to-default-config-file)
                (throw (ex-info "Ambiguous configuration" {}))

                save-access-token-to-default-config-file
                (let [curl-config-file (curl-config-file)]
                  (when (and (.exists curl-config-file) (.isFile curl-config-file))
                    (last (keep (comp second #(re-matches #"oauth2-bearer\s+(.+)" %)) (line-seq (io/reader curl-config-file))))))

                access-token-file
                (when (and (.exists access-token-file) (.isFile access-token-file))
                  (slurp access-token-file)))]
    (if token
      token
      (request-token
       {:client-id client-id
        :client-secret
        (request-client-secret admin-base-uri client-id)}))))

(defn request-token-task [opts]
  (when-let [token (request-token opts)]
    (save-access-token token)))

(defn check-token [cfg token]
  (if-not token
    (stderr (println "Hint: Try requesting an access-token (site request-token)"))
    (let [auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
          introspection-uri (str auth-base-uri "/oauth/introspect")
          {introspection-status :status introspection-body :body}
          (http/post
           introspection-uri
           {:headers {:authorization (format "Bearer %s" token)}
            :form-params {"token" token}
            :throw false})

          zone-id (java.time.ZoneId/systemDefault)

          claim-time
          (fn [seconds]
            (.toString
             (java.time.ZonedDateTime/ofInstant
              (java.time.Instant/ofEpochSecond seconds)
              zone-id)))

          claims
          (when (and (= introspection-status 200) introspection-body)
            (json/parse-string introspection-body))

          metadata
          (when claims
            (cond-> {}
              (get claims "iat") (assoc "issued-at" (claim-time (get claims "iat")))
              (get claims "exp") (assoc "expires-at" (claim-time (get claims "exp")))))]
      (println
       (json/generate-string
        (cond-> {"access-token" token
                 "introspection"
                 (cond-> {"endpoint" introspection-uri
                          "status "introspection-status}
                   claims (assoc "claims" claims)
                   metadata (assoc "metadata" metadata))})
        {:pretty true})))))

(defn check-token-task [opts]
  (let [cfg (config opts)
        token (or (:token opts) (retrieve-token cfg))]
    (check-token cfg token)))

(defn authorization [cfg]
  (format "Bearer %s" (retrieve-token cfg)))

(defn api-request-json [path]
  (let [opts (parse-opts)
        cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        endpoint (str data-base-uri path)
        headers {:content-type "application/json"
                 :authorization (authorization cfg)
                 :accept (cond
                           (get opts :edn) "application/edn"
                           (get opts :txt) "text/plain"
                           (get opts :csv) "text/csv"
                           :else "application/json")}
        {:keys [status body]}
        (http/get
         endpoint
         {:headers headers
          :throw false})]
    (case status
      200 (print body)
      401 (stderr
           (print status body)
           (println "Hint: Try requesting an access-token (site request-token)"))
      (stderr
       (print status body)
       (.flush *out*)))))

(defn whoami [{:keys [verbose] :as opts}]
  (let [path "/_site/whoami"]
    (if-not verbose
      (let [cfg (config opts)
            data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
            ;; TODO: There is a problem with babashka.http-client's
            ;; handling of the accept header :(
            ;; As a workaround, we go direct to the EDN representation.
            endpoint (str data-base-uri path)
            {:keys [status body]} (http/get
                                   endpoint
                                   {:headers {:authorization (authorization cfg)
                                              :accept "application/edn"}
                                    :throw false})]
        (case status
          200 (let [edn (clojure.edn/read-string body)
                    whoami (or
                            (get-in edn [:juxt.site/user :juxt.site/username])
                            (get-in edn [:juxt.site/application :juxt.site/client-id]))]
                (if whoami
                  (println whoami)
                  (stderr
                    (println
                     "No valid subject (hint: try requesting an access token with site request-token)"))))
          401 (do
                (print status body)
                (println "Hint: Try requesting an access-token (site request-token)"))
          (do
            (print status body)
            (.flush *out*))))
      ;; Verbose
      (api-request-json path))))

(defn api-endpoints []
  (api-request-json "/_site/api-endpoints"))

(defn users []
  (api-request-json "/_site/users"))

(defn openapis []
  (api-request-json "/_site/openapis"))

(defn events []
  (api-request-json "/_site/events"))

(defn logs []
  (api-request-json "/_site/logs"))

(memoize
 (defn bundles [cfg]
   (let [bundles-file (io/file (get cfg "installers-home") "bundles.edn")]
     (when-not (.exists bundles-file)
       (throw (ex-info "bundles.edn does not exist" {:bundles-file (.getAbsolutePath bundles-file)})))
     (edn/read-string
      (slurp (io/file (System/getenv "SITE_HOME") "installers/bundles.edn"))))))

(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https?://.*?example.org)([\p{Alnum}-]+)*"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn apply-uri-map [uri-map installers]
  (postwalk
   (fn walk-fn [node]
     (cond
       (string? node) (uri-map-replace node uri-map)
       :else node))
   installers))

(defn- installers-seq
  [cfg
   {parameters :juxt.site/parameters
    installers :juxt.site/installers}
   opts]
  (let [uri-map (get cfg "uri-map")

        parameters
        (resolve-parameters (apply-uri-map uri-map parameters) (apply-uri-map uri-map opts))

        installers
        (apply-uri-map uri-map installers)

        installer-map
        (ciu/unified-installer-map
         (io/file (get cfg "installers-home"))
         uri-map)]

    (ciu/installer-seq installer-map parameters installers)))

(defn bundle [{bundle-name :bundle :as opts}]
  (let [cfg (config opts)
        bundle (get (bundles cfg) bundle-name)]
    (if bundle
      (pprint
       (->> (installers-seq cfg bundle opts)
            ;; (map :juxt.site/init-data)
            ))
      (stderr (println (format "Bundle not found: %s" bundle-name))))))

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



(defn print-or-save-client-secret [{:keys [client-id save] :as opts}]

  ;; TODO: The repl (client-secret) must also have a where clause to
  ;; restrict us to the right auth-server! Otherwise we'll be
  ;; potentially fishing out the first of a bundle of client-secrets!

  (let [cfg (config opts)
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "The admin-server is not reachable."))
      (let [client-secret (request-client-secret admin-base-uri client-id)
            secret-file (client-secret-file opts client-id)]
        (binding [*out* (if save (io/writer secret-file) *out*)]
          (println client-secret))
        (when save
          (stderr
            (println "Written client secret to" (.getAbsolutePath secret-file))))))))

(defn countdown [start]
  (println "(To abort: Control-C)")
  (print "Deleting resources in ")
  (.flush *out*)
  (Thread/sleep 200)
  (doseq [n (reverse (map inc (range start)))]
    (print (str n "... "))
    (.flush *out*)
    (Thread/sleep 1000))
  (println))

;; Equivalent to: curl -X POST http://localhost:4911/reset
(defn reset
  "Delete ALL resources from a Site instance"
  []
  (let [opts (parse-opts)
        cfg (config opts)
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "Cannot reset. The admin-server is not reachable."))
      (let [abort?
            (when-not (:no-confirm opts)
              (when (input/confirm "Factory reset and delete ALL resources?")
                (when-not (:no-countdown opts)
                  (countdown 3))))]
        (if abort?
          (println "Aborting reset")
          (do
            (println "Requesting removal of all resources")
            (let [{:keys [status body]}
                  (http/post (str admin-base-uri "/reset"))]
              ;; print not println, as the body should be terminated in a CRLF
              (print status body))))))))

(defn- install [{:keys [resources-uri access-token]} installers-seq]
  (assert resources-uri)
  (let [{:keys [status body]}
        (http/post
         resources-uri
         {:headers (cond-> {:content-type "application/edn"}
                     access-token (assoc :authorization (format "Bearer %s" access-token)))
          :body (pr-str installers-seq)
          :throw false})]
    (case status
      200 (print body)
      (if (str/blank? body)
        (println status)
        (print status body)))))

(defn- install-bundle [cfg bundle params {:keys [debug] :as opts}]
  (assert bundle)
  (let [title (get bundle :juxt.site/title)
        param-str (str/join ", " (for [[k v] params] (str (name k) "=" v)))
        installers-seq (installers-seq cfg bundle (into opts (for [[k v] params] [(name k) v])))]
    (if debug
      (pprint installers-seq)
      (do
        (println
         (if (str/blank? param-str)
           (format "Installing: %s" title)
           (format "Installing: %s with %s" title param-str)))
        (install opts (->> installers-seq
                           ;; (map :juxt.site/init-data)
                           ))))))

(defn install-bundle-task [{bundle-names :bundle _ :debug :as opts}]
  (let [cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        resources-uri (str data-base-uri "/_site/resources")
        bundles (bundles cfg)]
    (doseq [bundle-name bundle-names
            :let [bundle (get bundles bundle-name)
                  params (dissoc opts :bundle)]]
      (install-bundle
       cfg bundle params
       (assoc opts
              :resources-uri resources-uri
              :access-token (retrieve-token cfg))))))

(defn- install-bundles [{bundle-specs :bundles :as opts}]
  (let [cfg (config opts)
        bundles (bundles cfg)]
    (doseq [[bundle-name params] bundle-specs
            :let [bundle (get bundles bundle-name)]]
      (install-bundle cfg bundle params opts))))

(defn post-init [cfg]
  (let [admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "Cannot init. The admin-server is not reachable."))
      (let [auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
            data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
            insite-secret (request-client-secret admin-base-uri "insite")
            site-cli-secret (request-client-secret admin-base-uri "site-cli")
            token-endpoint (str auth-base-uri "/oauth/token")
            site-api-root (str data-base-uri "/_site")]
        (if-not (and insite-secret site-cli-secret)
          (do
            (println "Register the site-cli app to proceed")
            (println "One way to do this is to run 'site init'"))
          (do
            (println "Next steps: you should continue to configure your Site instance,")
            (println "using one of the following methods:")
            (println)

            (println (format
                      "A. Proceed to https://insite.juxt.site?token_endpoint=%s&client_secret=%s&site_api_root=%s"
                      token-endpoint
                      insite-secret
                      site-api-root))

            (println " or ")
            (println (format "B. Continue with this site tool, acquiring an access token with:" ))
            ;; TODO: We could pipe this to '| xclip -selection clipboard'
            (println (format "site request-token --client-secret %s" site-cli-secret))))))))

(defn post-init-task []
  (let [opts (parse-opts)
        cfg (config opts)]
    (post-init cfg)))

(defn help [cfg]
  (println "Site Help")
  (println))

(defn help-task []
  (let [opts (parse-opts)
        cfg (config opts)]
    (help cfg)))

(defn init [opts]
  (let [cfg (config opts)
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "Cannot init. The admin-server is not reachable."))
      (do
        (install-bundles
         (assoc
          opts
          :resources-uri
          (str admin-base-uri "/resources")
          :bundles
          [["juxt/site/bootstrap" {}]
           ;; Support the creation of JWT bearer tokens
           ["juxt/site/oauth-token-endpoint" {}]
           ;; Install a keypair to sign JWT bearer tokens
           ["juxt/site/keypair" {"kid" (random-string 16)}]
           ;; Install the required APIs
           ["juxt/site/user-model" {}]
           ["juxt/site/api-operations" {}]
           ["juxt/site/protection-spaces" {}]
           ["juxt/site/resources-api" {}]
           ["juxt/site/events-api" {}]
           ["juxt/site/logs-api" {}]
           ["juxt/site/whoami-api" {}]
           ["juxt/site/users-api" {}]
           ["juxt/site/endpoints-api" {}]
           ["juxt/site/applications-api" {}]
           ["juxt/site/openapis-api" {}]

           ["juxt/site/sessions" {}]
           ["juxt/site/roles" {}]

           ;; RFC 7662 token introspection
           ["juxt/site/oauth-introspection-endpoint" {}]
           ;; Register the clients
           ["juxt/site/system-client" {"client-id" "site-cli"}]
           ["juxt/site/system-client" {"client-id" "insite"}]]))

        ;; Delete any stale client-secret files
        (doseq [client-id ["site-cli" "insite"]
                :let [secret-file (client-secret-file opts client-id)]]
          ;; TODO: Replace with babashka.fs
          (.delete secret-file))

        (post-init cfg)))))

(defn new-keypair []
  (let [opts (parse-opts)
        cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])]
    (install-bundles
     (assoc
      opts
      :resources-uri
      (str data-base-uri "/_site/resources")
      :access-token
      (retrieve-token cfg)
      :bundles
      [;; Install a new keypair to sign JWT bearer tokens
       ["juxt/site/keypair" {"kid" (random-string 16)}]]))))

;; Create alice
;; site register-user --username alice --fullname "Alice Carroll" --password $(gum input --password)
;; equivalent to
;; jo -- -s username=alice fullname="Alice Carroll" password=foobar | curl --json @- http://localhost:4444/_site/users
(defn register-user [opts]
  (let [cfg (config opts)
        base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        {:keys [status body]}
        (http/post
         (str base-uri "/_site/users")
         {:headers {:content-type "application/json"
                    :accept "application/json"
                    :authorization (authorization cfg)}
          :body (json/generate-string opts {:pretty true})
          :throw false})]
    (case status
      200 (print body)
      (print status body))))

;; Grant alice a role
;; jo -- -s juxt.site/user=http://localhost:4444/_site/users/alice juxt.site/role=http://localhost:4444/_site/roles/SiteAdmin | curl --json @- http://localhost:4440/operations/assign-role
;; site assign-user-role --username alice --role SiteAdmin
(defn assign-user-role [opts]
  (let [cfg (config opts)
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        {:keys [status body]}
        (http/post
         (str auth-base-uri "/operations/assign-role")
         {:headers {"content-type" "application/edn"
                    "authorization" (authorization cfg)}
          :body (pr-str
                 {:juxt.site/user (str data-base-uri "/_site/users/" (:username opts))
                  :juxt.site/role (str data-base-uri "/_site/roles/" (:role opts))})
          :throw false})]
    (case status
      200 (print body)
      (print status body))))

(defn register-application [{:keys [client-id client-type redirect-uris scope] :as opts}]
  (let [cfg (config opts)
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])

        client-id (or client-id (input/input {:header (format "Input client id")}))
        client-type (or client-type
                        (input/choose
                         ["public" "confidential"]
                         {:header (format "Input client type")}))
        redirect-uris (or redirect-uris
                          (str/split
                           (input/input {:header "Redirect URIs (space-separated)"})
                           #"\s+"))
        scope (or scope (str/split
                         (input/input {:header "Scope (space-separated)"})
                         #"\s+"))
        #_{:keys [status body]}
        #_(http/post
           (str data-base-uri "/_site/applications")
           {:headers {"content-type" "application/json"
                      :accept "application/json"
                      "authorization" (authorization cfg)}
            :body (json/generate-string opts {:pretty true})
            :throw false})]

    (when-not (#{"public" "confidential"} client-type)
      (throw (ex-info "Invalid client-type" {})))

    (println
     (json/generate-string
      {"client_id" client-id
       "client_type" client-type
       "redirect_uris" redirect-uris
       "scope" scope}))

    #_(case status
        200 (print body)
        (print status body))))

(defn bundles-task []
  (doseq [[k _] (bundles (config (parse-opts)))]
    (println k)))

(defn install-openapi [opts]
  (let [cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        access-token (retrieve-token cfg)
        openapi-file (io/file (:openapi opts))]

    (when-not (.exists openapi-file)
      (throw
       (ex-info
        (format "No such file: %s" (.getAbsolutePath openapi-file))
        {:openapi-file openapi-file})))

    (let [[_ suffix] (re-matches #".*\.([^\.]+)" (.getName openapi-file))
          content-type (get {"json" "application/json"
                             ;; Check this is the right mime-type
                             "yaml" "application/yaml"} suffix)]

      (when-not content-type
        (throw (ex-info (format "Unrecognised format: %s" suffix) {:suffix suffix})))

      (let [openapi (json/parse-string (slurp openapi-file))

            _ (when-not (= (get openapi "openapi") "3.0.2")
                (throw (ex-info "Must be 3.0.2" {}))
                )

            mapped-openapi
            (-> openapi
                (update-in ["servers" 0 "url"] (fn [url] (str data-base-uri url))))

            ;; Update with mapped urls
            mapped-openapi
            (postwalk (ciu/make-uri-map-replace-walk-fn
                       (get cfg "uri-map"))
                      mapped-openapi)

            json-body (json/generate-string mapped-openapi)

            {:keys [status body]}
            (http/post
             (str data-base-uri "/_site/openapis")
             {:headers (cond-> {"content-type" "application/json"}
                         access-token (assoc "authorization" (format "Bearer %s" access-token)))
              :body json-body
              :throw false})]

        (if (str/blank? body)
          (println status)
          (do
            (print status body)
            (.flush *out*)))))))

;; site install-openapi demo/petstore/openapi.json
(defn install-openapi-task [opts]
  (try
    (install-openapi opts)
    (catch Exception e
      (if (:debug opts)
        (throw e)
        (binding [*err* *out*]
          (println (.getMessage e)))))))

;; Temporary convenience for ongoing development

(defn register-admin-user [opts]
  (let [password "foobar"]
    (register-user
     (merge {:username "mal"
             :password password
             :fullname "Malcolm Sparks"} opts))
    (assign-user-role
     (merge {:username "mal"
             :role "SiteAdmin"} opts))
    (if-let [token (request-token
                    (merge {:username "mal"
                            :password password
                            :client-id "site-cli"} opts))]
      (save-access-token token)
      (throw (ex-info "Failed to get token" {})))))

;; Call this with a user in the SiteAdmin role
(defn install-openapi-support [opts]
  (let [cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])]
    (install-bundles
     (assoc
      opts
      :resources-uri
      (str data-base-uri "/_site/resources")
      :access-token
      (retrieve-token cfg)
      :bundles
      [
       ;; Assuming https://auth.example.org/session-scopes/form-login-session...
       ["juxt/site/login-form" {}]
       ;; This is public and you may not want to expose this
       ["juxt/site/system-api-openapi" {}]
       ["juxt/site/oauth-authorization-endpoint"
        { ;;"session-scope" "https://auth.example.org/session-scopes/form-login-session"
         }]

       ;; Register swagger-ui
       ;; TODO: Try not registering this one and see the awful Jetty
       ;; error that results!
       ["juxt/site/system-client" {"client-id" "swagger-ui"}]]))

    (println
     (format
      "Now browse to https://petstore.swagger.io/?url=%s/_site/openapi.json"
      data-base-uri))))

(defn install-petstore [opts]
  (let [cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])]

    (install-bundles
     (assoc opts
            :resources-uri (str data-base-uri "/_site/resources")
            :access-token (retrieve-token cfg)
            :bundles
            [["juxt/site/openapis-api" {}]
             ["demo/petstore/operations" {}]
             ["juxt/site/system-client" {"client-id" "petstore"}]]))

    (install-openapi (assoc opts :openapi (str (System/getenv "SITE_HOME") "/demo/petstore/openapi.json")))

    (let [password "foobar"]
      (register-user
       (merge {:username "alice"
               :password password
               :fullname "Alice Carroll"} opts))
      (assign-user-role
       (merge {:username "alice"
               :role "PetstoreOwner"} opts)))

    (println
     (format
      "Now browse to https://petstore.swagger.io/?url=%s/petstore/openapi.json"
      data-base-uri))))
