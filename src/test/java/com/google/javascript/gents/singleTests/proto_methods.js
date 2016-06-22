/**
 * @type {*}
 */
var goog = {};

/**
 * Nested anonymous class in ES6 syntax
 */
goog.A = class {
  /**
   * @param {number} a
   */
  constructor(a) {
    this.a = a;
  }
};

/**
 * Named class extension
 * @param {number} a
 * @param {boolean} b
 * @constructor
 * @extends {goog.A}
 */
function B(a, b) {
  A.call(this, a);
  this.b = b;
}

/**
 * Untyped method
 */
goog.A.prototype.foo = function(n) { return n; };

/**
 * Typed method
 * @param {number} n
 * @return {boolean}
 */
B.prototype.bar = function(n) { return n > 0; };

/**
 * Unconverted method
 * @param {number} n
 * @return {void}
 */
C.prototype.baz = function(n) {};
