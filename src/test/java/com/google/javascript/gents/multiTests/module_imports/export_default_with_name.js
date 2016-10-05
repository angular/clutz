goog.module("default.ANamed");

/**
 * @constructor
 * @param {number} n
 */
exports = function Foo(n) {
  /** @type {number} */
  this.n = n;
};

let foo = new Foo(0);
