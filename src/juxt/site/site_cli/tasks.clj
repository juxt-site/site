;; Copyright © 2023, JUXT LTD.

(ns juxt.site.site-cli.tasks
  (:refer-clojure :exclude [find])
  (:require
   [babashka.http-client :as http]
   [bblgum.core :as b]
   [cheshire.core :as json]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as str]
   [clojure.walk :refer [postwalk]]
   [juxt.site.cli-util.parameters :refer [resolve-parameters]]
   [juxt.site.cli-util.user-input :as input]
   [juxt.site.cli-util.cli-util :as util :refer [stderr console-recv console-info curl]]
   [juxt.site.install.common-install-util :as ciu]))

(defn configure
  "Create a static edn configuration file"
  [{:keys [auth-base-uri data-base-uri]}]
  (let [dir (some identity
                  [(io/file (System/getenv "XDG_CONFIG_HOME"))
                   (io/file (System/getenv "HOME") ".config/site")])
        config-file (io/file dir "site-cli.edn")]
    (when (.exists config-file)
      (throw (ex-info "Config file already exists" {:file config-file})))
    (spit
     config-file
     (with-out-str
       (pprint
        (cond-> (util/default-config)
          auth-base-uri (assoc-in ["uri-map" "https://auth.example.org"] auth-base-uri)
          data-base-uri (assoc-in ["uri-map" "https://data.example.org"] data-base-uri)))))))

(defn configure-task []
  (let [opts (util/parse-opts)
        cfg (util/config opts)]
    (configure cfg)))

(defn url-encode [s]
  (when s
    (java.net.URLEncoder/encode s)))

(defn list-task []
  (let [{:keys [pattern] :as opts} (util/parse-opts)
        cfg (util/config (util/profile opts))
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "The admin-server is not reachable."))
      (doseq [res (json/parse-string
                   (:body
                    (http/get
                     (cond-> (str admin-base-uri "/resources")
                       pattern (str "?pattern=" (url-encode pattern)))
                     {:headers {:accept "application/json"}})))]
        (println res)))))

(defn find []
  (let [{:keys [pattern] :as opts} (util/parse-opts)
        cfg (util/config (util/profile opts))
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "The admin-server is not reachable."))
      (let [resources
            (json/parse-string
             (:body
              (http/get
               (cond-> (str admin-base-uri "/resources")
                 pattern (str "?pattern=" (url-encode pattern)))
               {:headers {:accept "application/json"}})))

            resource (cond
                       (= (count resources) 0)
                       nil
                       (= (count resources) 1)
                       (first resources)
                       :else
                       (let [sw (java.io.StringWriter.)
                             _ (with-open [out (java.io.PrintWriter. sw)]
                                 (binding [*out* out]
                                   (doseq [res resources] (println res))))
                             {:keys [status result]}
                             (b/gum {:cmd :filter
                                     :opts {:placeholder "Select resource"
                                            :fuzzy false
                                            :indicator "⮕"
                                            :indicator.foreground "#C72"
                                            :match.foreground "#C72"}
                                     :in (io/input-stream (.getBytes (.toString sw)))})]

                         (when (zero? status)
                           (first result))))]

        (when resource
          (print
           (:body
            (http/get
             (str admin-base-uri "/resource?uri=" (url-encode resource))))))))))

;; site request-token --client-secret $(site client-secret)
;; site request-token --username alice --password $(gum input --password)


(defn api-request [path]
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        args (select-keys opts [:reqid :match :logger-name :before :after])
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        endpoint (str data-base-uri path)
        accept (cond
                 (get opts :edn) "application/edn"
                 (get opts :txt) "text/plain"
                 (get opts :csv) "text/csv")
        authorization (util/authorization cfg)
        headers (cond-> {:content-type "application/json"}
                  authorization (assoc :authorization authorization)
                  accept (assoc :accept accept))]

    (if (:curl opts)
      (curl (assoc opts :uri endpoint))
      (let [{:keys [status body]}
            (http/get
             endpoint
             {:headers headers
              :query-params args
              :throw false})]
        (case status
          200 (print body)
          401 (stderr
               (print status body)
               (println "Hint: Try requesting an access-token (site request-token)"))
          (stderr
           (print status body)
           (.flush *out*)))))))

