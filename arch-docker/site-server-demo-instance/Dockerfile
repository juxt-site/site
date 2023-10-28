FROM juxt/site-server-post-init:latest

EXPOSE 4444
EXPOSE 4440
EXPOSE 4911
EXPOSE 9091

WORKDIR /site

ENV SITE_HOME=/site
ENV PATH="$SITE_HOME/bin:$SITE_HOME/server/bin:${PATH}"

WORKDIR /site/server

COPY start-and-register-system-clients.sh /site/server

ENTRYPOINT ["/site/server/start-and-register-system-clients.sh"]
