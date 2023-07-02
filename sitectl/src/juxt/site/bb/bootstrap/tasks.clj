;; Copyright © 2023, JUXT LTD.

(ns juxt.site.bb.bootstrap.tasks
  (:require
   [babashka.cli :as cli]
   [babashka.http-client :as http]
   [bblgum.core :as b]
   [cheshire.core :as json]
   [clj-yaml.core :as yaml]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]
   [juxt.site.install.common-install-util :as ciu]))

(defn curl-config-file []
  (or
   (when (System/getenv "CURL_HOME")
     (io/file (System/getenv "CURL_HOME") ".curlrc"))
   (when (System/getenv "XDG_CONFIG_HOME")
     (io/file (System/getenv "XDG_CONFIG_HOME") ".curlrc"))
   (when (System/getenv "HOME")
     (io/file (System/getenv "HOME") ".curlrc"))))

(defn cache-dir []
  (or
   (when (System/getenv "XDG_CACHE_HOME")
     (let [dir (io/file (System/getenv "XDG_CACHE_HOME") "site")]
       (.mkdirs dir)
       dir))
   (when (System/getenv "HOME")
     (let [dir (io/file (System/getenv "HOME") ".cache/site")]
       (.mkdirs dir)
       dir))))

;; TODO: Replace with Aero library
(memoize
 (defn config []
   (let [config-file (io/file (System/getenv "HOME") ".config/site/config.edn")]
     (if (.exists config-file)
       (edn/read-string {:default (fn [tag value]
                                    (case (name tag)
                                      "env" (System/getenv (name value))
                                      "join" (apply str value)
                                      nil))}
                        (slurp config-file))
       (throw (ex-info (format "No config file: %s" (.getAbsolutePath config-file)) {}))))))

(memoize
 (defn groups []
   (edn/read-string
    (slurp (io/file (System/getenv "SITE_HOME") "installers/groups.edn")))))

(def ^:dynamic *no-confirm* nil)

(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https?://.*?example.org)([\p{Alnum}-]+)*"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn get-group-installers [group-name]
  (get-in (groups) [group-name :juxt.site/installers]))

(defn apply-uri-map [uri-map installers]
  (postwalk
   (fn walk-fn [node]
     (cond
       (string? node) (uri-map-replace node uri-map)
       :else node))
   installers))

(defn read-line* [r]
  (let [sb (java.lang.StringBuilder.)]
    (loop [c (.read r)]
      (when (not= c 10)
        (.append sb (char c))
        (recur (.read r))))
    (.toString sb)))

