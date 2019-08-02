goog.provide('nested.foo');
goog.provide('nested.foo.Klass');
goog.provide('nested.PrivateC');
goog.provide('nested.PrivateC.Enum');
goog.provide('nested.NotNested');
goog.provide('nested.NotNestedEither');

/** @constructor @private */
nested.PrivateC = function() {};

/** @enum {number} */
nested.PrivateC.Enum = {};

/** @type {!nested.PrivateC} */
nested.foo = new nested.PrivateC();

/** @constructor */
nested.foo.Klass = function() {};

/** @enum */
nested.NotNested = {};

/** @enum */
nested.NotNestedEither = {};