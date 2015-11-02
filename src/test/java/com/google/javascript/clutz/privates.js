goog.provide('priv');

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
