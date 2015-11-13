goog.provide('priv');
goog.provide('priv2.PublicClass');

/** @private */
priv.field = 12;

/** @private */
priv.fn = function() {};

/** @private @constructor */
priv.PrivateClazz = function() {};

/** @constructor */
priv.PublicClass = function() {};

/** @private @type {number} */
priv.PublicClass.staticField_;

/** @private @type {number} */
priv.PublicClass.prototype.field;

/** @public @type {number} */
priv.PublicClass.prototype.publicField;

/** @private @return {number} */
priv.PublicClass.prototype.method_ = function() { return this.field; };

/** @constructor */
priv2.PublicClass = function() {};

/** @constructor @private */
priv2.PublicClass.PrivateNestedClass_ = function() {};
