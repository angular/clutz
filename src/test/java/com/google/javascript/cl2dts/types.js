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

/** @type {types.Foo<string>} */
types.f = new Foo();
