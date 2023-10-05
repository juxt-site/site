;; Copyright © 2023, JUXT LTD.

(ns juxt.site.cli-util.parameters
  (:require
   [juxt.site.cli-util.user-input :as input]))

(defn resolve-parameters [parameters args]
  (reduce
   (fn [acc [parameter {:keys [label default choices password optional]}]]
     (let [value (or (get args parameter)
                     default
                     (when-not optional
                       (cond
                         choices (let [choice-v (map (juxt #(format "%s (%s)" (:label %) (:value %)) identity) choices)
                                       choice (input/choose (map first choice-v) {:header (format "Choose %s" parameter)})

                                       value (get-in (into {} choice-v) [choice :value])]
                                   value)

                         password (input/input {:header (or label parameter)
                                                :password true})

                         :else (input/input {:header (or label parameter)}))))]
       (if value (assoc acc parameter value) acc)))
   {}
   parameters))
