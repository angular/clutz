/**
 * @type {*}
 */
var goog = {};

/**
 * @constructor
 * @param {number} a
 */
goog.A = function(a) {
  this.a = a;
};

/**
 * Untyped method
 */
goog.A.foo = function(n) { return n; };

/**
 * Typed method
 * @param {number} n
 * @return {boolean}
 */
goog.A.bar = function(n) { return n > 0; };

goog.A.B = {};

/**
 * Unconverted method
 * @param {number} n
 * @return {void}
 */
goog.A.B.baz = function(n) {};
