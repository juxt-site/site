;; Copyright © 2022, JUXT LTD.

(ns juxt.site.logging
  (:require
   [clojure.java.io :as io]
   [clojure.xml :as xml]
   [jsonista.core :as json])
  (:import (org.slf4j MDC)))

(defmacro with-logging [& body]
  `(try
     (MDC/put "logging" "on")
    ~@body
    (finally
      (MDC/remove "logging"))))

(defn log-events
  "Returns a sequence of EDN documents"
  []
  (with-open [r (.openStream (io/resource "logback.xml"))]
    (when-let [[{elements :content}]
               (filter
                #(and (= (:tag %) :appender) (= (get-in % [:attrs :name]) "JSON_LOG_FILE"))
                (:content (xml/parse r)))]
      (when-let [log-file (first (:content (first (filter #(= (:tag %) :file) elements))))]
        (with-open [r (io/reader (io/file log-file))]
          (mapv json/read-value (line-seq r)))))))