(defn whoami [{:keys [verbose] :as opts}]
  (let [path "/_site/whoami"]
    (if-not verbose
      (let [cfg (util/config (util/profile opts))
            data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
            endpoint (str data-base-uri path)
            authorization (util/authorization cfg)

            {:keys [status body]}
            (http/get
             endpoint
             {:headers
              (cond-> {:accept "application/edn"}
                authorization (assoc :authorization authorization))
              :throw false})]
        (case status
          200 (let [edn (clojure.edn/read-string body)
                    whoami (or
                            (get-in edn [:juxt.site/user :juxt.site/username])
                            (get-in edn [:juxt.site/application :juxt.site/client-id]))]
                (if whoami
                  (println whoami)
                  (stderr
                   (println
                    "No valid subject (hint: try requesting an access token with site request-token)"))))
          401 (do
                (print status body)
                (println "Hint: Try requesting an access-token (site request-token)"))
          (do
            (print status body)
            (.flush *out*))))
      ;; Verbose
      (api-request path))))

(defn whoami-task []
  (whoami (util/parse-opts)))

(defn users []
  (api-request "/_site/users"))

(defn applications []
  (let [{:keys [verbose] :as opts} (util/parse-opts)
        path "/_site/applications"]
    (if-not verbose
      (let [cfg (util/config (util/profile opts))
            data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
            endpoint (str data-base-uri path)
            authorization (util/authorization cfg)
            {:keys [status body]}
            (http/get
             endpoint
             {:headers (cond-> {:accept "application/json"}
                         authorization (assoc :authorization authorization))
              :throw false})]
        (case status
          200 (let [json (json/parse-string body)]
                (if json
                  (doseq [app json]
                    (println (get app "juxt.site/client-id")))
                  (println "No body")
                  ))
          401 (do
                (print status body)
                (println "Hint: Try requesting an access-token (site request-token)"))
          (do
            (print status body)
            (.flush *out*))))
      ;; Verbose
      (api-request path))))

(defn openapis []
  (api-request "/_site/openapis"))

(defn events []
  (api-request "/_site/events"))

(defn logs []
  (api-request "/_site/logs"))

(memoize
 (defn bundles [cfg]
   (let [bundles-file (io/file (get cfg "installers-home") "bundles.edn")]
     (when-not (.exists bundles-file)
       (throw (ex-info "bundles.edn does not exist" {:bundles-file (.getAbsolutePath bundles-file)})))
     (edn/read-string
      (slurp (io/file (System/getenv "SITE_HOME") "installers/bundles.edn"))))))

(defn uri-map-replace
  "Replace URIs in string, taking substitutions from the given uri-map."
  [s uri-map]
  (str/replace
   s
   #"(https?://.*?example.org)([\p{Alnum}-]+)*"
   (fn [[_ host path]] (str (get uri-map host host) path))))

(defn apply-uri-map [uri-map installers]
  (postwalk
   (fn walk-fn [node]
     (cond
       (string? node) (uri-map-replace node uri-map)
       :else node))
   installers))

(defn- installers-seq
  [cfg
   {parameters :juxt.site/parameters
    installers :juxt.site/installers}
   opts]
  (let [uri-map (get cfg "uri-map")

        parameters
        (resolve-parameters (apply-uri-map uri-map parameters) (apply-uri-map uri-map opts))

        installers
        (apply-uri-map uri-map installers)

        installer-map
        (ciu/unified-installer-map
         (io/file (get cfg "installers-home"))
         uri-map)]

    (ciu/installer-seq installer-map parameters installers)))

(defn bundle [{bundle-name :bundle :as opts}]
  (let [cfg (util/config (util/profile opts))
        bundle (get (bundles cfg) bundle-name)]
    (if bundle
      (pprint
       {:name bundle-name
        :installers (installers-seq cfg bundle opts)}
       ;; (map :juxt.site/init-data)
       )
      (stderr (println (format "Bundle not found: %s" bundle-name))))))

(defn bundle-task []
  (bundle (util/parse-opts)))

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

(defn countdown [start]
  (println "(To abort: Control-C)")
  (print "Deleting resources in ")
  (.flush *out*)
  (Thread/sleep 200)
  (doseq [n (reverse (map inc (range start)))]
    (print (str n "... "))
    (.flush *out*)
    (Thread/sleep 1000))
  (println))

