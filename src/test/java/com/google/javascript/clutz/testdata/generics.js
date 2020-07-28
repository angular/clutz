goog.provide('generics');

/**
 * @constructor
 * @param {number} a
 * @template T
 * @template U
 */
generics.Foo = function(a) {};

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

/** @type {!generics.Foo<string>} */
generics.fooMissingOneTypeParam = new generics.Foo(0);

/** @type {!generics.Foo} */
generics.fooMissingAllTypeParams = new generics.Foo(0);

/** @type {!Array} */
generics.arrayMissingTypeParam = [];

/**
 * @param {!Object<K,V>} obj
 * @template K,V
 */
generics.objectWithGenericKeyType = function(obj) { };

/**
 * @param {T} a
 * @return {T}
 * @template T
 */
generics.genericFunction = function(a) { return a; };

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


/**
 * @constructor
 * @template TYPE
 * @implements {generics.GenericInterface<TYPE>}
 */
generics.ImplementsGenericInterface = function() {};

/**
 * @constructor
 * @template TYPE
 * @extends {generics.Foo<TYPE, number>}
 */
generics.ExtendsGenericClass = function() {};

/**
 * Check that generic types that don't use the type argument, e.g. an EventType,
 * don't structurally match.  The private field emitted by Clutz to enforce
 * nominal typing on Closure classes must use the generic type to ensure this.
 *
 * @constructor
 * @param {string} name
 * @template T
 */
generics.DoesNotUseType = function(name) {
  this.name = name;
}
