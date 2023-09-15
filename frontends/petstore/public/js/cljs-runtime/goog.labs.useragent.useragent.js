goog.loadModule(function(exports) {
  "use strict";
  goog.module("goog.labs.userAgent");
  const USE_CLIENT_HINTS_OVERRIDE = goog.define("goog.labs.userAgent.USE_CLIENT_HINTS_OVERRIDE", "");
  const USE_CLIENT_HINTS = goog.define("goog.labs.userAgent.USE_CLIENT_HINTS", false);
  exports.USE_CLIENT_HINTS = (() => {
    const override = USE_CLIENT_HINTS_OVERRIDE ? goog.getObjectByName(USE_CLIENT_HINTS_OVERRIDE) : null;
    return override != null ? override : USE_CLIENT_HINTS;
  })();
  return exports;
});

//# sourceMappingURL=goog.labs.useragent.useragent.js.map
