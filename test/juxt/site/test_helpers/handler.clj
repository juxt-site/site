;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.handler
  (:require
   [juxt.site.handler :as h]
   [juxt.site.test-helpers.xt :refer [*xt-node*]]))

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
