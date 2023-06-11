;; # Babashka conf demo

;; ## Welcome to babashka conf

;; This namespace demonstrates how to run SCI and how to control what it can do.

(ns notebooks.index
  (:require
   [sci.core :as sci]
   ;;[juxt.site.repl :as repl :refer :all]
   [jsonista.core :as json])
  )

;; ## SCI transaction functions

;; Site transaction functions run on every node in the database cluster.
;; It's essential that a transaction function is determinstic, always returning the same result.

;; For example, suppose a programmer added code that used
;; `clojure.core/rand-int`. Wouldn't that be terrible?

(vec
 (for [n (range 10)]
   (sci/eval-string
    "(+ (clojure.core/rand-int 10) 10)"
    )))

;; Oh no, all those numbers are different!

;; But with SCI, we can deny access to the clojure.core/rand-int function.

(try
  (vec
   (for [n (range 10)]
     (sci/eval-string
      "(+ (clojure.core/rand-int 10) 10)"
      {:deny '[clojure.core/rand-int]})))
  (catch Exception _
    "Bad programmer! You shouldn't be calling clojure.core/rand-int in a transaction function!"))

;; Or we could replace it with a mock function that we control.
;; For example, let's provide our own version of `clojure.core/rand-int`:

(defn my-rand-int [n]
  (- n 2))

;; Now we can replace the official `rand-int` with our determinstic alternative.

(vec
 (for [n (range 10)]
   (sci/eval-string
    "(+ (clojure.core/rand-int 10) 10)"
    {:namespaces {'clojure.core {'rand-int my-rand-int}}})))

;; Now all these numbers are the same!
