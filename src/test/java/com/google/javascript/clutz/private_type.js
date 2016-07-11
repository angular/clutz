goog.provide('privatetype');
goog.provide('privatetype.enumUser');
goog.provide('privatetype.user');
goog.provide('privatetype.Foo');
goog.provide('privatetype.X_');

/**
 * @enum {string}
 * @private
 */
privatetype.PrivateEnum_ = { VALUE: '' };

/** @type {!privatetype.PrivateEnum_} */
privatetype.enumUser = privatetype.PrivateEnum_.VALUE;

/** @type {!privatetype.X_} */
privatetype.user = new privatetype.X_();

/** @constructor @private */
privatetype.X_ = function() {};

privatetype.X_.staticMethod = function() {};

privatetype.X_.prototype.method = function() {};

/** @constructor */
privatetype.Foo = function(a) {}

/** @return {!privatetype.Foo.AnotherPrivateEnum_} */
privatetype.Foo.prototype.foo = function() {};

/**
 * @enum {number}
 * @private
 */
privatetype.Foo.AnotherPrivateEnum_ = { A: 0 };

/** @typedef {{ a: !privatetype.Foo.AnotherPrivateEnum_}} */
privatetype.Foo.typedef;
