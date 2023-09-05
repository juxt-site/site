FROM clojure:temurin-17-bullseye-slim

EXPOSE 4444
EXPOSE 4440
EXPOSE 4911
EXPOSE 9091

WORKDIR /site

COPY . .

ENV SITE_HOME=/site
ENV PATH="$SITE_HOME/bin:$SITE_HOME/server/bin:${PATH}"

COPY --from=ghcr.io/babashka/babashka:latest /usr/local/bin/bb /usr/bin/bb
COPY --from=ghcr.io/charmbracelet/gum:latest /usr/local/bin/gum /usr/bin/gum

RUN \
apt update && \
apt install -y jo && \
rm -rf /var/lib/apt/lists/* && \
mkdir -p $HOME/.config/site && \
cp $SITE_HOME/server/etc/config/local-development.edn ~/.config/site/config.edn

HEALTHCHECK --interval=5m --timeout=3s \
CMD site ping || exit 1

WORKDIR /site/server
ENTRYPOINT ["clj", "-M:dev"]