;; Equivalent to: curl -X POST http://localhost:4911/reset
(defn reset
  "Delete ALL resources from a Site instance"
  []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "Cannot reset. The admin-server is not reachable."))
      (let [abort?
            (when-not (:no-confirm opts)
              (if (input/confirm "Factory reset and delete ALL resources?")
                (when-not (:no-countdown opts)
                  (countdown 3))
                :abort))]
        (if abort?
          (println "Aborting reset")
          (do
            (println "Requesting removal of all resources")
            (let [response
                  (http/post (str admin-base-uri "/reset"))]
              ;; print not println, as the body should be terminated in a CRLF
              (console-recv response))))))))

(defn- install [{:keys [resources-uri access-token]} bundle]
  (assert resources-uri)
  (let [{:keys [status body] :as response}
        (http/post
         resources-uri
         {:headers (cond-> {:content-type "application/edn"}
                     access-token (assoc :authorization (format "Bearer %s" access-token)))
          :body (pr-str bundle)
          :throw false})]
    (console-recv response)))

(defn- install-bundle [cfg bundle params {:keys [debug] :as opts}]
  (assert bundle)
  (let [title (get bundle :juxt.site/title)
        param-str (str/join ", " (for [[k v] params] (str (name k) "=" v)))
        installers-seq (installers-seq cfg bundle (into opts (for [[k v] params] [(name k) v])))]
    (if debug
      (pprint installers-seq)
      (do
        (stderr
         (println
          (if (str/blank? param-str)
            (format "info: Installing: %s" title)
            (format "info: Installing: %s with %s" title param-str))))
        (install opts (ciu/bundle-map title installers-seq (get cfg "uri-map")))))))

(defn install-bundle-task []
  (let [{bundle-names :bundle _ :debug :as opts} (util/parse-opts)
        cfg (util/config (util/profile opts))
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        resources-uri (str data-base-uri "/_site/bundles")
        bundles (bundles cfg)]
    (doseq [bundle-name bundle-names
            :let [bundle (get bundles bundle-name)
                  params (dissoc opts :bundle)]]
      (install-bundle
       cfg bundle params
       (assoc opts
              :resources-uri resources-uri
              :access-token (util/retrieve-token cfg))))))

(defn- install-bundles [{bundle-specs :bundles :as opts}]
  (let [cfg (util/config (util/profile opts))
        bundles (bundles cfg)]
    (doseq [[bundle-name params] bundle-specs
            :let [bundle (get bundles bundle-name)]]
      (install-bundle cfg bundle params opts))))

(defn post-init
  ([cfg]
   (post-init cfg false))
  ([cfg silent]
   (let [admin-base-uri (get cfg "admin-base-uri")]
     (if-not admin-base-uri
       (stderr (println "Cannot init. The admin-server is not reachable."))
       (let [auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
             data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
             insite-secret (util/request-client-secret admin-base-uri "insite")
             site-cli-secret (util/request-client-secret admin-base-uri "site-cli")
             token-endpoint (str auth-base-uri "/oauth/token")
             site-api-root (str data-base-uri "/_site")]
         (stderr
          (when-not silent
            (if-not (and insite-secret site-cli-secret)
              (do
                (println "Register the site-cli app to proceed")
                (println "One way to do this is to run 'site install juxt/site/system-client --client-id site-cli'"))
              (do
                (println "Next steps: you should continue to configure your Site instance,")
                (println "using one of the following methods:")
                (println)

                (println (format
                          "A. Proceed to https://insite.juxt.site?token_endpoint=%s&client_secret=%s&site_api_root=%s"
                          token-endpoint
                          insite-secret
                          site-api-root))

                (println " or ")
                (println (format "B. Continue with this site tool, acquiring an access token with:"))
                ;; TODO: We could pipe this to '| xclip -selection clipboard'
                (println (format "   site request-token --client-secret %s" site-cli-secret)))))))))))

(defn post-init-task []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))]
    (post-init cfg)))

(defn help [cfg]
  (println "Site Help")
  (println))

(defn help-task []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))]
    (help cfg)))

(defn register-system-clients [{:keys [silent] :as opts}]
  (let [cfg (util/config (util/profile opts))
        admin-base-uri (get cfg "admin-base-uri")]
    (install-bundles
     (assoc
      opts
      :resources-uri
      (str admin-base-uri "/resources")
      :bundles
      [
       ["juxt/site/system-client"
        (let [site-cli-config {"client-id" "site-cli"}]
          (if-let [site-cli-secret (:site-cli-secret opts)]
            (assoc site-cli-config "client-secret" site-cli-secret)
            site-cli-config))]
       ["juxt/site/system-client"
        (let [insite-config {"client-id" "insite"}]
          (if-let [insite-secret (:insite-secret opts)]
            (assoc insite-config "client-secret" insite-secret)
            insite-config))]]))
    (post-init cfg silent)))