(defn read-object [r]
  (binding [*read-eval* false]
    (edn/read {:readers {'error (fn [x] x)}} r)))

(defn read-string* [r]
  (binding [*read-eval* false]
    (edn/read-string {:readers {'error (fn [x] x)}} r)))

(defn slurp-prompt [r]
  (let [prompt (read-object r)]
    (when-not (= 'site> prompt)
      (throw (ex-info "Unexpected prompt" {:prompt prompt})))))

(defn eval-and-read [reader writer expr]
  (binding [*out* writer]
    (println expr))
  (let [obj (read-object reader)]
    (slurp-prompt reader)
    obj))

(defn connect
  "Return function that evaluates and expression via the REPL"
  [host port]
  (let [s (java.net.Socket. host port)
        writer (io/writer (.getOutputStream s))
        reader (java.io.PushbackReader. (java.io.InputStreamReader. (.getInputStream s)))
        copyright-banner (read-line* reader)
        _ (assert (re-matches #"Site by JUXT. Copyright.*" copyright-banner))
        help-message (read-line* reader)
        _ (assert (re-matches #"Type :quit to exit, :help for help." help-message))]

    (slurp-prompt reader)
    (partial eval-and-read reader writer)))

(def eval-and-read! (connect "localhost" 50505))

(defn confirm
  ([prompt] (confirm prompt {}))
  ([prompt opts]
   (if *no-confirm*
     true
     (let [{:keys [status result]}
           (b/gum {:cmd :confirm
                   :as :bool
                   :args [prompt]
                   :opts (merge
                          {:selected.background "#A51"
                           ;; "affirmative" "Delete ALL"
                           ;; "negative" "Cancel"
                           }
                          opts
                          )})]
       (when (= status 130)
         (System/exit 2))
       result))))

(def ^:dynamic *heading* "Input")

(defn input [{:keys [heading prompt header value]
              :or {heading *heading*}
              :as opts}]
  (if (and *no-confirm* value)
    value
    (let [{:keys [status result]}
          (b/gum {:cmd :input
                  :opts (cond-> opts
                          true (assoc :header.foreground "#C72" :prompt.foreground "#444" :width 60)
                          true (dissoc :heading :prompt)
                          (nil? header) (assoc :header (str heading "\n\n" prompt)))})]
      (when (= status 130)
         (System/exit 2))
      (when-not (zero? status)
        (throw
         (ex-info "gum process exited with non-zero status" {:status status})))
      (first result))))

(defn choose [choices opts]
  (if (and *no-confirm* (:value opts))
    (:value opts)
    (let [{:keys [status result]}
          (b/gum {:cmd :choose
                  :args choices
                  :opts (->
                         (merge {:header (str (or (:heading opts) *heading*) "\n")
                                 :header.foreground "#C72"
                                 :item.foreground "#444"
                                 :selected.foreground "#C72"
                                 :cursor.foreground "#AAA"
                                 :limit 1}
                                opts)
                         (dissoc :heading :description))})]
      (when (= status 130)
         (System/exit 2))
      (when-not (zero? status)
        (throw
         (ex-info "gum process exited with non-zero status" {:status status})))
      (first result))))

;; Use site-push as a command in order to show a spinner
(defn push! [expr opts]
  (let [{:keys [status result]}
        (b/gum {:cmd :spin
                :args ["/bin/bash" (format "%s/server/bin/site-push" (System/getenv "SITE_HOME")) "-e" (pr-str expr)]
                :opts (->
                       (merge
                        {:spinner "points"
                         :spinner.foreground "#C72"
                         :show-output true
                         :title "Please wait"}
                        (select-keys opts [:title]))
                       (update :title str "..."))})]

    (when (= status 130)
      (System/exit 2))

    (if (pos? status)
      (throw (ex-info "gum non-zero exit" {:status status}))
      (str/join " " result))))

(defn
  ^{:deprecated "Replaced with install-with-http!"}
  install-with-push!
  [installers uri-map parameter-map install-opts]

  ;; Can we access juxt.site.test-helpers.local-files-util/install-resource-groups! from here?

  ;; 1. Ask tree to return an installer-seq
  (let [installers (apply-uri-map uri-map installers)
        installer-map (ciu/unified-installer-map
                       (io/file (System/getenv "SITE_HOME") "installers")
                       uri-map)
        installers-seq (ciu/installer-seq installer-map parameter-map installers)
        existing (set (edn/read-string (push! `(~'find-resources ~(mapv :juxt.site/uri installers-seq)) {:title "Retrieving existing resources"})))
        remaining-installers (remove (comp existing :juxt.site/uri) installers-seq)
        heading (or (:title install-opts) *heading* "TITLE")]

    (cond
      (pos? (count existing))
      (when (confirm (format "%s\n\nResources to overwrite\n\n%s\n\nResources to install\n\n%s\n\nGo ahead?\n"
                             heading
                             (str/join "\n" (sort existing))
                             (str/join "\n" (sort (map :juxt.site/uri remaining-installers)))))
        (push! `(~'call-installers! (quote ~installers-seq)) {}))

      :else
      (when (confirm (format "%s\n\n%s\n\nInstall these resources?\n"
                             heading
                             (str/join "\n" (sort (map :juxt.site/uri remaining-installers)))))
        (push! `(~'call-installers! (quote ~remaining-installers)) {}))))

  ;; TODO: 2. Exchange installer-seq with repl to enquire which resources have already installed.
  ;; (Perhaps we use a -f to 'force' a re-install, otherwise resources aren't overwritten)

  ;; TODO: 3. Amend the installer-seq accordingly

  )

(defn install-with-http! [installers uri-map parameter-map install-opts]
  (let [installers (apply-uri-map uri-map installers)
        installer-map (ciu/unified-installer-map
                       (io/file (System/getenv "SITE_HOME") "installers")
                       uri-map)
        installers-seq (ciu/installer-seq installer-map parameter-map installers)
        target "http://localhost:4911/resources"]

    (println "Installing to" target)
    (let [result
          (http/post
           target
           {:headers {"content-type" "application/edn"}
            :body (pr-str installers-seq)
            :throw false})]
      (println (:status result) (:body result)))))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

;; End of infrastructure

(defn reset [opts]
  (when (confirm "Factory reset and delete ALL resources?")
    (eval-and-read!
     (pr-str
      '(factory-reset!)))))

(defn ls
  ([]
   (ls (first *command-line-args*)))
  ([pattern]
   (let [resources
         (json/parse-string
          (:body
           (http/get
            (cond-> "http://localhost:4911/resources"
              pattern (str "?pattern=" (url-encode pattern)))
            {"accept" "application/json"})))
         sw (java.io.StringWriter.)]
     (with-open [out (java.io.PrintWriter. sw)]
       (binding [*out* out]
         (doseq [res resources]
           (println res))))
     (when-not (str/blank? (.toString sw))
       (let [{:keys [status result]}
             (b/gum {:cmd :filter
                     :opts {:placeholder "Select resource"
                            :fuzzy false
                            :indicator "⮕"
                            :indicator.foreground "#C72"
                            :match.foreground "#C72"}
                     :in (io/input-stream (.getBytes (.toString sw)))})]

         (when (zero? status)
           (let [resource (json/parse-string
                           (:body
                            (http/get
                             (str "http://localhost:4911/resource?uri=" (url-encode (first result)))
                             {"accept" "application/json"})))]
             (pprint resource))))))))

(defn ls-type [typ]
  (ls `(~'ls-type ~typ)))

(defn ls-site-type [typ]
  (ls `(~'ls-site-type ~typ)))

(defn input-uri [{:keys [prompt default]}]
  (let [grab (fn [prefix] (input
                           {:header (str prefix prompt)
                            :value default}))]
    (loop [base-uri (grab "")]
      (if (re-matches #"https?://.+" base-uri)
        base-uri
        (recur (grab "Bad format. "))))))

(defn input-auth-base-uri []
  (input-uri {:prompt "Enter auth base URI"
              :default "https://"}))

(defn input-data-base-uri []
  (input-uri {:prompt "Enter data base URI"
              :default "https://"}))

(defn resolve-parameters [parameters args]
  (reduce
   (fn [acc [parameter {:keys [default choices]}]]
     (assoc acc parameter
            (or (get args (keyword parameter))
                default
                (cond
                  choices (let [choice-v (map (juxt #(format "%s (%s)" (:label %) (:value %)) identity) choices)
                                choice (choose (map first choice-v) {:header (format "Choose %s" parameter)})
                                value (get-in (into {} choice-v) [choice :value])]
                            value)
                  :else
                  (input {:header parameter})))))
   {}
   parameters))

(defn add-base-uris [m]
  (merge
   {:auth-base-uri (or (get-in (config) [:juxt.site/authorization-server :juxt.site/base-uri])
                       (input-auth-base-uri))
    :data-base-uri (or (get-in (config) [:juxt.site/resource-server :juxt.site/base-uri])
                       (input-data-base-uri))}
   m))

(defn install-group [{:keys [auth-base-uri data-base-uri group] :as args}]
  (binding [*heading* "Install group"]
    (let [groups (groups)
          group (or group
                    (let [{:keys [status result]}
                          (b/gum {:cmd :filter
                                  :opts {:placeholder "Select resource"
                                         :fuzzy false
                                         :indicator "⮕"
                                         :indicator.foreground "#C72"
                                         :match.foreground "#C72"}
                                  :in (io/input-stream (.getBytes (str/join "\n"(sort (keys groups)))))})]
                      (when-not (zero? status)
                        (throw (ex-info "Error, non-zero status" {})))
                      (first result)))
          {:juxt.site/keys [description parameters installers]} (get groups group)
          uri-map {"https://auth.example.org" auth-base-uri
                   "https://data.example.org" data-base-uri}]

      (install-with-http!
       installers
       uri-map
       (resolve-parameters (apply-uri-map uri-map parameters) args)
       {:title description}))))

(defn random-string [size]
  (apply str
         (map char
              (repeatedly size
                          (fn []
                            (rand-nth
                             (concat
                              (range (int \A) (inc (int \Z)))
                              (range (int \a) (inc (int \z)))
                              (range (int \0) (inc (int \9))))))))))

(defn new-keypair [{:keys [auth-base-uri]}]
  (let [kid (random-string 16)]
    (install-with-http!
     [{:juxt.site/base-uri "https://auth.example.org"
       :juxt.site/installer-path "/keypairs/{{kid}}"
       :juxt.site/parameters {"kid" kid}}]
     {"https://auth.example.org" auth-base-uri}
     {}
     {:title "Installing new keypair"})))

(defn client-secret [{:keys [client-id save]}]

  ;; TODO: The repl (client-secret) must also have a where clause to
  ;; restrict us to the right auth-server! Otherwise we'll be
  ;; potentially fishing out the first of a group of client-secrets!

  (let [client-secret (edn/read-string
                       (push! `(prn (~'client-secret ~client-id)) {}))]
    (binding [*out* (if save (let [dir (io/file (cache-dir) "client-secrets")]
                               (.mkdir dir)
                               (io/writer (io/file dir client-id)))
                        *out*)]
      (println client-secret))))

;; Try: sitectl zip juxt/site/oauth-authorization-endpoint -o outfile.zip
;; Set http://localhost:4440/session-scopes/form-login-session
(defn zip [{:keys [auth-base-uri data-base-uri group outfile] :as args}]
  (let [args args #_(assoc args
                    ;;:session-scope (str auth-base-uri "/session-scopes/form-login-session")
                    ;;
                    ;; These shouldn't be parameters, but easily
                    ;; PATCH'd defaults in the resource.
                    ;;:authorization-code-length 20
                    ;;:jti-length 20
                    )
        groups (groups)
        {:juxt.site/keys [description parameters installers]} (get groups group)
        uri-map
        {"https://auth.example.org" auth-base-uri
         "https://data.example.org" data-base-uri}

        parameters
        (resolve-parameters (apply-uri-map uri-map parameters) args)

        installers (apply-uri-map uri-map installers)

        installer-map (ciu/unified-installer-map
                       (io/file (System/getenv "SITE_HOME") "installers")
                       uri-map)

        installers-seq (ciu/installer-seq installer-map parameters installers)]

    ;; The reason to use a zip file is to allow future extensions
    ;; where the zip file can contain binary data, such as images used
    ;; in login screens. Site is very capable at storing and serving
    ;; binary assets. It can also contain signatures, such as
    ;; install.edn.sig.
    (with-open [out (new java.util.zip.ZipOutputStream (new java.io.FileOutputStream outfile))]
      (.putNextEntry out (new java.util.zip.ZipEntry "install.edn"))
      (doseq [op installers-seq
              :let [edn {:juxt.site/operation-uri (get-in op [:juxt.site/init-data :juxt.site/operation-uri])
                         :juxt.site/operation-arg (get-in op [:juxt.site/init-data :juxt.site/input])}
                    content (str (with-out-str (pprint edn)) "\r\n")
                    bytes (.getBytes content "UTF-8")]]
        (.write out bytes 0 (count bytes)))
      (.closeEntry out))

    #_(pprint {:description description
             :parameters parameters
             :args args
             :uri-map uri-map
             :operations
             (for [op installers-seq]
               {:juxt.site/operation-uri (get-in op [:juxt.site/init-data :juxt.site/operation-uri])
                :juxt.site/operation-arg (get-in op [:juxt.site/init-data :juxt.site/input])})})))
