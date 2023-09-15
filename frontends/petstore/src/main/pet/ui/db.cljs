(ns pet.ui.db
  (:require
   [shadow.grove.eql-query :as eql]
   [shadow.grove.db :as db]
   [shadow.grove :as sg]
   [pet.ui.env :as env]
   [pet.model :as-alias m]
   [ajax.core :as ajax]
   [pet.config :as config])
  (:require ["@juxt/pass" :refer [authorize]]))

(defmethod eql/attr ::m/num-active
  [env db current _ params]
  (->> (db/all-of db ::m/pet)
       (remove ::m/completed?)
       (count)))

(defmethod eql/attr ::m/num-completed
  [env db current _ params]
  (->> (db/all-of db ::m/pet)
       (filter ::m/completed?)
       (count)))

(defmethod eql/attr ::m/num-total
  [env db current _ params]
  (count (db/all-of db ::m/pet)))

(defmethod eql/attr ::m/editing?
  [env db current _ params]
  (= (::m/editing db) (:db/ident current)))

(defmethod eql/attr ::m/logged-in?
  [env db current _ params]
  (= (::m/logged-in db) (:db/ident current)))

(defmethod eql/attr ::m/filtered-pets
  [env {::m/keys [current-filter] :as db} current _ params]
  (->> (db/all-of db ::m/pet)
       (map :db/ident)
       (sort)
       (vec)))

