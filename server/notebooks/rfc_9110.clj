;; # Learning RFC 9110 with Site

;; This is a tutorial to learn HTTP with Site.
;; This notebook covers [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110).

;; ## Preliminaries

;; First we bring in Clerk and our Site dependencies.

(ns notebooks.rfc-9110
  (:require
   [clojure.string :as str]
   [nextjournal.clerk :as clerk]
   [nextjournal.clerk.viewer :as v]
   [juxt.site.test-helpers.xt :refer [*xt-node* with-system-xt]]
   [juxt.site.test-helpers.handler :refer [*handler* with-handler]]))

;; Now we define a macro that composes a Site instance

(defmacro with-site
  [& body]
  `(with-system-xt
     (with-handler ~@body)))

;; ## Core Semantics

;; See https://datatracker.ietf.org/doc/html/rfc9110#section-1.3

#_(with-site
  (select-keys
   (*handler* {:ring.request/method :get
               :ring.request/path "/_site/healthcheck"})
   [:ring.response/status
    :ring.response/body]))
