goog.provide('typedefs');

/**
 * @typedef {Array|string}
 */
typedefs.ArrayLike;

/**
 * @typedef {function(string): string}
 */
typedefs.strToStr;

/**
 * @typedef {string|function(): string}
 */
typedefs.strOrFunc;

/**
 * @constructor
 */
typedefs.Aclass = function() {};

/** @typedef {!typedefs.Aclass} */
typedefs.aclassalias;

// The type should be kept as rec.Aclass and not replaced with the aclassalias.
/** @const {!typedefs.Aclass} */
typedefs.a = new typedefs.Aclass();

/** @typedef {!Array<!typedefs.Aclass>} */
typedefs.arrayA;

// code below should use arrayA over otherArrayA, earlier typedefs should win to avoid
// using very library specific typedefs.

/** @typedef {!Array<!typedefs.Aclass>} */
typedefs.otherArrayA;

/** @const {!typedefs.arrayA} */
typedefs.arrT = [];

/** @const {!Array<!typedefs.Aclass>} */
typedefs.arr = [];

/** @const {typedefs.strToStr} */
typedefs.fn = function(x) {return x;};