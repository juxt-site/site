FROM juxt/site-server:latest

WORKDIR /site

ENV SITE_HOME=/site
ENV PATH="$SITE_HOME/bin:$SITE_HOME/server/bin:${PATH}"

WORKDIR /site/server

COPY start-and-populate.sh /site

RUN /site/start-and-populate.sh

ENTRYPOINT ["/bin/bash"]
