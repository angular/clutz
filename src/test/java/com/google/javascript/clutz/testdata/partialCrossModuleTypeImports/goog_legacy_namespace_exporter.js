goog.module("goog.legacy.namespace.exporter");
//!! legacy namespace vs. goog.provide not relevant to the test, just the first
//!! instance of destructuring a namespace require was a legacy namespace.
goog.module.declareLegacyNamespace();

/**@constructor */
function LegacyBaseClass() {}

/**@constructor */
function OriginalName() {}

exports.LegacyBaseClass = LegacyBaseClass;
exports.OriginalName = OriginalName;