(defn register-system-clients-task []
  (register-system-clients (util/parse-opts)))

(defn init
  [{:keys [no-clients] :as opts}]
  (let [cfg (util/config (util/profile opts))
        admin-base-uri (get cfg "admin-base-uri")]
    (if-not admin-base-uri
      (stderr (println "Cannot init. The admin-server is not reachable."))
      (do
        (install-bundles
         (assoc
          opts
          :resources-uri
          (str admin-base-uri "/resources")
          :bundles
          (keep
           identity
           [["juxt/site/bootstrap" {}]
            ["juxt/site/oauth-scope" {}]
            ["juxt/site/full-dynamic-remote" {}]
            ["juxt/site/unprotected-resources" {}]
            ["juxt/site/protection-spaces" {}]
            ;; Support the creation of JWT bearer tokens
            ["juxt/site/oauth-token-endpoint" {}]
            ;; Install a keypair to sign JWT bearer tokens
            ["juxt/site/keypair" {"kid" (random-string 16)}]
            ;; Install the required APIs
            ["juxt/site/user-model" {}]
            ["juxt/site/protection-spaces" {}]
            ["juxt/site/selmer-templating" {}]

            ["juxt/site/resources-api" {}]
            ["juxt/site/events-api" {}]
            ["juxt/site/logs-api" {}]
            ["juxt/site/whoami-api" {}]
            ["juxt/site/users-api" {}]
            ["juxt/site/users-api-permissions" {}]
            ["juxt/site/applications-api" {}]
            ["juxt/site/applications-endpoint" {}]
            ["juxt/site/openapis-api" {}]
            ["juxt/site/bundles-api" {}]

            ["juxt/site/sessions" {}]
            ["juxt/site/roles" {}]

            ;; RFC 7662 token introspection
            ["juxt/site/oauth-introspection-endpoint" {}]])))

        (when-not no-clients
          (register-system-clients opts))))))

(defn init-task []
  (init (util/parse-opts)))

(defn new-keypair []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])]
    (install-bundles
     (assoc
      opts
      :resources-uri
      (str data-base-uri "/_site/bundles")
      :access-token
      (util/retrieve-token cfg)
      :bundles
      [ ;; Install a new keypair to sign JWT bearer tokens
       ["juxt/site/keypair" {"kid" (random-string 16)}]]))))

;; Create alice
;; site register-user --username alice --fullname "Alice Carroll" --password $(gum input --password)
;; equivalent to
;; jo -- -s username=alice fullname="Alice Carroll" password=foobar | curl --json @- http://localhost:4444/_site/users
(defn register-user [opts]
  (let [cfg (util/config (util/profile opts))
        base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        authorization (util/authorization cfg)
        {:keys [status body]}
        (http/post
         (str base-uri "/_site/users")
         {:headers (cond->
                       {:content-type "application/json"
                        :accept "application/json"}
                     authorization (assoc :authorization authorization))
          :body (json/generate-string opts {:pretty true})
          :throw false})]
    (case status
      200 (print body)
      (print status body))))

(defn register-user-task []
  (register-user (util/parse-opts)))

;; Grant alice a role
;; jo -- -s juxt.site/user=http://localhost:4444/_site/users/alice juxt.site/role=http://localhost:4444/_site/roles/SiteAdmin | curl --json @- http://localhost:4440/operations/assign-role
;; site assign-user-role --username alice --role SiteAdmin
(defn assign-user-role [opts]
  (let [cfg (util/config (util/profile opts))
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        authorization (util/authorization cfg)
        {:keys [status body]}
        (http/post
         (str auth-base-uri "/operations/assign-role")
         {:headers (cond-> {:content-type "application/edn"}
                     authorization (assoc :authorization authorization))
          :body (pr-str
                 {:juxt.site/user (str data-base-uri "/_site/users/" (:username opts))
                  :juxt.site/role (str data-base-uri "/_site/roles/" (:role opts))})
          :throw false})]
    (case status
      200 (print body)
      (print status body))))

(defn assign-user-role-task []
  (assign-user-role (util/parse-opts)))

