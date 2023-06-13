;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.tasks
  (:require
   [babashka.http-client :as http]
   [clj-yaml.core :as yaml]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [cheshire.core :as json]
   [clojure.string :as str]))

(defn debug []
  (println "DEBUG")
  )

(defn curl-config-file []
  (or
   (when (System/getenv "CURL_HOME")
     (io/file (System/getenv "CURL_HOME") ".curlrc"))
   (when (System/getenv "XDG_CONFIG_HOME")
     (io/file (System/getenv "XDG_CONFIG_HOME") ".curlrc"))
   (when (System/getenv "HOME")
     (io/file (System/getenv "HOME") ".curlrc"))))

(defn config []
  (or
   (let [config-file (io/file (System/getenv "HOME") ".config/site/client.edn")]
     (when (.exists config-file)
       (edn/read-string (slurp config-file))))

   (let [config-file (io/file (System/getenv "HOME") ".config/site/client.json")]
     (when (.exists config-file)
       (json/parse-string (slurp config-file))))

   (let [config-file (io/file (System/getenv "HOME") ".config/site/client.yaml")]
     (when (.exists config-file)
       (yaml/parse-string (slurp config-file) {:keywords false})))

   {"empty_configuration" true}))

(defn config-as-json []
  (println (json/generate-string (config))))

(defn ping []
  (let [{resource-server "resource_server"} (config)
        {data-base-uri "base_uri"} resource-server
        url (str data-base-uri "/_site/healthcheck")
        {:keys [status body]} (http/get url)]
    (println "Checking" url)
    (cond
      (= status 200)
      (println "Response:" body)
      :else
      (do
        (println "Not OK")
        (println body)))))

(defn get-token []
  (let [{authorization-server "authorization_server"
         curl "curl"}
        (config)

        {auth-base-uri "base_uri"
         ;;grant-type "grant_type"
         ;;username "username"
         ;;password "password"
         ;;client-id "client_id"
         }
        authorization-server

        token-endpoint (str auth-base-uri "/oauth/token")

        {:keys [status body]}
        (http/post
         token-endpoint
         {:headers {"content-type" "application/x-www-form-urlencoded"}
          :body (format "grant_type=%s" "client_credentials")})

        _ (when-not (= status 200)
            (println "Not OK, status was" status)
            (System/exit 1))

        {access-token "access_token"} (json/parse-string body)

        {bearer-token-file "bearer_token_file"
         save-bearer-token-to-default-config-file "save_bearer_token_to_default_config_file"}
        curl]

    (cond
      save-bearer-token-to-default-config-file
      (let [config-file (curl-config-file)
            lines (if (.exists config-file)
                    (with-open [rdr (io/reader config-file)]
                      (into [] (line-seq rdr)))
                    [])
            new-lines
            (mapv (fn [line]
                    (if (re-matches #"oauth2-bearer \p{Alnum}+" line)
                      (format "oauth2-bearer %s" access-token)
                      line)) lines)]

        (spit config-file
              (clojure.string/join
               (System/getProperty "line.separator")
               (cond-> new-lines
                 (= lines new-lines)
                 (conj
                  "# This was added by site get-token"
                  (format "oauth2-bearer %s" access-token))))))

      bearer-token-file (spit bearer-token-file (format "oauth2-bearer %s" access-token))
      :else (println access-token))))

(defn add-user []
  (throw (ex-info "Unsupported currently" {})))

(defn jwks []
  (let [{authorization-server "authorization_server"} (config)
        {data-base-uri "base_uri"} authorization-server
        url (str data-base-uri "/.well-known/jwks.json")
        {:keys [status body]} (http/get url)]
    (cond
      (= status 200)
      (println body)
      :else
      (prn (json/generate-string "Not OK")))))
