;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.tasks
  (:require
   [babashka.http-client :as http]
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

(defn get-token []
  (let [config-file (io/file (System/getenv "HOME") ".config/site/client.edn")]
    (when-not (.exists config-file)
      (println "Config file not found:" (.getAbsolutePath config-file))
      (System/exit 1))
    (let [{:juxt.site/keys [authorization-server curl]}
          (edn/read-string (slurp config-file))

          {:juxt.site/keys [token-endpoint grant-type username password client-id]}
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

          {:juxt.site/keys [bearer-token-file
                            save-bearer-token-to-default-config-file]} curl]

      (cond
        save-bearer-token-to-default-config-file
        (let [config-file (curl-config-file)
              lines (if (.exists config-file)
                      (with-open [rdr (io/reader config-file)]
                        (into [] (line-seq rdr)))
                      [])
              new-lines
              (mapv (fn [line]
                      (if (re-matches #"oauth-bearer \p{Alnum}+" line)
                        (format "oauth-bearer %s" access-token)
                        line)) lines)]

          (spit config-file
                (clojure.string/join
                 (System/getProperty "line.separator")
                 (cond-> new-lines
                   (= lines new-lines)
                   (conj
                    "# This was added by site get-token"
                    (format "oauth-bearer %s" access-token))))))

        bearer-token-file (spit bearer-token-file (format "oauth-bearer %s" access-token))
        :else (println access-token)))))
