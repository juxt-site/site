;; Copyright © 2021, JUXT LTD.

(ns juxt.site.response)

(defn add-payload
  [{resource :juxt.site/resource,
    variant :juxt.site/variant,
    method :ring.request/method,
    :as req}]
  ;; Should not be called if method is HEAD
  (assert (not= method :head))

  (let [{body :juxt.http/body, content :juxt.http/content} (or variant resource)]
    (cond
      ;; TODO: Fish out the charset from the content-type of the resource and
      ;; use when converting to bytes.

      ;; Note: Although :ring.response/body supports anything that satisfies
      ;; ring.core.protocols.StreamableResponseBody, Ring will extract the
      ;; charset of a String by looking at the Content-Type header for the
      ;; response and using regex. Given we already know the charset, we should
      ;; avoid triggering this functionality in Ring for performance reasons.
      content (assoc req :ring.response/body (.getBytes content))

      body (assoc req :ring.response/body body)
      :else req)))

(defn redirect [req status location]
  (-> req
      (assoc :ring.response/status status)
      (update :ring.response/headers assoc "location" location)))
