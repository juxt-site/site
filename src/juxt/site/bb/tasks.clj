;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.tasks
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

(defn merge-global-opts [opts]
  (-> opts
      (update :alias assoc :p :profile)
      (update :coerce assoc :profile :keyword)))

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
  {"uri-map"
   {"https://auth.example.org" "http://localhost:4440"
    "https://data.example.org" "http://localhost:4444"}
   "installers-home" (str (System/getenv "SITE_HOME") "/installers")
   "client-credentials"
   {"ask-for-client-secret" true
    "cache-client-secret" true}
   "curl"
   {"save-bearer-token-to-default-config-file" true}})

(defn config [opts]
  (if-let [config-file (config-file)]
    (condp re-matches config-file
      #".*\.edn" (aero/read-config config-file {:profile (get opts :profile :default)})
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
      (println "Response:" body)
      :else
      (do
        (println "Not OK")
        (println body)
        ;;(System/exit 1)
        ))))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

(defn ls []
  (let [{:keys [pattern] :as opts} (parse-opts)
        resources
        (json/parse-string
         (:body
          (http/get
           (cond-> "http://localhost:4911/resources"
             pattern (str "?pattern=" (url-encode pattern)))
           {"accept" "application/json"})))]
    (doseq [res resources]
      (println res))))

(defn find []
  (let [{:keys [pattern] :as opts} (parse-opts)
        resources
        (json/parse-string
         (:body
          (http/get
           (cond-> "http://localhost:4911/resources"
             pattern (str "?pattern=" (url-encode pattern)))
           {"accept" "application/json"})))
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
          (let [resource (json/parse-string
                          (:body
                           (http/get
                            (str "http://localhost:4911/resource?uri=" (url-encode (first result)))
                            {"accept" "application/json"})))]
            (pprint resource)))))))

