;; Copyright © 2022, JUXT LTD.

(ns juxt.site.schema
  (:require
   [malli.core :as m]
   [malli.registry :as mr]))

(defn string-uri? [s]
  (re-matches #"http[s]*:\/\/[^\s]+" s))

(def schema-registry
  {:juxt.site/db :any #_[:fn (fn [db]
                               (not (nil? db))
                               ;;(instance? QueryDatasource db)
                               )]
   :juxt.site/resource [:map [:xt/id]]
   :juxt.site/subject [:map [:xt/id [:string {:min 1}]]]
   :juxt.site/input [:map [:xt/id {:optional true} [:string {:min 1}]]]
   :juxt.site/methods [:map [:get :any]]
   :juxt.site/method [:enum :get :post :put]
   :xt/id [:string {:min 5}]
   :juxt.site/scope [:set [:and [:string {:min 1}] [:fn string-uri?]]]
   :juxt.site/rules [:vector :any]
   :juxt.site/uri [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/type [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/issuer [:string {:min 1}]
   :juxt.site/grant-type (m/schema [:enum "authorization_code" "refresh_token" "password" "client_credentials"])
   :juxt.site/client-type [:enum "confidential" "public"]
   :juxt.site/redirect-uris [:sequential [:and [:string {:min 1}] [:fn string-uri?]]]
   :juxt.site/subject-uri [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/operationg [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/operation-uri [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/do-operation-tx-fn [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/events-base-uri [:and [:string {:min 1}] [:fn string-uri?]]
   :juxt.site/username [:string {:min 1}]
   :juxt.site/password [:string {:min 1}]
   :juxt.site/description [:string {:min 1}]
   #_#_:juxt.site/base-uri (m/schema [:and [:string {:min 1}] [:fn string-uri?]])
   #_#_:juxt.site/base-installer-path (m/schema [:string {:min 1}])
   #_#_:juxt.site/installers (m/schema [:vector [:map
                                             [:juxt.site/base-uri [:ref :juxt.site/base-uri]]
                                             [:juxt.site/base-installer-path [:ref :juxt.site/base-installer-path]]]])
   })


(mr/set-default-registry!
   (mr/composite-registry
    (m/default-schemas)
    schema-registry))
