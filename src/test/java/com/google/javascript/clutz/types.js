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

/** @type {null|function(number, ?):?} handler */
types.functionAndUnion = null;

/** @type {{a: string, b}} */
types.recordType = {a: 'a', b: 34};

/** @type {Object<number, string>} */
types.j = {a: 'a'};

/**
 * marked const to appear in `compiler.getTopScope().getAllSymbols()`
 * @const
 */
types.inferredobj = {};

/**
 * marked const to appear in `compiler.getTopScope().getAllSymbols()`
 * @const
 */
types.inferrednum = 1;
