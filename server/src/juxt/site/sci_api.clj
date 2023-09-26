;; Copyright © 2023, JUXT LTD.

(ns juxt.site.sci-api
  (:require [xtdb.api :as xt]))

(defn lookup-applications [db client-id]
  (seq
   (map first
        (try
          (xt/q
           db
           '{:find [(pull e [*])]
             :where [[e :juxt.site/type "https://meta.juxt.site/types/application"]
                     [e :juxt.site/client-id client-id]]
             :in [client-id]} client-id)
          (catch Exception cause
            (throw
             (ex-info
              (format "Failed to lookup client: %s" client-id)
              {:client-id client-id} cause)))))))
