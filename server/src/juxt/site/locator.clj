;; Copyright © 2021, JUXT LTD.

(ns juxt.site.locator
  (:require
   [clojure.tools.logging :as log]
   [clojure.string :as str]
   [xtdb.api :as xt]))

;; TODO: Definitely a candidate for clojure.core.cache (or memoize). Always be
;; careful using memoize, but in case performance is scarcer than memory.
(memoize
 (defn to-regex [uri-template]
   (re-pattern
    (str/replace
     uri-template
     #"\{([^\}]+)\}"                    ; e.g. {id}
     (fn replacer [[_ group]]
       ;; Instead of using the regex of path parameter's schema, we use a
       ;; weak regex that includes anything except forward slashes, question
       ;; marks, or hashes (as described in the Path Templating section of
       ;; the OpenAPI Specification (version 3.0.2). We are just locating
       ;; the resource in this step, if the regex were too strong and we
       ;; reject the path then locate-resource would yield nil, and we might
       ;; consequently end up creating a static resource (or whatever other
       ;; resource locators are tried after this one). That might surprise
       ;; the user so instead (prinicple of least surprise) we are more
       ;; liberal in what we accept at this stage and leave validation
       ;; against the path parameter to later (potentially yielding a 400).
       (format "(?<%s>[^/#\\?]+)" group))))))

(defn match-uri-templated-uris
  "Match on a uri-template, as described in RFC 6570. See
  https://www.rfc-editor.org/rfc/rfc6570."
  [db uri]
  (when-let [{:keys [resource groups]}
             (first
              (xt/q
               db
               '{:find [(pull resource [*]) groups]
                 :keys [resource groups]
                 :where [[resource :juxt.site/uri-template true]
                         ;; Compile the URI to a java.util.regex.Pattern
                         [(juxt.site.locator/to-regex resource) pat]
                         [(re-matches pat uri) groups]
                         [(first groups) group0]
                         [(some? group0)]]
                 :in [uri]}
               uri))]
    (assoc
     resource
     :juxt.site/path-params
     (zipmap
      ;; Keys
      (map second (re-seq #"\{(\p{Alpha}+)\}" (:xt/id resource)))
      ;; Values
      (next groups)))))

(defn locate-resource
  "With a given uri, locate a resource"
  [{db :juxt.site/db, uri :juxt.site/uri}]

  (assert uri)
  (assert db)
  (or
   ;; When the URI ends in '.meta', we interpret this as a request
   ;; targetting the resource's metadata. For now, the
   ;; /_site/meta-resource determines how a resource's metadata can be
   ;; created, updated and deleted, while the scope of this
   ;; determination is the entire virtual-host's URI space. However,
   ;; it is expected that in future, other such 'meta resources' can
   ;; be installed, and matched to the request based on some criteria,
   ;; such as the request's URI, authorization or protection-domain.
   (when-let [[_ virtual-uri] (re-matches #"(.*)\.meta" uri)]
     (some->
      (xt/entity db (str (.resolve (java.net.URI. uri) "/_site/meta-resource")))
      (assoc :xt/id virtual-uri)))

   ;; Is it in XTDB?
   (when-let [e (xt/entity db uri)]
     (when-not (:juxt.site/uri-template e)
       (assoc e :juxt.site/resource-provider ::db)))

   ;; Is it matched by any uri-templates (RFC 6570)?
   (some->
    (match-uri-templated-uris db uri)
    (assoc :juxt.site/resource-provider ::db))

   ;; This is put into each host at bootstrap but can be overridden if
   ;; a custom 404 page is required.
   (xt/entity db (str (.resolve (java.net.URI. uri) "/_site/not-found")))

   (throw
    (let [not-found-uri (str (.resolve (java.net.URI. uri) "/_site/not-found"))]
      (ex-info
       (format "The not-found resource has not been installed: %s" not-found-uri)
       {:uri not-found-uri})))))
