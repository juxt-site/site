(ns pet.ui
  (:require
   [shadow.grove :as sg]
   [shadow.grove.history :as history]
   [pet.ui.env :as env]
   [pet.ui.views :as views]
   [pet.ui.db])
  (:require ["@juxt/pass" :refer [registerOAuth2Worker]]))

(defonce root-el
  (js/document.getElementById "app"))

(defn render []
  (sg/render env/rt-ref root-el
    (views/ui-root)))

(defn init []
  ;; useful for debugging until there are actual tools for this
  (when ^boolean js/goog.DEBUG
    (swap! env/rt-ref assoc :shadow.grove.runtime/tx-reporter
           (fn [{:keys [event] :as report}]
             ;; alternatively use tap> and the shadow-cljs UI
             (js/console.log (:e event) event report))))
  (history/init! env/rt-ref
                 {:use-fragment true
                  :start-token "/all"})
  (registerOAuth2Worker)
  (render))

(defn ^:dev/after-load reload! []
  (render))
