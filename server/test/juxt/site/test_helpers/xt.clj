;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.xt
  (:require
   [clojure.pprint :refer [pprint]]
   [juxt.site.main :as main]
   [xtdb.api :as xt]
   [xtdb.node :as xtn]))

(def ^:dynamic *opts* {})
(def ^:dynamic *xt-node*)

(defmacro with-xt [& body]
  `(with-open [node# (xtn/start-node *opts*)]
     (binding [*xt-node* node#]
       ~@body)))

(defn xt-fixture [f]
  (with-xt (f)))

(defmacro with-system-xt [& body]
  `(with-open [node# (xtn/start-node *opts*)]
     (binding [*xt-node* node#
               main/*system* {:juxt.site.db/xt-node node#}]
       ~@body)))

(defn system-xt-fixture [f]
  (with-system-xt (f)))

;; No longer a thing in XT2
#_(defn submit-and-await! [transactions]
  (->>
   (xt/submit-tx *xt-node* transactions)))
