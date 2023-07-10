;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.user-input
  (:require [bblgum.core :as b]))

(def ^:dynamic *heading* "Input")
(def ^:dynamic *no-confirm* nil)

(defn confirm
  ([prompt] (confirm prompt {}))
  ([prompt opts]
   (if *no-confirm*
     true
     (let [{:keys [status result]}
           (b/gum {:cmd :confirm
                   :as :bool
                   :args [prompt]
                   :opts (merge
                          {:selected.background "#A51"}
                          )})]
       (when (= status 130)
         (System/exit 2))
       result))))

(defn input [{:keys [heading prompt header value]
              :or {heading *heading*}
              :as opts}]
  (if (and *no-confirm* value)
    value
    (let [{:keys [status result]}
          (b/gum {:cmd :input
                  :opts (cond-> opts
                          true (assoc :header.foreground "#C72" :prompt.foreground "#444" :width 60)
                          true (dissoc :heading :prompt)
                          (nil? header) (assoc :header (str heading "\n\n" prompt)))})]
      (when (= status 130)
        (System/exit 2))
      (when-not (zero? status)
        (throw
         (ex-info "gum process exited with non-zero status" {:status status})))
      (first result))))

(defn choose [choices opts]
  (if (and *no-confirm* (:value opts))
    (:value opts)
    (let [{:keys [status result]}
          (b/gum {:cmd :choose
                  :args choices
                  :opts (->
                         (merge {:header (str (or (:heading opts) *heading*) "\n")
                                 :header.foreground "#C72"
                                 :item.foreground "#444"
                                 :selected.foreground "#C72"
                                 :cursor.foreground "#AAA"
                                 :limit 1}
                                opts)
                         (dissoc :heading :description))})]
      (when (= status 130)
         (System/exit 2))
      (when-not (zero? status)
        (throw
         (ex-info "gum process exited with non-zero status" {:status status})))
      (first result))))
