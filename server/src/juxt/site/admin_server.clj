;; Copyright © 2023, JUXT LTD.

(ns juxt.site.admin-server
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.walk :refer [postwalk]]
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [ring.adapter.jetty :refer [run-jetty]]
   [juxt.site.handler :as h]
   [juxt.site.operations :as operations]
   [clojure.edn :as edn]
   [jsonista.core :as json]
   [xtdb.api :as xt]
   [ring.util.codec :refer [form-decode]])
  (:import (java.lang.management ManagementFactory)
           (org.eclipse.jetty.jmx MBeanContainer)))

(defn locate-resource [{path :ring.request/path}]
  (condp re-matches path
    #"/"
    {:juxt.site/methods {:get {}}
     :juxt.http/content-type "text/plain"
     :juxt.http/content "Admin server\r\n"}

    #"/resources"
    {:juxt.site/methods
     {:get
      {::invoke
       (fn [{db :juxt.site/db
             query :ring.request/query
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
                   (throw (ex-info "No pattern in query parameters" {:ring.response/status 400})))

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
       {"accept" "application/edn,application/json"}
       ::invoke
       (fn [{xt-node :juxt.site/xt-node, db :juxt.site/db, :as req}]
         (let [req (h/receive-representation req)
               rep (:juxt.site/received-representation req)
               body (slurp (:juxt.http/body rep))

               installer-seq (case (:juxt.http/content-type rep)
                               "application/edn" (edn/read-string body)
                               "application/json" (json/read-value body (json/object-mapper {:decode-key-fn true})))
               tx-ops (operations/bundle->tx-ops
                       nil ; this is the 'nil' subject
                       db installer-seq)

               _ (operations/apply-ops! xt-node tx-ops)

               response-body
               (-> {:message "Resources successfully installed"
                    :count (count installer-seq)
                    ;;:uris (mapv :juxt.site/uri results)
                    }
                   (json/write-value-as-string (json/object-mapper {:pretty true}))
                   (str "\r\n"))]

           (-> req
               (update :ring.response/headers (fnil merge {})
                       {"content-length" (str (count response-body))
                        "content-type" "application/edn"})
               (assoc :ring.response/body response-body))))}}

     :juxt.http/content-type "application/json"}

    #"/resource"
    {:juxt.site/methods
     {:get
      {::invoke
       (fn [{db :juxt.site/db, query :ring.request/query, :as req}]
         (assert query)
         (let [result
               (if-let [uri (get (form-decode query) "uri")]
                 (postwalk
                  (fn [x] (if (and (vector? x)
                                   (#{:juxt.http/content :juxt.http/body} (first x))
                                   (> (count (second x)) 1024))

                            [(first x)
                             (cond
                               (= :juxt.http/content (first x)) (str (subs (second x) 0 80) "…")
                               :else (format "(%d bytes)" (count (second x))))]
                            x))
                  (xt/entity db uri))
                 (throw (ex-info "No pattern in query parameters" {:ring.response/status 400})))
               body (str
                     (json/write-value-as-string result (json/object-mapper {:pretty true}))
                     "\r\n")]
           (-> req
               (assoc-in [:ring.response/headers "content-length"] (str (count body)))
               (assoc :ring.response/body body))))}}

     :juxt.http/content-type "application/json"}

    #"/applications/(.+)"
    :>>
    (fn [[_ client-id]]
      {:juxt.site/methods
       {:get
        {::invoke
         (fn [{db :juxt.site/db, :as req}]
           (let [result
                 (->> (xt/q
                       db
                       '{:find [(pull e [*])]
                         :where [[e :juxt.site/type "https://meta.juxt.site/types/application"]
                                 [e :juxt.site/client-id client-id]]
                         :in [client-id]} client-id)
                      (map first)
                      first)
                 body (str
                       (json/write-value-as-string result (json/object-mapper {:pretty true}))
                       "\r\n")]
             (-> req
                 (assoc-in [:ring.response/headers "content-length"] (str (count body)))
                 (assoc :ring.response/body body))))}}

       :juxt.http/content-type "application/json"})

    #"/reset"
    {:juxt.site/methods
     {:post
      {::invoke
       (fn [{xt-node :juxt.site/xt-node, db :juxt.site/db, :as req}]
         (->>
          (xt/submit-tx
           xt-node
           (for [id (map first (xt/q db '{:find [e] :where [[e :xt/id]]}))]
             [:xtdb.api/evict id]))
          (xt/await-tx xt-node))

         (let [content "System Reset Complete\r\n"]
           (-> req
               (update :ring.response/headers assoc "content-type" "text/plain")
               (update :ring.response/headers assoc "content-length" (str (count content)))
               (assoc :ring.response/body content))))}}}

    {:juxt.site/type "https://meta.juxt.site/types/not-found"
     :juxt.site/methods {}}))

(defn wrap-locate-resource [h]
  (fn [req]
    (let [res (locate-resource req)]
      (log/debugf "Resource provider: %s" (:juxt.site/resource-provider res))
      (h (assoc req :juxt.site/resource res)))))

(defn wrap-invoke-method [h]
  (fn [{method :ring.request/method, :as req}]
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

(defmethod ig/init-key ::listener [_ {port :juxt.site/port, dynamic? :juxt.site/dynamic?, :as opts}]
  (log/infof "Starting HTTP listener (admin) on port %d" port)
  (let [mb-container (MBeanContainer. (ManagementFactory/getPlatformMBeanServer))
        opts (assoc opts ::admin-server true)]
    (doto
        (run-jetty
         ;; Dynamic mode helps in development where performance is less critical than
         ;; development speed. Dynamic mode allows functions to be re-evaled.
         (if dynamic?
           (fn [req] (let [h (#'make-handler opts)] (h req)))
           (make-handler opts))
         {:port port
          :join? false
          ;; For security, it is CRITICAL that this listener is only
          ;; bound to localhost so it is not available via the
          ;; network.
          :host "localhost"
          :send-server-version? false})
        (.addEventListener mb-container)
        (.addBean mb-container))))

(defmethod ig/halt-key! ::listener [_ s]
  (when s
    (log/info "Stopping HTTP listener (admin)")
    (.stop s)))
