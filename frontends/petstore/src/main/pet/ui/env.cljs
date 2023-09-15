(ns pet.ui.env
  (:require
    [shadow.grove :as sg]
    [shadow.grove.db :as db]
    [pet.model :as-alias m]))

(def schema
  {::m/pet
   {:type :entity
    :primary-key ::m/pet-id
    :attrs {}
    :joins {}}
   })

(def init-user
  {})

(def route "/")

(defonce data-ref
  (-> {::m/id-seq 0
       ::m/editing nil
       ::m/logged-in false
       ::m/whoami init-user
       ::m/route route}
      (db/configure schema)
      (atom)))

(defonce rt-ref
  (-> {}
      (sg/prepare data-ref ::db)))

