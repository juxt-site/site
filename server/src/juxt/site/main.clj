;; Copyright © 2021, JUXT LTD.

(ns juxt.site.main
  (:require
   juxt.site.schema
   [aero.core :as aero]
   [clojure.java.io :as io]
   [clojure.tools.logging :as log]
   [integrant.core :as ig]))

(def ^:dynamic *system* nil)

(def profile :prod)

(let [lock (Object.)]
  (defn- load-namespaces
    [system-config]
    (locking lock
      (ig/load-namespaces system-config))))

;; There will be integrant tags in our Aero configuration. We need to
;; let Aero know about them using this defmethod.
(defmethod aero/reader 'ig/ref [_ _ value]
  (ig/ref value))

(def config
  "Read EDN config, with the given aero options. See Aero docs at
  https://github.com/juxt/aero for details."
  (memoize
   (fn [filename]
     (log/infof "Configuration profile: %s" (name profile))
     (let [config-file (io/file (System/getProperty "user.home") ".config/site/" (str filename ".edn"))]
       (when-not (.exists config-file)
         (log/error (str "Configuration file does not exist: " (.getAbsolutePath config-file)))
         (throw (ex-info
                 (str "Please copy a configuration file to " (.getAbsolutePath config-file))
                 {})))
       (log/debug "Loading configuration from" (.getAbsolutePath config-file))
       (aero/read-config config-file {:profile profile})))))

(defn system-config
  "Construct a new system, configured with the given profile"
  [config-filename]
  (let [config (config config-filename)
        system-config (:ig/system config)]
    (load-namespaces system-config)
    (ig/prep system-config)))

(defn -main [& file]
  (log/info "Starting system")

  (let [system-config (system-config "config")
        system (ig/init system-config)]
    (log/infof "Configuration: %s" (pr-str system-config))

    (log/info "System started and ready...")
    (log/trace "TRACE on")
    (Thread/setDefaultUncaughtExceptionHandler
     (reify Thread$UncaughtExceptionHandler
       (uncaughtException [_ _ throwable]
         (throw (ex-info "Default Exception caught:" throwable)))))

    (.addShutdownHook
     (Runtime/getRuntime)
     (Thread.
      (fn []
        (ig/halt! system))))
    (alter-var-root #'*system* (constantly system)))
  @(promise))
