goog.provide('global.generic.type');
goog.provide('global.non.generic.type');
goog.provide('nested.generic.type');

/** @type {!Map<string, string>} */
global.generic.type = null;

/** @type {!Map} */
global.non.generic.type = null;

/** @type {!SomeType<!Map<string, string>>} */
nested.generic.type = null;
