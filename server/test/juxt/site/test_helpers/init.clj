;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.init
  (:require
   [juxt.site.test-helpers.install :as install]
   [juxt.site.install.common-install-util :as ciu]
   [juxt.site.test-helpers.local-files-util :as local]))

(def CONFIG
  {"uri-map"
   {"https://auth.example.org" "https://auth.example.test"
    "https://data.example.org" "https://data.example.test"}})

(defn uri-map []
  (get CONFIG "uri-map"))

(defn init []
  (local/install-bundles!
   [["juxt/site/bootstrap" {}]
    ;; Support the creation of JWT bearer tokens
    ["juxt/site/oauth-token-endpoint" {}]
    ;; Install a keypair to sign JWT bearer tokens
    ["juxt/site/keypair" {"kid" "test-kid"}]
    ;; Install the required APIs
    ["juxt/site/api-operations" {}]
    ["juxt/site/resources-api" {}]
    ["juxt/site/events-api" {}]
    ["juxt/site/whoami-api" {}]
    ["juxt/site/users-api" {}]
    ["juxt/site/endpoints-api" {}]
    ;; RFC 7662 token introspection
    ["juxt/site/oauth-introspection-endpoint" {}]
    ;; Register the clients
    ["juxt/site/system-client" {"client-id" "site-cli"}]]
   (uri-map)))

(defn init-fixture [f] (init) (f))

(defn bundle-installer-seq [spec]
  (let [uri-map (uri-map)]
    (local/spec->installer-seq
     spec uri-map
     (local/bundles (local/get-root-dir))
     (local/graph (local/get-installers-dir) uri-map))))