(defn register-application [{:keys [client-id client-type redirect-uris scope] :as opts}]
  (let [cfg (util/config (util/profile opts))
        auth-base-uri (get-in cfg ["uri-map" "https://auth.example.org"])
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])

        client-id (or client-id (input/input {:header (format "Input client id")}))
        client-type (or client-type
                        (input/choose
                         ["public" "confidential"]
                         {:header (format "Input client type")}))
        redirect-uris (or redirect-uris
                          (str/split
                           (input/input {:header "Redirect URIs (space-separated)"})
                           #"\s+"))
        scope (or scope (str/split
                         (input/input {:header "Scope (space-separated)"})
                         #"\s+"))
        #_{:keys [status body]}
        #_(http/post
           (str data-base-uri "/_site/applications")
           {:headers {"content-type" "application/json"
                      :accept "application/json"
                      "authorization" (util/authorization cfg)}
            :body (json/generate-string opts {:pretty true})
            :throw false})]

    (when-not (#{"public" "confidential"} client-type)
      (throw (ex-info "Invalid client-type" {})))

    (println
     (json/generate-string
      {"client_id" client-id
       "client_type" client-type
       "redirect_uris" redirect-uris
       "scope" scope}))

    #_(case status
        200 (print body)
        (print status body))))

(defn register-application-task []
  (register-application (util/parse-opts)))

(defn bundles-task []
  (doseq [[k _] (sort (bundles (util/config (util/profile (util/parse-opts)))))]
    (println k)))

(defn install-openapi [opts]
  (let [cfg (util/config (util/profile opts))
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        access-token (util/retrieve-token cfg)
        openapi-file (io/file (:openapi opts))]

    (when-not (.exists openapi-file)
      (throw
       (ex-info
        (format "No such file: %s" (.getAbsolutePath openapi-file))
        {:openapi-file openapi-file})))

    (let [[_ suffix] (re-matches #".*\.([^\.]+)" (.getName openapi-file))
          content-type (get {"json" "application/json"
                             ;; Check this is the right mime-type
                             "yaml" "application/yaml"
                             "edn" "application/edn"} suffix)]

      (when-not content-type
        (throw (ex-info (format "Unrecognised format: %s" suffix) {:suffix suffix})))

      (let [openapi
            (cond-> (slurp openapi-file)
              (= content-type "application/json") json/parse-string
              (= content-type "application/edn") clojure.edn/read-string)

            _ (when-not (= (get openapi "openapi") "3.0.2")
                (throw (ex-info "Must be 3.0.2" {})))

            mapped-openapi
            (-> openapi
                (update-in ["servers" 0 "url"] (fn [url] (str data-base-uri url))))

            ;; Update with mapped urls
            mapped-openapi
            (postwalk (ciu/make-uri-map-replace-walk-fn
                       (get cfg "uri-map"))
                      mapped-openapi)

            json-body (json/generate-string mapped-openapi)

            {:keys [status body]}
            (http/post
             (str data-base-uri "/_site/openapis")
             {:headers (cond-> {"content-type" "application/json"}
                         access-token (assoc "authorization" (format "Bearer %s" access-token)))
              :body json-body
              :throw false})]

        (if (str/blank? body)
          (println status)
          (do
            (print status body)
            (.flush *out*)))))))

;; site install-openapi demo/petstore/openapi.json
(defn install-openapi-task []
  (let [opts (util/parse-opts)]
    (try
      (install-openapi opts)
      (catch Exception e
        (if (:debug opts)
          (throw e)
          (binding [*err* *out*]
            (println (.getMessage e))))))))

;; Dynamic builders

(defn new-resource []
  (let [{:keys [uri] :as opts} (util/parse-opts)
        cfg (util/config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        placeholder (str data-base-uri "/")
        new-resource-uri
        (or uri
            (input/input
             {:header "URI"
              :value placeholder}))
        authorization (util/authorization cfg)]
    (http/put
     (str new-resource-uri ".meta")
     {:headers (cond-> {:content-type "application/edn"}
                 authorization (assoc :authorization authorization))
      :body (pr-str {})
     })))

(defn attach-method []
  (let [{:keys [uri method operation] :as opts} (util/parse-opts)
        cfg (util/config opts)
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])
        placeholder (str data-base-uri "/")
        uri
        (or uri
            (input/input
             {:header "URI"
              :value placeholder}))
        method (or method
                   (input/choose
                    ["GET" "POST" "PUT" "DELETE"]
                    {:header "Method"}))
        operation (or operation
                      ;; TODO: We could retrieve all the available
                      ;; operations here, once we have a way of
                      ;; creating operations.
                      (input/input
                       {:header "Operation"
                        :value (str placeholder "operations/")}))
        authorization (util/authorization cfg)]
    (http/patch
     (str uri ".meta")
     {:headers (cond-> {:content-type "application/edn"}
                 authorization (assoc :authorization authorization))
      :body (pr-str
             {:add-method
              {:method method
               :operation operation}})})))

;; Temporary convenience for ongoing development

;; Call this with a user or application in the SiteAdmin role
(defn install-openapi-support []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])]
    (install-bundles
     (assoc
      opts
      :resources-uri
      (str data-base-uri "/_site/bundles")
      :access-token
      (util/retrieve-token cfg)
      :bundles
      [
       ;; Assuming https://auth.example.org/session-scopes/form-login-session...
       ["juxt/site/login-form" {}]
       ;; This is public and you may not want to expose this
       ["juxt/site/system-api-openapi" {}]
       ["juxt/site/oauth-authorization-endpoint"
        {"session-scope" "https://auth.example.org/session-scopes/form-login-session"}]

       ;; Register swagger-ui
       ;; TODO: Try not registering this one and see the awful Jetty
       ;; error that results!
       ["juxt/site/system-client" {"client-id" "swagger-ui"}]]))

    (console-info
     (format
      "Now browse to https://petstore.swagger.io/?url=%s/_site/openapi.json"
      data-base-uri))))

