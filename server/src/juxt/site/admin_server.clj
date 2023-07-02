;; Copyright © 2023, JUXT LTD.

(ns juxt.site.admin-server
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [ring.adapter.jetty :refer [run-jetty]]
   [juxt.site.handler :as h]
   [juxt.site.installer :as installer]
   [clojure.edn :as edn]
   [jsonista.core :as json]
   [xtdb.api :as xt]
   [ring.util.codec :refer [form-decode]])
  (:import (java.lang.management ManagementFactory)
           (org.eclipse.jetty.jmx MBeanContainer)))

(defn locate-resource [{:ring.request/keys [path]}]
  (case path
    "/"
    {:juxt.site/methods {:get {}}
     :juxt.http/content-type "text/plain"
     :juxt.http/content "Admin server\r\n"}

    "/resources"
    {:juxt.site/methods
     {:get
      {::invoke
       (fn [{:juxt.site/keys [db]
             :ring.request/keys [query]
             :as req}]
         (let [results
               (if query
                 (if-let [pat (get (form-decode query) "pattern")]
                   (->> (xt/q db '{:find [e]
                                   :where [[e :xt/id]
                                           [(str e) id]
                                           [(re-seq pat id) match]
                                           [(some? match)]]
                                   :in [pat]}
                              (re-pattern pat))
                        (map first)
                        (sort-by str))
                   (throw (ex-info "No pattern in query parameters" {:ring.response/status 401})))

                 (->> (xt/q db '{:find [(pull e [:xt/id :juxt.site/type])]
                                 :where [[e :xt/id]]})
                      (map first)
                      (filter (fn [e]
                                (not (#{"https://meta.juxt.site/types/event"
                                        "https://meta.juxt.site/types/request"}
                                      (:juxt.site/type e)))))
                      (map :xt/id)
                      (sort-by str)))
               body (str
                     (json/write-value-as-string results (json/object-mapper {:pretty true}))
                     "\r\n")]
           (-> req
               (assoc-in [:ring.response/headers "content-length"] (str (count body)))
               (assoc :ring.response/body body))))}
      :post
      {:juxt.site/acceptable
       {"accept"
        ;; TODO: Accept application/json instead
        "application/edn"}
       ::invoke
       (fn [{:juxt.site/keys [xt-node] :as req}]
         (let [req (h/receive-representation req)
               rep (:juxt.site/received-representation req)
               installer-seq (edn/read-string (slurp (:juxt.http/body rep)))
               c (count installer-seq)

               results
               (reduce (fn [results installer]
                         (try
                           (conj results (installer/call-installer xt-node installer))
                           (catch Throwable e
                             (throw
                              (ex-info
                               (format "Failed to install %s" (:id installer))
                               {:installer (:id installer)} e)))))
                       [] installer-seq)

               response-body
               (with-out-str
                 (pprint
                  {:message "Installed"
                   :count c
                   :results results}))]

           (assoc req :ring.response/body response-body)))}}

     :juxt.http/content-type "application/json"}

    {:juxt.site/type "https://meta.juxt.site/types/not-found"
     :juxt.site/methods {}}))

(defn wrap-locate-resource [h]
  (fn [req]
    (let [res (locate-resource req)]
      (log/debugf "Resource provider: %s" (:juxt.site/resource-provider res))
      (h (assoc req :juxt.site/resource res)))))

(defn wrap-invoke-method [h]
  (fn [{:ring.request/keys [method] :as req}]
    (if-let [f (get-in req [:juxt.site/resource :juxt.site/methods method ::invoke])]
      (f req)
      (h (case method
           (:get :head) (h/GET req)
           :post (h/POST req)
           :put (h/PUT req)
           :patch (h/PATCH req)
           :delete (h/DELETE req)
           :options (h/OPTIONS req))))))

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
