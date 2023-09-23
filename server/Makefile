.PHONY: test

test:
#	clojure -M:test -m kaocha.runner --reporter kaocha.report/dots test
	clojure -M:test -m kaocha.runner test
#	clojure -M:test -m kaocha.runner test --focus juxt.site.basic-auth-test
	@date

lint:
	clj-kondo --lint src/juxt --lint test/juxt

watch:
	clojure -M:test -m kaocha.runner --watch test
