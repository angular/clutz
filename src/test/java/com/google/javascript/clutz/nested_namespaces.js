goog.provide('nested.foo');
goog.provide('nested.foo.Klass');
goog.provide('nested.PrivateC');
goog.provide('nested.PrivateC.Enum');

/** @constructor @private */
nested.PrivateC = function() {};

/** @enum {number} */
nested.PrivateC.Enum = {};

/** @type {nested.PrivateC} */
nested.foo = null;

/** @constructor */
nested.foo.Klass = function() {};