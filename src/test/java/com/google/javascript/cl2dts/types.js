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

/** @type {Array} */
types.arrayMissingTypeParam = [];

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

//!! marked @const to appear in `compiler.getTopScope().getAllSymbols()`
/**
 * @const
 */
types.inferredobj = {};

//!! marked @const to appear in `compiler.getTopScope().getAllSymbols()`
/**
 * @const
 */
types.inferrednum = 1;
