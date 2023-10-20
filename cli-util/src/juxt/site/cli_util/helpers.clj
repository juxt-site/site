;; Copyright © 2023, JUXT LTD.

(ns juxt.site.cli-util.helpers
  (:require
   [juxt.site.cli-util.cli-util :as util]
   [babashka.http-client :as http]))

(defn resource-server-post [{:keys [content-type body path]}]
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        {:keys [status body]}
        (http/post
         (str base-uri path)
         {:headers {:content-type content-type
                    :authorization (util/authorization cfg)}
          :body body
          :throw false})]
    (case status
      200 (print body)
      (print status body))))
