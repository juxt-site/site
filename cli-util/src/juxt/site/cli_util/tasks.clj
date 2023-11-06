;; Copyright © 2023, JUXT LTD.

(ns juxt.site.cli-util.tasks
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clj-yaml.core :as yaml]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [juxt.site.cli-util.cli-util :as util]))

(defn config-file-task []
  (let [files (keep #(let [f (io/file %)]
                         (when (and (.exists f) (.isFile f))
                           (.getAbsolutePath f)))
                      (util/config-files))]
    (doseq [f files]
      (println f))))

(defn profile-task []
  (println (name (util/profile (util/parse-opts)))))

(defn config-task []
  (let [{:keys [format] :as opts} (util/parse-opts)
        cfg (util/config (util/profile opts))]
    (case format
      "edn" (pprint cfg)
      "json" (println (json/generate-string cfg {:pretty true}))
      "yaml" (println (yaml/generate-string cfg)))))

(defn ping-task []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        base-uri (get cfg "base-uri")
        url (str base-uri "/_site/healthcheck")

        {:keys [status body]}
        (try
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

(defn request-token-task []
  (let [opts (util/parse-opts)]
    (when-let [token (util/request-token opts)]
      (util/save-access-token token))))

(defn check-token-task []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        token (or (:token opts) (util/retrieve-token cfg))]
    (util/check-token cfg token)))
