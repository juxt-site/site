(ns pet.ui.views
  (:require
    [shadow.grove :as sg :refer (<< defc)]
    [pet.model :as-alias m]
    [clojure.string :as str]))

(defc pet-item [pet]
  (bind {::m/keys [completed? editing? pet-name pet-status] :as data}
    (sg/query-ident pet
      [::m/pet-name
       ::m/pet-status
       ::m/editing?
       ::m/completed?]))

  (render
   (<< [:li 
         [:div.view
          [:label "Name: " pet-name]
          [:label "Status: " pet-status]
          [:button.destroy {:on-click {:e ::m/delete! :pet pet}}]]])))

(defc ui-filter-select []
  (bind {::m/keys [current-filter]}
    (sg/query-root
      [::m/current-filter]))

  (bind
    filter-options
    [{:label "All" :value :all}
     {:label "Active" :value :active}
     {:label "Completed" :value :completed}])

  (render
    (<< [:ul.filters
         (sg/keyed-seq filter-options :value
           (fn [{:keys [label value]}]
             (<< [:li [:a
                       {:class {:selected (= current-filter value)}
                        :ui/href (str "/" (name value))}
                       label]])))])))

(defc ui-pet-list []
  (bind {::m/keys [filtered-pets] :as query}
    (sg/query-root
      [::m/filtered-pets]))

  (render
    (<< [:ul.pet-list (sg/keyed-seq filtered-pets identity pet-item)])))

(defc navbar []
  (bind {::m/keys [logged-in] :as query}
        (sg/query-root
         [::m/logged-in]))
  (render
   (if logged-in
     (<<
      [:nav.nabar
       [:a.login {:on-click {:e ::m/login-toggle!}}
        "LOG OUT"]
       [:a.login {:on-click {:e ::m/change-route! :route "/"}}
        "PETS"]
       [:a.login {:on-click {:e ::m/change-route! :route "/whoami"}}
        "WHOAMI"]])
     (<<
      [:nav.nabar
       [:a.login {:on-click {:e ::m/login-toggle!}}
        "LOG IN"]]))))

(defc whoami []
  (bind {::m/keys [whoami] :as query}
        (sg/query-root [::m/whoami]))
  (render
   (<<
    [:div.pet-view
     [:h2 (str (:juxt.site/user (:juxt.site/subject whoami)))]
     [:h3 "Roles"]
     (sg/simple-seq (:juxt.site/roles whoami)
                   (fn [item]
                     (<< [:li (str item)])))
     [:h3 "Permissions"]
     (sg/keyed-seq (:juxt.site/permitted-operations whoami)
                   :juxt.site/operation-ref
                   (fn [item]
                     (<< [:li (str (:juxt.site/operation-ref item))])))])))

(defc pets []
  (event ::m/create-new! [env _ ^js e]
         (let [[name status & _] (.-form (.-target e))]
           (js/console.log name)
           (sg/run-tx env {:e ::m/create-new!
                           ::m/pet-name (.-value name)
                           ::m/pet-status (.-value status)})))

  (event ::m/toggle-all! [env _ e]
         (sg/run-tx env {:e ::m/toggle-all! :completed? (-> e .-target .-checked)}))

  (bind {::m/keys [num-total num-active num-completed route logged-in] :as query}
        (sg/query-root
         [::m/editing
          ::m/num-total
          ::m/num-active
          ::m/num-completed
          ::m/route
          ::m/logged-in]))
  (render
   (if logged-in
     (<<
      [:div.pet-view
       [:input {:type "button"
                :value "Sync with DB"
                :on-click {:e ::m/refresh-pets-handler!}}]
       [:form.pet-form
        [:input.new-pet {:placeholder "Pet Name"
                         :autofocus true
                         :required true}]
        [:select.new-pet {:placeholder "Pet Status"
                          :autofocus true}
         [:option "available"]
         [:option "pending"]
         [:option "sold"]]
        [:input.submit-pet {:on-click {:e ::m/create-new!}
                            :autofocus true
                            :type "submit"
                            :value "Submit"}]]
       (when (pos? num-total)
         (<< [:section.main

              (ui-pet-list)]))])
     (<<
      [:div.pet-view
       [:h2 "You do not have permission to view this page"]]))))


(defc ui-root []
  (bind {::m/keys [route] :as query}
        (sg/query-root
         [::m/route]))
  (render
   (<<
    (navbar)
    [:header.header
     [:h1 "Petstore"]]
    (case route
      "/"
      (pets)
      "/whoami"
      (whoami)))))
