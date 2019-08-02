goog.provide('abstract_method.Interface');
goog.provide('abstract_method.Clazz');
goog.provide('abstract_method.Child');

/**
 * When defining a class Foo with an abstract method bar(), you can do:
 * Foo.prototype.bar = goog.abstractMethod.
 * Usually defined in base.js.
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be overridden.
 */
goog.abstractMethod = function() {
  // throws
};

/** @interface */
abstract_method.Interface = function() {};

/** @return {string} */
abstract_method.Interface.prototype.foo = function() {};

/** 
 * @param {number} a
 * @return {string}
 */
abstract_method.Interface.prototype.bar = function(a) {};

/** @constructor @implements {abstract_method.Interface} */
abstract_method.Clazz = function() {};

/** @return {string} */
abstract_method.Clazz.prototype.foo = function() { return 'asd'; };

/** @override */
// Does not repeat the type definition, so ends up as Function
abstract_method.Clazz.prototype.bar = goog.abstractMethod;

/** @constructor @extends {abstract_method.Clazz} */
abstract_method.Child = function() {};

/**
 * @override
 */
abstract_method.Child.prototype.bar = function(a) { return a + '' };
