;; Copyright © 2021, JUXT LTD.

(ns user
  (:require
   [ring.util.codec :as codec]
   [clojure.java.io :as io]
   [clojure.tools.logging :as log]
   [integrant.core :as ig]
   [io.aviso.ansi :as ansi]
   [juxt.clojars-mirrors.nippy.v3v1v1.taoensso.nippy :as nippy]
   [juxt.site.main :as main]
   [juxt.site.repl :as repl]
   [juxt.site.repl :refer :all]
   ;; Push this into repl!
   [malli.dev :as md]
   clojure.main
   fipp.ednize
   juxt.site.schema
   malli.dev.pretty
   xtdb.query
   [xtdb.api :as xt]))

(nippy/extend-freeze
 clojure.lang.Atom :juxt.site.nippy/atom [x data-output]
 (.writeUTF data-output "<atom>"))

(nippy/extend-thaw
 :juxt.site.nippy/atom [data-input]
 (.readUTF data-input)
 nil)

(nippy/extend-freeze
 xtdb.query.QueryDatasource :juxt.site.nippy/db [x data-output]
 (.writeUTF data-output "<db>"))

(nippy/extend-thaw
 :juxt.site.nippy/db [data-input]
 (.readUTF data-input)
 nil)

(apply require clojure.main/repl-requires)

;; This ensures that Fipp doesn't attempt to ednize the entire database upon
;; pretty printing.
(extend-type xtdb.query.QueryDatasource
  fipp.ednize/IOverride
  fipp.ednize/IEdn
  (-edn [db] (pr-str db)))

(defn start []
  (println "Site by JUXT. Copyright (c) 2020-2023, JUXT LTD.")
  (println "Compiling code, please wait...")
  (log/info "Starting development system")
  ;; (alter-var-root #'main/profile (constantly :dev))
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
