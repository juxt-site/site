;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.parameters
  (:require [juxt.site.bb.user-input :as input]))

(defn resolve-parameters [parameters args]
  (reduce
   (fn [acc [parameter {:keys [default choices]}]]
     (assoc acc parameter
            (or (get args (keyword parameter))
                default
                (cond
                  choices (let [choice-v (map (juxt #(format "%s (%s)" (:label %) (:value %)) identity) choices)
                                choice (input/choose (map first choice-v) {:header (format "Choose %s" parameter)})

                                value (get-in (into {} choice-v) [choice :value])]
                            value)
                  :else
                  (input/input {:header parameter})))))
   {}
   parameters))
