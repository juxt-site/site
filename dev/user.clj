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
   [juxt.site.local-files-util :as local]
   ;; Push this into repl!
   [juxt.site.install :as install]
   [malli.dev :as md]
   [xtdb.api :as xt]
   clojure.main
   fipp.ednize
   juxt.site.schema
   malli.dev.pretty
   xtdb.query))

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
  (println "Site by JUXT. Copyright (c) 2020-2022, JUXT LTD.")
  (println "Compiling code, please wait...")
  (log/info "Starting development system")
  (alter-var-root #'main/profile (constantly :dev))
  (let [system-config (main/system-config)
        system (ig/init system-config)]
    (alter-var-root #'main/*system* (constantly system)))

  (println "Starting Malli development instrumentation")
  (md/start!
   {:report
    (fn [type data]
      (throw (ex-info (format "Malli validation failure: %s" type)
                      {:type type
                       ;; Sometimes this can include the whole db!
                       ;;:data data
                       })))})

  (log/info "System started and ready...")

  (println)
  (println "Welcome to Site!")

  (println (ansi/yellow "Enter (help) for help"))

  :ready)

(comment
  (factory-reset!))

(comment
  (install-resource-groups! ["juxt/site/bootstrap"] AUTH_SERVER))

;; Install OpenID provider
(comment
  (converge!
   ["https://auth.site.test/login-with-openid"
    "https://auth.site.test/openid/callback"]
   {"https://auth.example.org" "https://auth.site.test"}
   {"issuer-configuration" "https://auth.site.test/openid/issuers/https%3A%2F%2Fjuxt.eu.auth0.com"
    "client-configuration" "https://auth.site.test/openid/clients/d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"
    "client-secret" "gvk-mNdDmyaFsJwN_xVKHPH4pfrInYqJE1r8lRrn0gmoKI4us0Q5Eb7ULdruYZjD"}))

;; Facility to analyse dependency graph
(comment
  (install/dependency-graph
   "https://auth.site.test/login-with-openid"
   (install/index-by-id
    (installer-graph
     ["https://auth.site.test/login-with-openid"
      "https://auth.site.test/openid/callback"]
     {"https://auth.example.org" "https://auth.site.test"}
     {"issuer-configuration" "https://auth.site.test/openid/issuers/https%3A%2F%2Fjuxt.eu.auth0.com"
      "client-configuration" "https://auth.site.test/openid/clients/d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"
      "client-secret" "gvk-mNdDmyaFsJwN_xVKHPH4pfrInYqJE1r8lRrn0gmoKI4us0Q5Eb7ULdruYZjD"
      "login-uri" "https://auth.example.org/login-with-openid"}))))

(comment
  (install-resource-groups!
   ["juxt/site/oauth-authorization-server"
    "juxt/site/system-api"] RESOURCE_SERVER))

(comment
  (ls))


;;(e "https://auth.site.test/openid/clients/d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK")

;; Need some way of drilling down the dependency graph
;; Something to analyse which dependencies will be installed on converge
;; Break converge up into steps

(comment
  (ls)

  (xt/entity-history (db) "https://auth.site.test/session-scopes/default" :asc)

  (ls-type "https://meta.juxt.site/types/event")

  (e "https://auth.site.test/_site/events/294"))

;; Can/should we put in dependants?
