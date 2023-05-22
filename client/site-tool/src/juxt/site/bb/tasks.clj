;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.tasks
  (:require
   [babashka.http-client :as http]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [cheshire.core :as json]))

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

(defn get-token []
  (let [config-file (io/file (System/getenv "HOME") ".config/site/client.edn")]
    (when-not (.exists config-file)
      (println "Config file not found:" (.getAbsolutePath config-file))
      (System/exit 1))
    (let [{:juxt.site/keys [authorization-server]}
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

          {access-token "access_token"} (json/parse-string body)]

      (println "access-token:" access-token))))
