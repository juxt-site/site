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



#_(factory-reset!)
#_(ls)

#_(install-resource-groups!
   ["juxt/site/bootstrap"]
   {"https://auth.example.org" "https://auth.site.test"})

#_(install-resource-groups!
 ["juxt/site/openid"]
 {"https://auth.example.org" "https://auth.site.test"})

;; Now we must see if we can update
;; https://auth.site.test/actions/register-openid-client to do the
;; heavy lifting here - it shouldn't be up to the caller.
#_(let [iss "https://juxt.eu.auth0.com"
        client-id "d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"]
    (install-resource-with-action!
     "https://auth.site.test/_site/subjects/system"
     "https://auth.site.test/actions/register-openid-client"
     {:xt/id (format "https://auth.site.test/openid/clients/%s" client-id)

      :juxt.site/client-id "d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"
      :juxt.site/client-secret "gvk-mNdDmyaFsJwN_xVKHPH4pfrInYqJE1r8lRrn0gmoKI4us0Q5Eb7ULdruYZjD"
      :juxt.site/redirect-uri "https://auth.site.test/openid/callback"

      :juxt.site/issuer-configuration (format "https://auth.site.test/openid/issuers/%s" (codec/url-encode iss))
      :juxt.site/client-configuration (format "https://auth.site.test/openid/clients/%s" client-id)}))

#_(e "https://auth.site.test/openid/clients/d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK")

(ls)


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

;; We'll want callbacks too
#_(ls)
