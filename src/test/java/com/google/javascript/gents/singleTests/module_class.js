goog.module('A.B.Klass');

/**
 * @constructor
 * @param {number} n
 */
function Klass(n) {
  /** @type {number} */
  this.n = n;
}

/**
 * @type {number}
 */
Klass.x = 4;

/**
 * @return {boolean}
 */
Klass.prototype.foo = function() {
  return false;
};

exports = Klass;
