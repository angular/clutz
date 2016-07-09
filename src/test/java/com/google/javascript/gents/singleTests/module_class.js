goog.module("A.B.C");

/**
 * @constructor
 * @param {number} n
 */
exports = function(n) {
  this.n = n;
};

/**
 * @type {number}
 */
exports.x = 4;

/**
 * @return {boolean}
 */
exports.foo = function() {
  return false;
};
