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
  goog.A.call(this, a);
  this.b = b;
}
goog.inherits(B, goog.A);

/**
 * Untyped method
 */
goog.A.prototype.foo = function(n) {
  return n;
};

/**
 * Typed method
 * @param {number} n
 * @return {boolean}
 */
B.prototype.bar = function(n) {
  return goog.A.prototype.foo.call(this, n) > 0;
};

/**
 * Another typed method
 * @param {number} n
 * @return {boolean}
 */
B.prototype.baz = function(n) {
  return B.base(this, 'foo', n) > 0;
};

/**
 * Unconverted method
 * @param {number} n
 * @return {void}
 */
C.prototype.baz = function(n) {};

/**
 * goog.defineClass based classes
 */
goog.B = goog.defineClass(goog.A, {
  constructor: function(a) {
    goog.A.call(this, a);
  },
  /**
   * @returns {number}
   */
  foo: function() {
    return 0;
  }
});
