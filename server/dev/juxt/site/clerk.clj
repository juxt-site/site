;; Copyright © 2023, JUXT LTD.

(ns juxt.site.clerk
  (:require
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [nextjournal.clerk :as clerk]))

(defmethod ig/init-key ::clerk [_ opts]
  (log/infof "Starting Clerk")
  (clerk/serve! {:browse false})
  (clerk/serve! {:watch-paths ["dev/notebooks"]})
  (clerk/show! "dev/notebooks/index.clj")

  {:state :clerk})

(defmethod ig/halt-key! ::clerk [_ s]
  (when s
    (log/info "Stopping Clerk")))
