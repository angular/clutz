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
goog.A.foo = function(n) {
  return n;
};

/**
 * Typed method
 * @param {number} n
 * @return {boolean}
 */
goog.A.bar = function(n) {
  return n > 0;
};

goog.A.B = {};

/**
 * Unconverted method
 * @param {number} n
 * @return {void}
 */
goog.A.B.baz = function(n) {};

/**
 * goog.defineClass based classes
 */
goog.B = goog.defineClass(goog.A, {
  constructor: function(a) {
    goog.A.call(this, a);
  },
  statics: {
    /**
     * @returns {boolean}
     */
    foo: function() {
      return false;
    },
    /**
     * @returns {boolean}
     */
    bar: function() {
      return true;
    },
    /**
     * @type {number}
     */
    num: 4,
  }
});

/**
 * @constructor
 */
function A() {
  goog.A.foo(4);
}

A.anon = function() {
  // Anonymous function call
  (function() {})();
}
