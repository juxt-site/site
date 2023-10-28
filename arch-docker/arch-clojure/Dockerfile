FROM ghcr.io/archlinux/archlinux:latest

RUN pacman -Sy --noconfirm \
    git \
    jdk-openjdk \
    clojure \
    rlwrap && \
    pacman -Scc --noconfirm

CMD ["/bin/bash"]
