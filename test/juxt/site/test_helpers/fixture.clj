;; Copyright © 2023, JUXT LTD.

(ns juxt.site.test-helpers.fixture)

(defmacro with-fixtures [& body]
  `((clojure.test/join-fixtures
     (concat
      (-> *ns* meta :clojure.test/each-fixtures)
      (-> *ns* meta :clojure.test/once-fixtures)))
    (fn [] ~@body)))
