goog.module('gents.compound_types');

// Non-nullable types
// We ignore the non-nullability as we transpile to TS with --strictNullChecks
/** @type {!number} */
var n = 5;

/**
 * @param {!string} s
 * @returns {!boolean}
 */
var foo = function(s) {
  return true;
};

// Nullable types
/** @type {?number} */
var niln = null;

/**
 * @param {?string} s
 * @returns {?boolean}
 */
var bar = function(s) {
  return null;
};

// Union types
/** @type {string | number} */
var sn = 9;

/** @type {string | ?number | boolean} */
var snb = false;

/** @type {?(?string | ?number | string)} */
var manyNulls = null;

/** @type {?string | null | ?number} */
var manyNulls2 = null;

/**
 * @param {number | ?string} s
 * @return {null | boolean}
 */
var baz = function(s) {
  return null;
};

exports = {bar, foo, baz};
