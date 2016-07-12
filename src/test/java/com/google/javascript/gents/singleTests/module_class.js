goog.module("A.B.C");

/**
 * @constructor
 * @param {number} n
 */
function klass(n) {
  /** @type {number} */
  this.n = n;
}

/**
 * @type {number}
 */
klass.x = 4;

/**
 * @return {boolean}
 */
klass.prototype.foo = function() {
  return false;
};

exports = klass;
