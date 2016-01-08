goog.provide('privatetype');
goog.provide('privatetype.enumUser');
goog.provide('privatetype.user');
goog.provide('privatetype.Foo');

/**
 * @enum {string}
 * @private
 */
privatetype.PrivateEnum_ = { VALUE: '' };

/** @type {privatetype.PrivateEnum_} */
privatetype.enumUser = privatetype.PrivateEnum_.VALUE;

/** @type {privatetype.X_} */
privatetype.user = new privatetype.X_();

/** @constructor @private */
privatetype.X_ = function() {};

/** @constructor */
privatetype.Foo = function(a) {}

/**
 * @enum {number}
 * @private
 */
privatetype.Foo.AnotherPrivateEnum_ = { A: 0 };

/** @typedef {{ a: privatetype.Foo.AnotherPrivateEnum_}} */
privatetype.Foo.typedef;

