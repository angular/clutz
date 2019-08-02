goog.provide('method_generics');

/**
 * @param {T} a
 * @template T
 * @constructor
 */
method_generics.Foo = function(a) {};

/**
 * T is defined on the constructor and should not be redefined on the method level in the resulting
 * typescript code.
 *
 * @return {T}
 * @template T
 */
method_generics.Foo.prototype.pop = function() {};

/**
 * T is defined on the constructor and should not be redefined on the method level in the resulting
 * typescript code.
 *
 * @param {T} value
 * @template T
 */
method_generics.Foo.prototype.push = function(value) {};

/**
 * T is defined on the constructor and should not be redefined on the method level in the resulting
 * typescript code. R should be defined on the method level.
 *
 * @param {T} foo
 * @param {R} bar
 * @template T,R
 */
method_generics.Foo.prototype.bar = function(foo, bar) {};


/**
 * Static method: T and R must be defined on the method in the resulting typescript code
 *
 * @param {R} bar
 * @return {T}
 * @template T,R
 */
method_generics.Foo.staticBar = function(bar) {};
