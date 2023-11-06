;; Copyright © 2021, JUXT LTD.

(ns juxt.site.listener
  (:require
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [ring.adapter.jetty :refer [run-jetty]]
   [juxt.site.handler :refer [make-handler]])
  (:import (java.lang.management ManagementFactory)
           (org.eclipse.jetty.jmx MBeanContainer)))

(defmethod ig/init-key ::listener [_ {port :juxt.site/port, dynamic? :juxt.site/dynamic?, :as opts}]
  (log/infof "Starting HTTP listener on port %d" port)
  (let [mb-container (MBeanContainer. (ManagementFactory/getPlatformMBeanServer))]
    (doto
        (run-jetty
         ;; Dynamic mode helps in development where performance is less critical than
         ;; development speed. Dynamic mode allows functions to be re-evaled.
         (if dynamic?
           (fn [req] (let [h (#'make-handler opts)] (h req)))
           (make-handler opts))
         {:port port :join? false})
        (.addEventListener mb-container)
        (.addBean mb-container))))

(defmethod ig/halt-key! ::listener [_ s]
  (when s
    (log/info "Stopping HTTP listener")
    (.stop s)))