(defn- save-bearer-token [access-token]
  (let [opts (parse-opts)
        cfg (config opts)
        {bearer-token-file "bearer-token-file"
         save-bearer-token-to-default-config-file "save-bearer-token-to-default-config-file"}
        (get cfg "curl")]
    (cond
      save-bearer-token-to-default-config-file
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

      bearer-token-file (spit bearer-token-file access-token)
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

(defn- client-secret [opts client-id]
  (let [cfg (config opts)

        secret-file (client-secret-file opts client-id)

        ask-for-client-secret? (get-in cfg ["client-credentials" "ask-for-client-secret"])
        cache-client-secret? (get-in cfg ["client-credentials" "cache-client-secret"])

        ;;_ (println "client-secret-file" client-secret-file " exists?" (.exists client-secret-file))
        secret (when (.exists secret-file)
                 (binding [*out* *err*]
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
                  (binding [*out* *err*]
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

(defn- retrieve-bearer-token [cfg]
  (let [{curl "curl" bearer-token-file "bearer-token"} cfg
        {save-bearer-token-to-default-config-file "save-bearer-token-to-default-config-file"} curl
        token (cond
                (and bearer-token-file save-bearer-token-to-default-config-file)
                (throw (ex-info "Ambiguous configuration" {}))

                save-bearer-token-to-default-config-file
                (let [curl-config-file (curl-config-file)]
                  (when (and (.exists curl-config-file) (.isFile curl-config-file))
                    (last (keep (comp second #(re-matches #"oauth2-bearer\s+(.+)" %)) (line-seq (io/reader curl-config-file))))))

                bearer-token-file
                (when (and (.exists bearer-token-file) (.isFile bearer-token-file))
                  (slurp bearer-token-file)))]
    token))

(defn check-token []
  (let [opts (parse-opts)
        cfg (config opts)
        token (retrieve-bearer-token cfg)
        _ (when-not token (System/exit 1))

        secret (client-secret opts "site-cli")
        _ (when-not secret
            (println "No client-secret found")
            (System/exit 1))

        opts (parse-opts)
        cfg (config opts)
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])

        {introspection-status :status introspection-body :body}
        (http/post
         (str auth-base-uri "/oauth/introspect")
         {:basic-auth ["site-cli" client-secret]
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
          (let [claims (json/parse-string introspection-body)]
            (-> claims
                (assoc "issued-at" (claim-time (get claims "iat")))
                (assoc "expires-at" (claim-time (get claims "exp"))))))]

    (println
     (json/generate-string
      (cond-> {"bearer-token" token
               "introspection-status" introspection-status}
        claims
        (assoc "claims" claims))
      {:pretty true}))))

(defn request-token []
  (let [{:keys [client-id grant-type] :as opts} (parse-opts)
        cfg (config opts)
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        token-endpoint (str auth-base-uri "/oauth/token")]
    (case grant-type
      "password"
      (let [{:keys [username password]} opts
            {:keys [status body]}
            (http/post
             token-endpoint
             {:headers {"content-type" "application/x-www-form-urlencoded"}
              :body (format "grant_type=%s&username=%s&password=%s&client_id=%s"
                            "password" username password client-id)
              :throw false})]

        (when-not username
          (throw (ex-info "username must be given" {})))

        (when-not password
          (throw (ex-info "password must be given" {})))

        (case status
          200 (let [{access-token "access_token"} (json/parse-string body)]
                (when access-token
                  (save-bearer-token access-token)))

          (println (format "Not OK, status was %d\nbody was %s" status body))))

      "client_credentials"
      (let [secret (client-secret opts client-id)
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
          200 (let [{access-token "access_token"
                     ;; TODO: Can we use this expires-in to calculate when our token will expire?
                     expires-in "expires_in"}
                    (json/parse-string body)]
                (when access-token
                  (save-bearer-token access-token))
                (println (format "Access token expires in %s seconds" expires-in)))
          400 (let [{error "error"
                     desc "error_description"} (json/parse-string body)]
                (println error)
                (println desc))
          (println "ERROR, status" status ", body:" body))))))

(defn authorization [cfg]
  (format "Bearer %s" (retrieve-bearer-token cfg)))

(defn api-request-json [path]
  (let [opts (parse-opts)
        cfg (config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        endpoint (str data-base-uri path)
        {:keys [status body]} (http/get
                               endpoint
                               {:headers {"content-type" "application/json"
                                          "authorization" (authorization cfg)}})]
    (when (= status 200)
      (print body))))

(defn whoami []
  (api-request-json "/_site/whoami"))

(defn api-endpoints []
  (api-request-json "/_site/api-endpoints"))

(defn users []
  (api-request-json "/_site/users"))

;; This can be replaced by jo, curl and jq
#_(defn add-user [{:keys [username password] :as opts}]
    (let [{resource-server "resource_server"} (config)
          api-endpoint (str (get resource-server "base_uri") "/_site/users")

          token (retrieve-bearer-token)
          ;; Couldn't we just request the token?
          _ (when-not token
              (throw (ex-info "No bearer token" {})))

          cleartext-password
          (when password
            (let [{input-status :status [cleartext-password] :result}
                  (b/gum {:cmd :input
                          :opts (cond-> {:header.foreground "#C72"
                                         :prompt.foreground "#444"
                                         :password true
                                         :width 60
                                         :header (format "Input client secret for %s" username)})})]
              (if-not (zero? input-status)
                (throw (ex-info "Password input failed" {}))
                cleartext-password)))

          request-body (->
                        (cond-> opts
                          (:password opts) (dissoc :password)
                          cleartext-password (assoc :password cleartext-password))
                        json/generate-string)

          {post-status :status response-body :body}
          (http/post
           api-endpoint
           {:headers {"content-type" "application/json"
                      "authorization" (format "Bearer %s" token)}
            :body request-body})]


      (println "post-status:" post-status)
      (println "request-body:" request-body)))

#_(defn jwks []
  (let [{authorization-server "authorization_server"} (config)
        {data-base-uri "base_uri"} authorization-server
        url (str data-base-uri "/.well-known/jwks.json")
        {:keys [status body]} (http/get url)]
    (cond
      (= status 200)
      (println body)
      :else
      (prn (json/generate-string "Not OK")))))

(memoize
 (defn bundles [cfg]
   (let [bundles-file (io/file (get cfg "installers-home") "bundles.edn")]
     (when-not (.exists bundles-file)
       (throw (ex-info "bundles.edn does not exist" {:bundles-file (.getAbsolutePath bundles-file)}))
       )
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

(defn- bundle* [cfg {:juxt.site/keys [description parameters installers]} opts]
  (let [uri-map (get cfg "uri-map")

        parameters
        (resolve-parameters (apply-uri-map uri-map parameters) opts)

        installers (apply-uri-map uri-map installers)

        installer-map (ciu/unified-installer-map
                       (io/file (get cfg "installers-home"))
                       uri-map)

        installers-seq (ciu/installer-seq installer-map parameters installers)]
    installers-seq))

(defn bundle []
  (let [{:keys [bundle] :as opts} (parse-opts)
        cfg (config opts)
        bundles (bundles cfg)

        bundle-name (or bundle
                       (let [{:keys [status result]}
                             (b/gum {:cmd :filter
                                     :opts {:placeholder "Select resource"
                                            :fuzzy false
                                            :indicator "⮕"
                                            :indicator.foreground "#C72"
                                            :match.foreground "#C72"}
                                     :in (io/input-stream (.getBytes (str/join "\n"(sort (keys bundles)))))})]
                         (when-not (zero? status)
                           (throw (ex-info "Error, non-zero status" {})))
                         (first result)))

        installers-seq (bundle* cfg (get bundles bundle-name) opts)]

    ;; JSON - not yet installable
    #_(println (json/generate-string installers-seq {:pretty true}))

    ;; EDN
    (pprint installers-seq)

    ;; The reason to use a zip file is to allow future extensions
    ;; where the zip file can contain binary data, such as images used
    ;; in login screens. Site is very capable at storing and serving
    ;; binary assets. It can also contain signatures, such as
    ;; install.edn.sig.
    #_(with-open [out (new java.util.zip.ZipOutputStream (new java.io.FileOutputStream outfile))]
        (.putNextEntry out (new java.util.zip.ZipEntry "install.edn"))
        (doseq [op installers-seq
                :let [edn {:juxt.site/operation-uri (get-in op [:juxt.site/init-data :juxt.site/operation-uri])
                           :juxt.site/operation-arg (get-in op [:juxt.site/init-data :juxt.site/input])}
                      content (str (with-out-str (pprint edn)) "\r\n")
                      bytes (.getBytes content "UTF-8")]]
          (.write out bytes 0 (count bytes)))
        (.closeEntry out))))

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

(defn new-keypair []
  (let [opts (parse-opts)
        cfg (config opts)
        kid (random-string 16)
        bundles (bundles cfg)
        installers-seq (bundle* cfg (get bundles "juxt/site/keypair") {:kid kid})]
    (pprint installers-seq)))

(defn request-client-secret []

  ;; TODO: The repl (client-secret) must also have a where clause to
  ;; restrict us to the right auth-server! Otherwise we'll be
  ;; potentially fishing out the first of a bundle of client-secrets!

  (let [{:keys [client-id save] :as opts} (parse-opts)
        client-details
        (json/parse-string
         (:body
          (http/get
           (str "http://localhost:4911/applications/" client-id)
           {"accept" "application/json"})))
        client-secret (get client-details "juxt.site/client-secret")

        secret-file (client-secret-file opts client-id)
        ]

    ;;    (pprint (cache-dir opts))

    (binding [*out* (if save (io/writer secret-file) *out*)]
      (println client-secret))

    (when save
      (println "Written client secret to" (.getAbsolutePath secret-file)))))

(defn reset []
  (when (input/confirm "Factory reset and delete ALL resources?")
    (let [{:keys [status body]}
          (http/post "http://localhost:4911/reset")]
      ;; print not println, as the body should be terminated in a CRLF
      (print status body))))
