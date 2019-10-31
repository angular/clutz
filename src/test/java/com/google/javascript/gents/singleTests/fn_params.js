// Optional Parameters
/**
 * @param {number} n
 * @param {string=} s
 * @param {boolean=} b
 *
 */
var optParams = function(n, s, b) {};

// Variadic parameters
/**
 * @param {number} n
 * @param {...} r
 */
var restParams = function(n, r) {};

/**
 * @param {number} n
 * @param {...boolean} br
 */
var restParamsTyped = function(n, br) {};

/**
 * @param {number} n
 * @param {boolean=} o
 * @param {...} r
 * @returns {number}
 */
var complex = function(n, o, r) {
  return n;
};
