goog.provide('ns.inner_class_of_private_class');
goog.provide('ns.inner_class_of_private_class.FooInstance');

//!! This is a generalized code of `goog.debug.Trace`.
//!! https://github.com/google/closure-library/blob/master/closure/goog/debug/tracer.js

/**
 * @constructor
 * @private
 */
ns.inner_class_of_private_class.FooType_ = function() {};

/**
 * @param {!ns.inner_class_of_private_class.FooType_.Inner} inner
 */
ns.inner_class_of_private_class.FooType_.prototype.foo = function(inner) {};

/**
 * @constructor
 */
ns.inner_class_of_private_class.FooType_.Inner = function() {};

/**
 * @type {!ns.inner_class_of_private_class.FooType_}
 */
ns.inner_class_of_private_class.FooInstance = new ns.inner_class_of_private_class.FooType_();
