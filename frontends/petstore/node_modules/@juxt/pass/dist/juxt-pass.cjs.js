'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./juxt-pass.cjs.prod.js");
} else {
  module.exports = require("./juxt-pass.cjs.dev.js");
}
