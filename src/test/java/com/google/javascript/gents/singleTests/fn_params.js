goog.module('gents.fn_params');

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

/**
 * @param {{
 *   name: (string|undefined),
 *   age: (string|undefined)
 * }} person1
 * @param {{
 *   name: (string|undefined), age: (string|undefined)
 * }} person2
 */
const paramHasOptProps = function(person1, {name, age}) {};

exports = {optParams, restParams, restParamsTyped, complex};
