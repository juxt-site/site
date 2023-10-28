.PHONY: build

build:
	docker build -t juxt/site-server-demo-instance:latest .

run-shell:
	docker run -it juxt/site-server-demo-instance:latest

run-live:
	docker run --net host -it juxt/site-server-demo-instance:latest