(defn install-petstore []
  (let [opts (util/parse-opts)
        cfg (util/config (util/profile opts))
        data-base-uri (get-in cfg ["uri-map" "https://data.example.org"])]

    (install-bundles
     (assoc opts
            :resources-uri (str data-base-uri "/_site/bundles")
            :access-token (util/retrieve-token cfg)
            :bundles
            [["demo/petstore/operations" {}]
             ["demo/petstore/petstore-app" {}]]))

    (install-openapi (assoc opts :openapi (str (System/getenv "SITE_HOME") "/demo/petstore/openapi.json")))

    (console-info
     (format
      "Now browse to https://petstore.swagger.io/?url=%s/petstore/openapi.json"
      data-base-uri))))

(defn bootstrap [opts]
  (let [cfg (util/config (util/profile opts))
        admin-base-uri (get cfg "admin-base-uri")
        client-id "site-cli"
        token (atom nil)]
    (init (assoc opts :silent true))
    (reset! token
            (util/request-token
             {:client-id client-id
              :client-secret
              (util/request-client-secret admin-base-uri client-id)}))
    (util/save-access-token @token)
    (install-bundles
     (assoc
      opts
      :resources-uri
      (str admin-base-uri "/bundles")
      :bundles
      [["juxt/site/system-api-openapi"]
       ;; There's a dependency between /oauth/authorize and form-login-session, so we need login-form
       ["juxt/site/login-form"]
       ;; TODO: Why not make this dynamic - the choices are filtered based on what session-scopes we have already installed
       ["juxt/site/oauth-authorization-endpoint" {"session-scope" "https://auth.example.org/session-scopes/form-login-session"}]
       ["juxt/site/system-client" {"client-id" "swagger-ui"}]]))
    (println "\n\n")
    (println "Next steps: ")
    (println "\tBrowse to https://petstore.swagger.io/?url=http://localhost:4444/_site/openapi.json")
    (println "\tClick on authorize, add swagger-ui as the client_id, select all scopes and authorize.")
    ;; TODO As more demos are added, adjust this to be a gum selector
    (install-petstore)

    ;; Now all that is left to do is register a user.
    ))

(defn bootstrap-task []
  (bootstrap (util/parse-opts)))


;; To install an openid-user (rather than a password one), do the following:
;;
;; Register a user without a password with
;;
;; site register-user --username alice
;;
;; Use 'site users' to get the user's uri (xt/id)
;;
;;
;; Install
;; site install juxt/site/openid-support

;; site install juxt/site/openid-issuer
;; Issuer: https://juxt.eu.auth0.com/


;; site install juxt/site/openid-user-identity
;; Issuer: https://juxt.eu.auth0.com/
;; Nickname: the github username of the user
;; Associated user (URI): the user uri as found above
