;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.handler
  (:require
   [juxt.site.handler :as h]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]
   [clojure.java.io :as io]))

(def ^:dynamic *handler*)

(defn make-handler [opts]
  ((apply comp
          (remove
           #{h/wrap-healthcheck
             h/wrap-ring-1-adapter}
           (h/make-pipeline opts)))
   identity))

(defmacro with-handler [& body]
  `(binding [*handler* (make-handler {:juxt.site/xt-node *xt-node*})]
     ~@body))

(defn handler-fixture [f]
  (with-handler (f)))

(defn assoc-request-body
  "Updates the request with the body, with a Content-Length header to
  avoid a 411 response."
  [req content]
  (let [bytes (.getBytes content)]
    (-> req
     (assoc :ring.request/body (io/input-stream bytes))
     (assoc-in [:ring.request/headers "content-length"] (str (count bytes))))))

(defmacro with-request-body
  [content & body]
  `(let [dlg# *handler*
         content# ~content]
     (binding [*handler*
               (fn [req#]
                 (dlg# (assoc-request-body req# content#)))]
       ~@body)))
