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

(defn ping []
  (let [{:keys [status body]} (http/get "http://localhost:4444/_site/healthcheck")]
    (cond
      (= status 200)
      (println body)
      :else
      (do
        (println "Not OK")
        (println body)))))

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

(defn login []
  (let [{authorization-server "authorization_server"
         curl "curl"}
        (config)

        {token-endpoint "token_endpoint"
         grant-type "grant_type"
         username "username"
         password "password"
         client-id "client_id"}
        authorization-server

        {:keys [status body]}
        (http/post token-endpoint
                   {:headers {"content-type" "application/x-www-form-urlencoded"}
                    :body (format
                           "grant_type=%s&username=%s&password=%s&client_id=%s"
                           grant-type
                           (java.net.URLEncoder/encode username)
                           (java.net.URLEncoder/encode password)
                           client-id)})

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
                  "# This was added by site login"
                  (format "oauth2-bearer %s" access-token))))))

      bearer-token-file (spit bearer-token-file (format "oauth2-bearer %s" access-token))
      :else (println access-token))))

(defn add-user []

  )
