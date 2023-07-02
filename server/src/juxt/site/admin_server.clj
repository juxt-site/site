;; Copyright © 2023, JUXT LTD.

(ns juxt.site.admin-server
  (:require
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [ring.adapter.jetty :refer [run-jetty]]
   [juxt.site.handler :refer [make-handler]])
  (:import (java.lang.management ManagementFactory)
           (org.eclipse.jetty.jmx MBeanContainer)))

(defmethod ig/init-key ::server [_ {:juxt.site/keys [port dynamic?] :as opts}]
  (log/infof "Starting HTTP listenner (admin) on port %d" port)
  (let [mb-container (MBeanContainer. (ManagementFactory/getPlatformMBeanServer))]
    (doto
        (run-jetty
         ;; Dynamic mode helps in development where performance is less critical than
         ;; development speed. Dynamic mode allows functions to be re-evaled.
         (if dynamic?
           (fn [req] (let [h (#'make-handler opts)] (h req)))
           (make-handler opts))
         {:port port
          :join? false
          ;; For security, it is CRITICAL that this server is only
          ;; bound to localhost so it is not available via the
          ;; network.
          :host "localhost"})
      (.addEventListener mb-container)
      (.addBean mb-container))))

(defmethod ig/halt-key! ::server [_ s]
  (when s
    (log/info "Stopping Jetty server")
    (.stop s)))