(defn without [items del]
  (into [] (remove #{del}) items))

(defn r-> [init rfn coll]
  (reduce rfn init coll))

(sg/reg-event env/rt-ref :ui/route!
  (fn [env {:keys [token] :as e}]

    ;; not much routing in this app, this will suffice
    (let [filter
          (case token
            "/completed" :completed
            "/active" :active
            :all)]

      (assoc-in env [:db ::m/current-filter] filter))))

(sg/reg-event env/rt-ref ::m/create-new!
              (fn [env {::m/keys [pet-name pet-status]}]
                (js/console.log (str "POSTING PET" pet-name pet-status))
                (ajax/POST (str (get config/config "resource-server") "/petstore/pet")
                           {:format :json
                            :params {:name pet-name :status pet-status :id (str (random-uuid))}
                            :response-format :json
                            :timeout 5000
                            :keywords? true
                            :handler (fn [resp]
                                       (js/console.log "posted"))
                            :error-handler (fn [e]
                                             (if (= (:status e) 200)
                                               ""
                                               (js/console.log (str "ERROR:" e))))})
                (update env :db
                        (fn [db]
                          (let [new-pet {::m/pet-id (str (random-uuid)) ::m/pet-name pet-name ::m/pet-status pet-status}]
                            (-> db
                                (update ::m/id-seq inc)
                                (db/add ::m/pet new-pet [::m/pets])))))))

(sg/reg-event env/rt-ref ::m/delete!
  (fn [env {:keys [pet]}]
    (update env :db
      (fn [db]
        (-> db
            (dissoc pet)
            (update ::m/pets without pet))))))

(sg/reg-event env/rt-ref ::m/delete-handler!
  (fn [env {:keys [pet]}]
    (js/console.log (str "a: " (db/ident-val pet)))
    (ajax/DELETE (str (get config/config "resource-server") "/petstore/pet/" (db/ident-val pet))
                 {:response-format :json
                  :format :json
                  :keywords? true
                  :handler (fn [h]
                             (js/console.log (str h))
                             (sg/run-tx! env/rt-ref
                                         {:e ::m/delete!
                                          :pet pet}))
                  :error-handler (fn [e] (js/console.log (str "ERROR:" e)))})
    env))

(sg/reg-event env/rt-ref ::m/toggle-completed!
              (fn [env {:keys [pet]}]
                (update-in env [:db pet ::m/completed?] not)))

(sg/reg-event env/rt-ref ::m/edit-start!
  (fn [env {:keys [pet]}]
    (assoc-in env [:db ::m/editing] pet)))

(sg/reg-event env/rt-ref ::m/edit-save!
  (fn [env {:keys [pet text]}]
    (update env :db
      (fn [db]
        (-> db
            (assoc-in [pet ::m/pet-text] text)
            (assoc ::m/editing nil))))))

(sg/reg-event env/rt-ref ::m/edit-cancel!
  (fn [env _]
    (assoc-in env [:db ::m/editing] nil)))

(sg/reg-event env/rt-ref ::m/refresh-whoami!
              (fn [env {:keys [whoami]}]
                (js/console.log (str "WHOAMI REFRESH HANDLER"))
                (assoc-in env [:db ::m/whoami] whoami)))

(sg/reg-event env/rt-ref ::m/refresh-pets!
              (fn [env {:keys [pets]}]
                (js/console.log (str "PETS REFRESH"))
                (update env :db
                        (fn [db]
                          (-> db
                              (r->
                               (fn [db pet]
                                 (db/remove db pet))
                               (db/all-of db ::m/pet))
                              (db/merge-seq ::m/pet
                                            (map
                                             (fn [pet]
                                               {::m/pet-id (:id pet)
                                                ::m/pet-name (:name pet)
                                                ::m/pet-status (:status pet)})
                                             pets)
                                            [::m/pets]))))
                ))

(sg/reg-event env/rt-ref ::m/refresh-pets-handler!
              (fn [env {:keys [whoami]}]
                (js/console.log (str "PETS REFRESH HANDLER"))
                (ajax/GET (str (get config/config "resource-server") "/petstore/pets")
                          {:response-format :json
                           :keywords? true
                           :handler (fn [h]
                                      (js/console.log (str h))
                                      (sg/run-tx! env/rt-ref
                                                  {:e ::m/refresh-pets!
                                                   :pets h}))
                           :error-handler (fn [e] (js/console.log (str "ERROR:" e)))})
                env))

(sg/reg-event env/rt-ref ::m/login-toggle!
              (fn [env {::m/keys [read write]}]
                (if (get-in env [:db ::m/logged-in])
                  (do (js/console.log "LOGGING OUT"))
                  (do (js/console.log "LOGGING IN")
                      (let [response (authorize (clj->js (config/authorize-payload
                                                          (-> [(str (get config/config "authorization-server") "/scopes/system/self-identification")]
                                                              (#(if read
                                                                  (conj % (str (get config/config "authorization-server") "/scopes/petstore/read"))
                                                                  %))
                                                              (#(if write
                                                                  (conj % (str (get config/config "authorization-server") "/scopes/petstore/write"))
                                                                  %)))
                                                          )))]
                        (.then response
                               #(do
                                  (js/console.log (str "Authorization Response Received"))
                                  (ajax/GET (str (get config/config "resource-server") "/_site/whoami")
                                            {:response-format :json
                                             :keywords? true
                                             :timeout 5000
                                             :handler (fn [h]
                                                        (sg/run-tx! env/rt-ref
                                                                    {:e ::m/refresh-whoami!
                                                                     :whoami h}))
                                             :error-handler (fn [e] (js/console.log (str "ERROR:" e)))})
                                  )))))
                (update-in env [:db ::m/logged-in] #'not)))

(sg/reg-event env/rt-ref ::m/change-route!
              (fn [env {:keys [route]}]
                (assoc-in env [:db ::m/route] route)))

(sg/reg-event env/rt-ref ::m/clear-completed!
              (fn [env _]
                (update env :db
                        (fn [db]
                          (-> db
                              (r->
                               (fn [db {::m/keys [completed?] :as pet}]
                                 (if-not completed?
                                   db
                                   (db/remove db pet)))
                               (db/all-of db ::m/pet))
                              (update ::m/pets (fn [current]
                                                 (into [] (remove #(get-in db [% ::m/completed?])) current))))
                          ))))

(sg/reg-event env/rt-ref ::m/toggle-all!
  (fn [env {:keys [completed?]}]
    (update env :db
      (fn [db]
        (reduce
          (fn [db ident]
            (assoc-in db [ident ::m/completed?] completed?))
          db
          (db/all-idents-of db ::m/pet))))))

