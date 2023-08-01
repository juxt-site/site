;; Copyright © 2021, JUXT LTD.

(ns user
  (:require
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [io.aviso.ansi :as ansi]
   [juxt.site.main :as main]
   [juxt.site.repl :as repl]
   ;; Push this into repl!
   [malli.dev :as md]
   clojure.main
   fipp.ednize
   juxt.site.schema
   malli.dev.pretty))

(apply require clojure.main/repl-requires)

(defn start []
  (println "Site by JUXT. Copyright (c) 2020-2023, JUXT LTD.")
  (println "Compiling code, please wait...")
  (log/info "Starting development system")
  (alter-var-root #'main/profile (constantly :dev))
  (let [system-config (main/system-config)
        system (ig/init system-config)]
    (alter-var-root #'main/*system* (constantly system)))

  (comment
    (println "Starting Malli development instrumentation")
    (md/start!
     {:report
      (fn [type data]
        (throw (ex-info (format "(user) Malli validation failure: %s" type)
                        {:type type
                         ;; Sometimes this can include the whole db!
                         ;;:data data
                         })))}))

  (log/info "System started and ready...")

  (println)
  (println "Welcome to Site!")

  (println (ansi/yellow "Enter (help) for help"))

  :ready)
