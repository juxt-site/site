;; # Learning RFC 9110 with Site

;; This is a tutorial to learn HTTP with Site.
;; This notebook covers [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110).

^{::clerk/visibility {:code :hide :result :hide}}
(ns notebooks.rfc-9110
  (:require
   [clojure.string :as str]
   [nextjournal.clerk :as clerk]
   [nextjournal.clerk.viewer :as v]
   [juxt.site.test-helpers.oauth :refer [RESOURCE_SERVER] :as oauth]
   [juxt.site.test-helpers.xt :refer [*xt-node* with-system-xt]]
   [juxt.site.test-helpers.handler :refer [*handler* with-handler make-handler]]
   [juxt.site.handler :as h]
   [xtdb.api :as xt]))

;; Now we define a macro that composes a Site instance

^{::clerk/visibility {:code :hide :result :hide}}
(alter-var-root #'*xt-node* (fn [_] (xt/start-node {})))

^{::clerk/visibility {:code :hide :result :hide}}
(defn wrap-no-op [h]
  (fn [req] (h req)))

^{::clerk/visibility {:code :hide :result :hide}}
(def send-request
  (let [pipeline (h/make-pipeline {:juxt.site/xt-node *xt-node*})
        new-pipeline
        (replace
         {h/wrap-ring-1-adapter wrap-no-op
          #_h/wrap-locate-resource
          #_(fn [h]
            (fn [req]
              (h (assoc req :juxt.site/resource (locate-resource req)))))}
         pipeline)]
    ((apply comp new-pipeline) identity)))

^{::clerk/visibility {:code :hide :result :hide}}
(defn request [method uri req]
  (send-request
   (assoc req :ring.request/method method :juxt.site/uri uri)))

^{::clerk/visibility {:code :hide :result :hide}}
(defn GET [url req]
  (request :get url req))

;; ## Healthcheck

;; Let's make our first request, just see if it's up and running.

(GET "https://data.example.test/_site/healthcheck" {})

;; ## Core Semantics

;; See https://datatracker.ietf.org/doc/html/rfc9110#section-1.3


#_(select-keys
 (*handler* {:ring.request/method :get
             :ring.request/path "/_site/healthcheck"})
 [:ring.response/status
  :ring.response/body])
