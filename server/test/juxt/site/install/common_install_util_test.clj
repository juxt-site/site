(ns juxt.site.install.common-install-util-test
  (:require [juxt.site.install.common-install-util :as sut]
            [clojure.test :refer [deftest testing is]:as t]))

(deftest render-form-templates-simple-test
  (testing "Tests that render-form-templates returns an empty map if an empty map provided as form"
    (sut/render-form-templates {} {}))

  (testing "Tests that the render-form-templates returns input if no selmer templates in the input"
    (let [input {:hello "World"}]
      (is (= input (sut/render-form-templates input {}))))

    (let [input {:hello {:deeper "World"}}]
      (is (= input (sut/render-form-templates input {}))))

    (let [input {:hello {:deeper "World"}
                 :goodbye "multiple"}]
      (is (= input (sut/render-form-templates input {}))))

    (let [input {:hello {:deeper "World"}
                 :goodbye "multiple"}]
      (is (= input (sut/render-form-templates input {"extra" "input"}))))))

(deftest render-form-templates-replacement-test
  (testing "Tests that the render-form-templates returns modified if selmer templates in the input"
    (is (= {:hello "Land"}
           (sut/render-form-templates {:hello "{{World}}"}
                                      {"World" "Land"})))

    (is (= {:hello {:deeper "Land"}}
           (sut/render-form-templates {:hello {:deeper "{{World}}"}}
                                      {"World" "Land"})))

    (is (= {:hello {:deeper "Land"}
            :goodbye "Planet"}
           (sut/render-form-templates {:hello {:deeper "{{World}}"}
                                       :goodbye "{{multiple}}"}
                                      {"World" "Land"
                                       "multiple" "Planet"})))
    (is (= {:hello "Land"}
           (sut/render-form-templates {:hello "{{World}}"}
                                      {"World" "Land"
                                       "extra" "input"})))))

(deftest render-form-templates-selmer-syntax-test
  (testing "Tests that the render-form-templates supports the selmer syntax"
    (is (= {:hello "LAND"
            :goodbye "planet"}
           (sut/render-form-templates {:hello "{{World|upper}}"
                                       :goodbye "{{multiple|lower}}"}
                                      {"World" "Land"
                                       "multiple" "Planet"})))))

(deftest render-form-templates-missing-replacement-test
  (testing "Tests that the render-form-templates throws exception if the required template parameter is missing"
    (is (thrown? Exception
                 (sut/render-form-templates {:hello "{{World}}"}
                                            nil)))

    (is (thrown? Exception
                 (sut/render-form-templates {:hello "{{World}}"}
                                            {})))

    (is (thrown? Exception
                 (sut/render-form-templates {:hello "{{World}}"}
                                            {"multiple" "Planet"})))))

(deftest render-form-templates-supports-optional-replacement-test
  (testing "Tests that the render-form-templates replaces optional fields where the parameter is provided"
    (is (= {:hello "Land"}
           (sut/render-form-templates {:hello ^:optional {:value "{{World}}"}}
                                      {"World" "Land"})))

    (is (=  {}
            (sut/render-form-templates {:hello ^:optional {:value "{{World}}"}}
                                       {})))

    (is (= {}
           (sut/render-form-templates {:hello ^:optional {:value "{{World}}"}}
                                      {"multiple" "Planet"}))))

  (testing "Tests that the render-form-templates skips optional fields where the parameter is not provided."
    (is (= {}
           (sut/render-form-templates {:hello ^:optional {:value "{{World}}"}}
                                      nil)))

    (is (=  {}
            (sut/render-form-templates {:hello ^:optional {:value "{{World}}"}}
                                       {})))

    (is (= {}
           (sut/render-form-templates {:hello ^:optional {:value "{{World}}"}}
                                      {"multiple" "Planet"})))))
