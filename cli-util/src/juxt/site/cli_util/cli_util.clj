;; Copyright © 2023, JUXT LTD.

(ns juxt.site.cli-util.cli-util
  (:require
   [aero.core :as aero]
   [babashka.cli :as cli]
   [babashka.http-client :as http]
   [babashka.tasks :as tasks]
   [cheshire.core :as json]
   [clj-yaml.core :as yaml]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [juxt.site.cli-util.user-input :as input]))

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

(defn config-files []
  (for [dir [(io/file (System/getenv "XDG_CONFIG_HOME"))
             (io/file (System/getenv "HOME") ".config/site")]
        :when (and dir (.exists dir) (.isDirectory dir))
        file [(io/file dir "site-cli.edn")
              (io/file dir "site-cli.json")
              (io/file dir "site-cli.yaml")]]
    (.getAbsolutePath file)))

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

(defn profile [opts]
  (or
   (some-> (get opts :profile) name)
   (System/getenv "SITE_PROFILE")
   :default))

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

(defn config [profile]
  (assert profile)
  (if-let [config-file (config-file)]
    (condp re-matches config-file
      #".*\.edn" (aero/read-config
                  config-file
                  {:profile profile})
      #".*\.json" (json/parse-string (slurp config-file))
      #".*\.yaml" (yaml/parse-string (slurp config-file) {:keywords false})
      (throw (ex-info "Unrecognized config file" {:config-file config-file})))
    (default-config)))

(defn- request-token*
  [{:keys [profile grant-type client-id client-secret username password]}]
  (let [cfg (config profile)
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        token-endpoint (str auth-base-uri "/oauth/token")]
    (stderr
     (println
      (format "Requesting access-token from %s\n with grant-type %s" token-endpoint grant-type)))
    (case grant-type
      "password"
      (let [{:keys [status body]}
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
      (let [secret client-secret
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

(defn request-client-secret [admin-base-uri client-id]
  (assert admin-base-uri)
  (let [client-details
        (json/parse-string
         (:body
          (http/get
           (str admin-base-uri "/applications/" client-id)
           {"accept" "application/json"})))]
    (get client-details "juxt.site/client-secret")))

(defn curl-config-file []
  (or
   (when (System/getenv "CURL_HOME")
     (io/file (System/getenv "CURL_HOME") ".curlrc"))
   (when (System/getenv "XDG_CONFIG_HOME")
     (io/file (System/getenv "XDG_CONFIG_HOME") ".curlrc"))
   (when (System/getenv "HOME")
     (io/file (System/getenv "HOME") ".curlrc"))))

(defn save-access-token [access-token]
  (let [opts (parse-opts)
        cfg (config (profile opts))
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

(defn input-secret [client-id]
  (input/input {:header (format "Input client secret for %s" client-id)}))

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

(defn request-token
  "Acquire an access-token. Remote only."
  [{:keys [client-id grant-type client-secret] :as opts}]
  (let [grant-type (cond
                     grant-type grant-type
                     (or (:username opts) (:password opts)) "password"
                     :else "client_credentials")
        username (:username opts)
        password (when (= grant-type "password")
                   (or (:password opts)
                       (input/input {:header (format "Input password for %s" username)
                                     :password true})))

        client-secret (when (= grant-type "client_credentials")
                        (or
                         client-secret
                         (input-secret client-id)))
        profile (profile opts)

        token (request-token*
               {:profile profile
                :client-id client-id
                :client-secret client-secret
                :grant-type grant-type
                :username username
                :password password})]
    (when token
      (save-access-token token))))

(defn retrieve-token
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
