(reduce-kv #(if (not= "juxt.site" (namespace %2))
                  (assoc %1 %2 %3)
                  %1)
               {}
               *resource*)
