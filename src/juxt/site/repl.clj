;; Copyright © 2021, JUXT LTD.

(ns juxt.site.repl
  (:require
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]
   [crypto.password.bcrypt :as password]
   [io.aviso.ansi :as ansi]
   [juxt.site.main :as main]
   [juxt.site.actions :as actions]
   [juxt.site.cache :as cache]
   [juxt.site.package :as pkg]
   [juxt.site.util :as util]
   [xtdb.api :as xt])
  (:import (java.util Date)))

(defn system [] main/*system*)

(defn xt-node []
  (:juxt.site.db/xt-node (system)))

(defn grab-input! [args]
  (reduce
   (fn [acc [k {:keys [description default type]}]]
     (print (if (some? default)
              (format "%s [%s] (%s): " description k default)
              (format "%s [%s]: " description k)))
     (flush)
     (let [v (read-line)
           v (cond (str/blank? v) default :else v)
           v (case type
               ;; TODO: could use a multimethod here
               :dir (let [dir (io/file v)]
                      (when-not (.isDirectory dir)
                        (throw (ex-info (format "%s should be a directory" dir) {})))
                      dir)
               v)]
       (assoc acc k v)))
   {}
   args))

(defn confirm! [m]
  (print "Confirm? (y/n) ")
  (flush)
  (let [input (read-line)]
    (when (contains? #{"y" "yes"} (str/lower-case input))
      m)))

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

(defn valid-time [id] (:xtdb.api/valid-time (xt/entity-tx (db) id)))

(defn grep [re coll]
  (filter #(re-matches (re-pattern re) %) coll))

(defn rm! [& ids]
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

(defn ls
  "Return all Site resources"
  ([]
   (->> (q '{:find [(pull e [:xt/id :juxt.site/type])]
             :where [[e :xt/id]]})
        (map first)
        (filter (fn [e]
                  (not (#{"https://meta.juxt.site/types/event"}
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
  "Return resources by type: (ls-type \"https://meta.juxt.site/types/action\")."
  [t]
  (->> (q '{:find [e]
            :where [[e :xt/id]
                    [e :juxt.site/type t]]
            :in [t]} t)
       (map first)
       (sort)))

(defn ^::public actions
  "Return installed actions"
  []
  (->> (q '{:find [(pull e [:xt/id :description])]
            :where [[e :xt/id]
                    [e :juxt.site/type "https://meta.juxt.site/types/action"]]})
       (map first)
       (sort-by :xt/id)))

(defn ^::public packages
  "Return installed packages"
  []
  (->> (q '{:find [(pull e [:xt/id :description])]
            :where [[e :xt/id]
                    [e :juxt.site/type "https://meta.juxt.site/types/package"]]})
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
           true (filter #(not= (:juxt.site/type %) "Request"))
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
        (cache/recent cache/requests-cache n))
   ))

(defn requests-cache []
  cache/requests-cache)

(defn gc
  "Remove request data that is older than an hour."
  ([] (gc (* 1 60 60)))
  ([seconds]
   (let [records (map first
                      (q '{:find [e]
                           :where [[e :juxt.site/type "Request"]
                                   [e :juxt.site/end-date ended]
                                   [(< ended checkpoint)]]
                           :in [checkpoint]}
                         (Date. (- (.getTime (Date.)) (* seconds 1000)))))]
     (doseq [batch (partition-all 100 records)]
       (println "Evicting" (count batch) "records")
       (println (apply evict! batch))))))

#_(defn steps
  ([] (steps (config)))
  ([opts]
   (let [{:juxt.site/keys [base-uri]} opts
         _ (assert base-uri)
         db (xt/db (xt-node))]
     [ ;; Awaiting a fix to https://github.com/juxt/xtdb/issues/1480
      #_{:complete? (xt/entity db "urn:site:tx-fns:do-action")
         :happy-message "Site do-action transaction function installed."
         :sad-message "Site do-action transaction function not installed. "
         :fix "Enter (install-do-action-fn!) to fix this."}

      #_{:complete? (xt/entity db (str base-uri "/_site/apis/site/openapi.json"))
         :happy-message "Site API resources installed."
         :sad-message "Site API not installed. "
         :fix "Enter (put-site-api!) to fix this."}

      #_{:complete? (xt/entity db (str base-uri "/_site/token"))
         :happy-message "Authentication resources installed."
         :sad-message "Authentication resources not installed. "
         :fix "Enter (put-auth-resources!) to fix this."}

      {:complete? (xt/entity db (str base-uri "/_site/subjects/system"))
       :happy-message "System subject exists."
       :sad-message "System subject does not exist."
       :fix "Enter (init/install-system-subject!) to fix this."}

      #_{:complete? (xt/entity db (str base-uri "/_site/roles/superuser"))
         :happy-message "Role of superuser exists."
         :sad-message "Role of superuser not yet created."
         :fix "Enter (put-superuser-role!) to fix this."}

      #_{:complete? (pos? (count (superusers opts)))
         :happy-message "At least one superuser exists."
         :sad-message "No superusers exist."
         :fix "Enter (put-superuser! <username> <fullname>) or (put-superuser! <username> <fullname> <password>) to fix this."}

      #_{:complete? (xt/entity db (str base-uri "/_site/apps/admin"))
         :happy-message "Admin app exists."
         :sad-message "Admin app does not yet exist."
         :fix "Enter (install-admin-app!) to fix this."}

      #_{:complete? (seq (admin-access-tokens db base-uri))
         :happy-message "Local admin access-token exists."
         :sad-message "Local admin access-token does not yet exist."
         :fix "Enter (create-local-admin-access-token! <subject>) to fix this."}

      ])))

#_(defn status
  ([] (status (steps (config))))
  ([steps]
   (println)
   (doseq [{:keys [complete? happy-message sad-message fix]} steps]
     (if complete?
       (println "[X] " (ansi/green happy-message))
       (println
        "[ ] "
        (ansi/red sad-message)
        (ansi/yellow fix))))
   (println)
   (if (every? :complete? steps) :ok :incomplete)))

;; The REPL is having to construct the more usual network representation of a
;; request context.

(defn check-permissions [actions options]
  (actions/check-permissions (db) actions options))

(defn factory-reset! []
  (printf "Resetting system\n")
  (apply evict! (->> (q '{:find [(pull e [:xt/id :juxt.site/type])]
                          :where [[e :xt/id]]})
                     (map first)
                     (map :xt/id))))

(defn sessions []
  (mapv first
        (q '{:find [(pull e [* {:juxt.site/session [* {:juxt.site/subject [* {:juxt.site/user-identity [* {:juxt.site/user [*]}]}]}]}])]
             :where [[e :xt/id]
                     [e :juxt.site/type "https://meta.juxt.site/types/session-token"]]})))

(defn access-token [tok]
  (mapv first
        (q '{:find [(pull e [* {:juxt.site/subject [* {:juxt.site/user-identity [* {:juxt.site/user [*]}]}]}])]
             :where [[e :xt/id]
                     [e :juxt.site/type "https://meta.juxt.site/types/access-token"]
                     [e :juxt.site/token tok]]
             :in [tok]} tok)))

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

(defn random-bytes [size]
  (util/random-bytes size))

(defn as-hex-str [bytes]
  (util/as-hex-str bytes))

(defn encrypt-password [password]
  (password/encrypt password))

(defn install-package!
  "Install local package from filesystem"
  [dir uri-map]
  (printf "Installing package %s\n" dir)
  (pkg/install-package-from-filesystem! dir (xt-node) uri-map)
  :ok)

(defn install-packages!
  "Install local package from filesystem"
  [dirs uri-map]
  (doseq [dir dirs]
    (printf "Installing package %s\n" dir)
    (pkg/install-package-from-filesystem! dir (xt-node) uri-map))
  :ok)

(defn install-resource-with-action! [subject action document]
  (printf "Calling action: %s\n" action)
  (pkg/call-action-with-init-data!
   (xt-node)
   {:juxt.site/subject-id subject
    :juxt.site/action-id action
    :juxt.site/input document}))

(defn keyword-commands-from-packages []
  (for [[k vs]
        (->>
         (q '{:find [(pull e [:xt/id :description :commands])]
              :where [[e :xt/id]
                      [e :juxt.site/type "https://meta.juxt.site/types/package"]]})
         (map first)
         (mapcat :commands)
         (group-by first))
        :when (= (count vs) 1)
        :let [[_ v] (first vs)]]
    [k v]))

(defn call-command!
  ([command-k args]
   (printf "Calling command %s\n" command-k)
   (let [command (get (into {} (keyword-commands-from-packages)) command-k)
         ;; TODO: Check args match, else throw error
         f (pkg/create-command-fn
            (:juxt.site.sci/program command)
            args)]
     (f (xt-node)))
   :ok)
  ([command-k] (call-command! command-k {})))

(def AUTH_SERVER
  {#{"https://example.org" "https://core.example.org"} "https://auth.site.test"})

(def RESOURCE_SERVER
  {#{"https://auth.example.org" "https://core.example.org"} "https://auth.site.test"
   "https://example.org" "https://data.site.test"})

(defn ^::public init
  "Reset and re-initialize system with some resources for getting started."
  []
  (try
    (factory-reset!)

    (install-packages!
     ["packages/juxt/site/bootstrap"
      "packages/juxt/site/sessions"
      "packages/juxt/site/oauth-authorization-server"
      "packages/juxt/site/user-model"
      "packages/juxt/site/openid"
      "packages/juxt/site/roles"
      "packages/juxt/site/protection-spaces"
      "packages/juxt/site/openapi"]
     AUTH_SERVER)

    (install-packages!
     ["packages/juxt/site/system-api"]
     RESOURCE_SERVER)

    ;; For OpenID authentication, configure the authorization
    ;; server with OpenID client details.

    (call-command!
     :openid/register-client
     ;; Register an application with an OpenID provider and amend
     ;; the details here:
     {"iss" "https://juxt.eu.auth0.com"
      "client-id" "d8X0TfEIcTl5oaltA4oy9ToEPdn5nFUK"
      "client-secret" "gvk-mNdDmyaFsJwN_xVKHPH4pfrInYqJE1r8lRrn0gmoKI4us0Q5Eb7ULdruYZjD"})

    (call-command!
     :openid/register-user
     ;; Replace with your matching details below:
     {"username" "mal"
      "fullname" "Malcolm Sparks"
      "iss" "https://juxt.eu.auth0.com"
      "nickname" "malcolmsparks"})

    ;; Assign mal access to SystemReadonly
    (install-resource-with-action!
     "https://auth.site.test/_site/subjects/system"
     "https://auth.site.test/actions/assign-role"
     ;; Replace with your user here
     {:juxt.site/user "https://auth.site.test/users/mal"
      :juxt.site/role "https://auth.site.test/roles/SystemReadonly"})

    ;; Register OAuth2 clients
    (call-command!
     :oauth/register-client
     {"client-id" "swagger-ui"
      "client-type" #_"public" "confidential"
      "redirect-uri" "https://swagger-ui.site.test/oauth2-redirect.html"})

    (call-command!
     :oauth/register-client
     {"client-id" "postman"
      "client-type" #_"public" "confidential"
      "redirect-uri" "https://oauth.pstmn.io/v1/callback"})

    :ok

    (catch Exception exception
      (pprint exception)))
  )

(defn keyword-commands []
  (concat
   [[:help
     ^{:doc "Show this menu"}
     (fn [] (help* {:include-keyword-commands? true}))]

    ;;[:status ^{:doc "Show status"} (fn [] (status))]

    [:quit ^{:doc "Disconnect"} (fn [] nil)]

    [:system-api ^{:doc "Install System API"}
     (fn []
       (install-packages! ["packages/openapi"] AUTH_SERVER)
       (install-packages! ["packages/system-api"] RESOURCE_SERVER)

       ;; Assign mal access to SystemReadonly
       (install-resource-with-action!
        "https://auth.site.test/_site/subjects/system"
        "https://auth.site.test/actions/assign-role"
        ;; Replace with your user here
        {:juxt.site/user "https://auth.site.test/users/mal"
         :juxt.site/role "https://auth.site.test/roles/SystemReadonly"})

       :ok)]

    [:init ^{:doc "Run test setup script"}
     init]

    [:ls ^{:doc "List all resources"}
     (fn []
       (let [resources (ls)]
         (doseq [id resources]
           (println id))
         (printf "%d resources\n" (count resources))))]

    [:reset ^{:doc "Reset entire database"}
     (fn [] (factory-reset!))]

    [:install ^{:doc "Install a local package"}
     (fn []
       (println "Install local package")
       (let [args (some-> [["dir" {:description "Package directory"
                                   :type :dir}]
                           ["host" {:description "Host"}]]
                          (grab-input!))]
         (install-package! (get args "dir") {"https://example.org" (str "https://" (get args "host"))})))]

    [:types ^{:doc "Show types"}
     (fn [] (doseq [t (types)]
              (println t)))]

    [:packages ^{:doc "Show installed packages"}
     (fn [] (doseq [pkg (packages)]
              (printf "%s|%s\n" (:xt/id pkg) (:description pkg))))]

    [:users ^{:doc "Show all users"}
     (fn [] (doseq [user (users)]
              (println (:xt/id user))))]

    [:actions ^{:doc "Show installed actions"}
     (fn [] (doseq [a (actions)]
              (println (:xt/id a))))]]

   (reduce
    (fn [acc [k v]]
      (conj
       acc [k
            (let [{:keys [juxt.site.sci/program] :as command} v]
              ^{:doc (:description v)}
              (fn []
                (cond
                  program
                  (when-let [args (some-> (:arguments command)
                                          (grab-input!)
                                          (confirm!))]
                    (let [f (pkg/create-command-fn program args)]
                      (f (xt-node))))
                  :else (throw (ex-info "Cannot execute command" {:command command})))))]))
    []
    (keyword-commands-from-packages))))

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
