goog.provide('types');

/** @type {number} */
types.a = 12;

/** @type {boolean} */
types.b = false;

/** @type {string} */
types.c = 's';

/** @type {Object} */
types.d = {};

/** @type {Array<?>} */
types.e = [];

/**
 * @constructor
 * @template T
 */
types.Foo = function() { };

/** @return {T} */
types.Foo.prototype.get = function() { return null; };

/** @param {T} t */
types.Foo.prototype.set = function(t) { };

/**
 * @param {T} t
 * @param {V} v
 * @template V
 * @template W
 */
types.Foo.prototype.genericMethod = function(t, v) { return v(t); };

/** @type {types.Foo<string>} */
types.f = new Foo();

/** @type {null|function(number, ?):?} handler */
types.functionAndUnion = null;

/** @type {{a: string, b}} */
types.recordType = {a: 'a', b: 34};

/**
 * @param {T} a
 * @return {T}
 * @template T
 */
types.genericFunction = function(a) { return a; };

/** @type {Object<number, string>} */
types.j = {a: 'a'};

/**
 * @param {Object<K,V>} obj
 * @template K,V
 */
types.objectWithGenericKeyType = function(obj) { };
