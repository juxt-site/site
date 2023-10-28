.PHONY: build

build:
# We use --no-cache because we need to git clone a fresh clone
	docker build --no-cache -t juxt/site-server:latest .

run:
	docker run -it juxt/site-server:latest
