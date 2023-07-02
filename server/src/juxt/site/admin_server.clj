;; Copyright © 2023, JUXT LTD.

(ns juxt.site.admin-server
  (:require
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [ring.adapter.jetty :refer [run-jetty]]
   [juxt.site.handler :as h])
  (:import (java.lang.management ManagementFactory)
           (org.eclipse.jetty.jmx MBeanContainer)))

(defn locate-resource [{:juxt.site/keys [uri]
                        :ring.request/keys [path]
                        :as req}]
  (case path
    "/"
    {:juxt.site/methods {:get {}}
     :juxt.http/content-type "text/plain"
     :juxt.http/content "Admin server\r\n"}

    "/resources"
    {:juxt.site/methods {:post {}}
     }

    ;;
    nil))

(defn wrap-locate-resource [h]
  (fn [req]
    (let [res (locate-resource req)]
      (log/debugf "Resource provider: %s" (:juxt.site/resource-provider res))
      (h (assoc req :juxt.site/resource res)))))

(defn wrap-invoke-method [h]
  (fn [{:ring.request/keys [method] :as req}]

    (h (case method
         (:get :head) (h/GET req)
         :post (h/POST req)
         :put (h/PUT req)
         :patch (h/PATCH req)
         :delete (h/DELETE req)
         :options (h/OPTIONS req)))))

(defn wrap-no-op [h]
  (fn [req] (h req)))

(defn make-handler [opts]
  (let [pipeline (h/make-pipeline opts)
        new-pipeline
        (replace
         {h/wrap-locate-resource wrap-locate-resource
          h/wrap-invoke-method wrap-invoke-method
          h/wrap-security-headers wrap-no-op}
         pipeline)]
    ((apply comp new-pipeline) identity)))

(defmethod ig/init-key ::server [_ {:juxt.site/keys [port dynamic?] :as opts}]
  (log/infof "Starting HTTP listener (admin) on port %d" port)
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
          :host "localhost"
          :send-server-version? false})
        (.addEventListener mb-container)
        (.addBean mb-container))))

(defmethod ig/halt-key! ::server [_ s]
  (when s
    (log/info "Stopping Jetty server")
    (.stop s)))
