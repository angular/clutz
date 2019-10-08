goog.provide('globalNs.generic.type');
goog.provide('globalNs.non.generic.type');
goog.provide('nested.generic.type');

/** @type {!Map<string, string>} */
globalNs.generic.type = null;

/** @type {!Map} */
globalNs.non.generic.type = null;

/** @type {!SomeType<!Map<string, string>>} */
nested.generic.type = null;
