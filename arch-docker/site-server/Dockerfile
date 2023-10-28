FROM juxt/arch-clojure:latest

WORKDIR /site

RUN git clone https://github.com/juxt-site/site /site

RUN clj -P

# Make sure gum has color
ENV CLICOLOR_FORCE=true

COPY --from=ghcr.io/babashka/babashka:latest /usr/local/bin/bb /usr/bin/bb
COPY --from=ghcr.io/charmbracelet/gum:latest /usr/local/bin/gum /usr/bin/gum

ENV SITE_HOME=/site
ENV PATH="$SITE_HOME/bin:$SITE_HOME/server/bin:${PATH}"

RUN mkdir -p $HOME/.config/site
RUN cp $SITE_HOME/server/etc/config/local-development.edn $HOME/.config/site/config.edn

WORKDIR /site/server

RUN clojure -P -Mprod -m juxt.site.main

#CMD ["/site/start-and-populate.sh"]
CMD ["/bin/bash"]
