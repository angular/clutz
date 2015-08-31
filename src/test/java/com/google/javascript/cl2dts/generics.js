goog.provide('generics');

/**
 * @constructor
 * @template T
 * @template U
 */
generics.Foo = function() { };

/** @return {T} */
generics.Foo.prototype.get = function() { return null; };

/** @param {T} t */
generics.Foo.prototype.set = function(t) { };

/**
 * @param {T} t
 * @param {V} v
 * @template V
 * @template W
 */
generics.Foo.prototype.loop = function(t, v) { return v(t); };

/** @type {generics.Foo<string>} */
generics.fooMissingOneTypeParam = new generics.Foo();

/** @type {generics.Foo} */
generics.fooMissingAllTypeParams = new generics.Foo();

/** @type {Array} */
generics.arrayMissingTypeParam = [];

/**
 * @param {T} a
 * @return {T}
 * @template T
 */
generics.identity = function(a) { return a; };

/**
 * @interface
 * @template TYPE
 */
generics.GenericInterface = function() {};

/**
 * @interface
 * @extends {generics.GenericInterface<TYPE>}
 * @template TYPE
 */
generics.ExtendGenericInterface = function() {};
