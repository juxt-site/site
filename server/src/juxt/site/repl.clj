;; Copyright © 2021, JUXT LTD.

(ns juxt.site.repl
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]
   [juxt.site.main :as main]
   [juxt.site.cache :as cache]
   [juxt.site.jwt :as jwt]
   [xtdb.api :as xt]))

(defn system [] main/*system*)

(defn xt-node []
  (:juxt.site.db/xt-node (system)))

(defn base64-reader [form]
  {:pre [(string? form)]}
  (let [decoder (java.util.Base64/getDecoder)]
    (.decode decoder form)))

(def edn-readers
  {'juxt.site/base64 base64-reader
   'regex #(re-pattern %)})

(declare help*)

(defn ^::public db
  "Return the current XTDB database as a value"
  []
  (xt/db (xt-node)))

(defn e [id]
  (postwalk
   (fn [x] (if (and (vector? x)
                    (#{:juxt.http/content :juxt.http/body} (first x))
                    (> (count (second x)) 1024))

             [(first x)
              (cond
                (= :juxt.http/content (first x)) (str (subs (second x) 0 80) "…")
                :else (format "(%d bytes)" (count (second x))))]
             x))
   (xt/entity (db) id)))

(defn hist [id]
  (xt/entity-history (db) id :asc {:with-docs? true}))

(defn e-tx [id] (xt/entity-tx (db) id))

(defn valid-time [id] (:xtdb.api/valid-time (xt/entity-tx (db) id)))

(defn grep [re coll]
  (filter #(re-matches (re-pattern re) %) coll))

(defn rm!
  "Remove id(s) from the database"
  [& ids]
  (->>
   (xt/submit-tx
    (xt-node)
    (for [id ids]
      [:xtdb.api/delete id]))
   (xt/await-tx (xt-node))))

(defn evict! [& ids]
  (->>
   (xt/submit-tx
    (xt-node)
    (for [id ids]
      [:xtdb.api/evict id]))
   (xt/await-tx (xt-node))))

(defn q [query & args]
  (apply xt/q (db) query args))

(defn t [t]
  (map
   first
   (xt/q (db) '{:find [e] :where [[e :juxt.site/type t]] :in [t]} t)))

(defn t* [t]
  (map
   first
   (xt/q (db) '{:find [e] :where [[e :type t]] :in [t]} t)))

(defn events []
  (->> (q '{:find [(pull e [*])]
            :where [[e :juxt.site/type "https://meta.juxt.site/types/event"]]})
       (map first)
       (sort-by (juxt :xtdb.api/tx-id :juxt.site/tx-event-index))))

(defn ls
  "Return all Site resources"
  ([]
   (->> (q '{:find [(pull e [:xt/id :juxt.site/type])]
             :where [[e :xt/id]]})
        (map first)
        (filter (fn [e]
                  (not (#{"https://meta.juxt.site/types/event"
                          "https://meta.juxt.site/types/request"}
                        (:juxt.site/type e)))))
        (map :xt/id)
        (sort-by str)))
  ([pat]
   (->> (q '{:find [e]
             :where [[e :xt/id]
                     [(str e) id]
                     [(re-seq pat id) match]
                     [(some? match)]]
             :in [pat]}
           (re-pattern pat))
        (map first)
        (sort-by str))))

(defn ^::public types
  "Return types"
  []
  (->> (q '{:find [t]
            :where [[_ :juxt.site/type t]]})
       (map first)
       (sort)))

(defn ^::public ls-type
  "Return resources by type: (ls-type \"https://meta.juxt.site/types/operation\")."
  [t]
  (->> (q '{:find [e]
            :where [[e :xt/id]
                    [e :juxt.site/type t]]
            :in [t]} t)
       (map first)
       (sort)))

(defn ^::public ls-site-type
  "Return resources by type: (ls-type \"operation\")."
  [t]
  (->> (q '{:find [e]
            :where [[e :xt/id]
                    [e :juxt.site/type t]]
            :in [t]} (str "https://meta.juxt.site/types/" t))
       (map first)
       (sort)))

(defn ^::public operations
  "Return installed operations"
  []
  (->> (q '{:find [(pull e [:xt/id :description])]
            :where [[e :xt/id]
                    [e :juxt.site/type "https://meta.juxt.site/types/operation"]]})
       (map first)
       (sort-by :xt/id)))

(defn ^::public users
  "Return installed users"
  []
  (->> (q '{:find [(pull e [*])]
            :where [[e :xt/id]
                    [e :juxt.site/type "https://meta.juxt.site/types/user"]]})
       (map first)
       (sort-by :xt/id)))

(defn- group-by-reference [x]
  (cond
    (and (map-entry? x) (= (first x) :referenced-by))
    [(first x) (group-by :juxt.site/type (second x))]
    :else x))

(defn ^::public user
  "Return installed user, with given username"
  [username]
  (->> (q '{:find [(pull e [* {(:juxt.site/_user {:as :referenced-by})
                               [* {(:juxt.site/_user-identity {:as :referenced-by})
                                   [* {(:juxt.site/_subject {:as :referenced-by})
                                       [*]}]}]}])]
            :where [[e :xt/id]
                    [e :username username]
                    [e :juxt.site/type "https://meta.juxt.site/types/user"]]
            :in [username]} username)
       (map first)
       (postwalk group-by-reference)))

(defn ^::public client-secret
  "Return the client-secret for the given client-id"
  [client-id]
  (->> (q '{:find [(pull e [:juxt.site/client-secret])]
            :where [[e :juxt.site/type "https://meta.juxt.site/types/application"]
                    [e :juxt.site/client-id client-id]]
            :in [client-id]} client-id)
       (map first)
       first
       :juxt.site/client-secret))

(defn now-id []
  (.format
   (.withZone
    (java.time.format.DateTimeFormatter/ofPattern "yyyy-MM-dd-HHmmss")
    (java.time.ZoneId/systemDefault))
   (java.time.Instant/now)))

(defn resources-from-stream [in]
  (let [record (try
                 (edn/read
                  {:eof :eof :readers edn-readers}
                  in)
                 (catch Exception e
                   (prn (.getMessage e))))]
    (cond
      (nil? record)
      (lazy-seq (resources-from-stream in))
      (not= record :eof)
      (cons record (lazy-seq (resources-from-stream in)))
      :else
      nil)))

(defn import-resources
  ([] (import-resources "import/resources.edn"))
  ([filename]
   (let [node (xt-node)
         in (java.io.PushbackReader. (io/reader (io/input-stream (io/file filename))))]
     (doseq [rec (resources-from-stream in)]
       (println "Importing record" (:xt/id rec))
       (when (:xt/id rec)
         (xt/submit-tx node [[:xtdb.api/put rec]])))
     (xt/sync node)
     (println "Import finished."))))

(defn validate-resource-line [s]
  (edn/read-string
   {:eof :eof :readers edn-readers}
   s))

(defn get-zipped-output-stream []
  (let [zos (doto
                (-> (str (now-id) ".edn.zip")
                    io/file
                    io/output-stream
                    java.util.zip.ZipOutputStream.)
              (.putNextEntry (java.util.zip.ZipEntry. "resources.edn")))]
    (java.io.OutputStreamWriter. zos)))

(defn apply-uri-mappings [mapping]
  (fn [ent]
    ;; Create a regex pattern which detects anything as a mapping key
    (let [pat (re-pattern (str/join "|" (map #(format "\\Q%s\\E" %) (keys mapping))))]
      (postwalk
       (fn [s]
         (cond-> s
           (string? s)
           (str/replace pat (fn [x] (get mapping x)))))
       ent))))

(defn export-resources
  "Export all resources to a file."
  ([]
   (export-resources {}))
  ([{:keys [out pred filename uri-mapping]}]
   (let [out (or out
                 (when filename (io/output-stream (io/file filename)))
                 (get-zipped-output-stream))
         pred (or pred some?)
         encoder (java.util.Base64/getEncoder)
         resources
         (cond->> (q '{:find [(pull e [*])]
                       :where [[e :xt/id]]})
           true (map first)
           true (filter #(not= (:juxt.site/type %) "https://meta.juxt.site/types/request"))
           pred (filter pred)
           uri-mapping (map (apply-uri-mappings uri-mapping))
           true (sort-by :xt/id))]

     (defmethod print-method (type (byte-array [])) [x writer]
       (.write writer "#juxt.site/base64")
       (.write writer (str " \"" (String. (.encode encoder x)) "\"")))

     (with-open [w (io/writer out)]
       (doseq [batch (partition-all 100 (map vector (range) resources))]
         (doseq [[_ ent] batch]
           (let [line (pr-str ent)]
             ;; Test the line can be read
             #_(try
                 (validate-resource-line line)
                 (catch Exception e
                   (throw
                    (ex-info
                     (format "Serialization of entity '%s' will not be readable" (:xt/id ent))
                     {:xt/id (:xt/id ent)} e))))
             (.write w line)
             (.write w (System/lineSeparator))))
         (let [n (inc (first (last batch)))
               total (count resources)
               pct (float (/ (* 100 n) total))]
           (printf "Written %d/%d (%.2f%%) resources\n" n total pct))))

     (remove-method print-method (type (byte-array [])))
     (printf "Dumped %d resources\n" (count resources)))))

(defn req [s]
  (into
   (sorted-map)
   (cache/find
    cache/requests-cache
    (re-pattern (str "/_site/requests/" s)))))

(defn recent
  ([] (recent 5))
  ([n]
   (map (juxt :juxt.site/request-id :juxt.site/date :juxt.site/uri :ring.request/method :ring.response/status)
        (cache/recent cache/requests-cache n))))

(defn requests-cache []
  cache/requests-cache)

#_(defn check-permissions [operations options]
  (operations/check-permissions (db) operations options))

(defn factory-reset! []
  (apply evict! (->> (q '{:find [(pull e [:xt/id :juxt.site/type])]
                          :where [[e :xt/id]]})
                     (map first)
                     (map :xt/id))))

(defn sessions []
  (mapv first
        (q '{:find [(pull e [* {:juxt.site/session [* {:juxt.site/subject [* {:juxt.site/user-identity [* {:juxt.site/user [*]}]}]}]}])]
             :where [[e :xt/id]
                     [e :juxt.site/type "https://meta.juxt.site/types/session-token"]]})))

(defn evict-all-sessions! []
  (let [db (db)]
    (->>
     (for [tok (->> (q '{:find [e]
                         :where [[e :xt/id]
                                 [e :juxt.site/type #{"https://meta.juxt.site/types/session"
                                                      "https://meta.juxt.site/types/session-token"}]]
                         :in [t]} t)
                    (map first)
                    )
           :let [session-id (:juxt.site/session (xt/entity db tok))
                 session (xt/entity db session-id)
                 subject (:juxt.site/subject session)]]
       (remove nil? [tok session-id subject]))
     (mapcat seq)
     (apply evict!))))

(defn find-resources [resources]
  (keep :xt/id (xt/pull-many (db) [:xt/id] resources)))

(defn make-access-token!
  [m]
  (jwt/make-access-token! (xt-node) m))

(comment
  (make-access-token!
   {:authorization-server "https://auth.site.test"
    :user "https://data.site.test/users/mal"
    :client-id "swagger-ui"
    :duration "PT15M"}))

(defn keyword-commands []
  (concat
   [[:help
     ^{:doc "Show this menu"}
     (fn [] (help* {:include-keyword-commands? true}))]

    ;;[:status ^{:doc "Show status"} (fn [] (status))]

    [:quit ^{:doc "Disconnect"} (fn [] nil)]

    [:ls ^{:doc "List all resources"}
     (fn []
       (let [resources (ls)]
         (doseq [id resources]
           (println id))
         (printf "%d resources\n" (count resources))))]

    [:reset ^{:doc "Reset entire database"}
     (fn [] (factory-reset!))]

    [:types ^{:doc "Show types"}
     (fn [] (doseq [t (types)]
              (println t)))]

    [:users ^{:doc "Show all users"}
     (fn [] (doseq [user (users)]
              (println (:xt/id user))))]

    [:operations ^{:doc "Show installed operations"}
     (fn [] (doseq [a (operations)]
              (println (:xt/id a))))]]))

(defn help*
  ([{:keys [include-keyword-commands?]}]
   (let [tab 30]
     (when include-keyword-commands?
       (doseq [[k v] (keyword-commands)
               :let [pad (apply str (repeat (max 0 (- tab (count (str k)))) "."))]]
         (println k pad (:doc (meta v)))))
     (doseq [[_ v] (sort (ns-publics 'juxt.site.repl))
             :let [m (meta v)]
             :when (::public m)]
       (doseq [arglist (:arglists m)
               :let [sig (format "(%s%s)" (:name m) (apply str (map (fn [arg] (str " " arg)) arglist)))
                     pad (apply str (repeat (max 0 (- tab (count sig))) "."))]]
         (println sig pad (:doc m)))))
   :ok)
  ([] (help* {})))

(defn ^::public help
  "Show available REPL functions"
  []
  (help* {:include-keyword-commands? false}))
