/**
 * Anonymous class
 * @param {number} a
 * @constructor
 */
var A = function(a) {
  this.a = a;
};

/**
 * Named class
 * @constructor
 */
function B(a, b) {
  this.a = a;
  this.b = b;
}

/**
 * Named class extension
 * @constructor
 * @extends {A}
 */
function C(a, b) {
  C.base(this, 'constructor', a);
  this.b = b;
}
goog.inherits(C, A);

/**
 * Anonymous class extension
 * @constructor
 * @extends {B}
 */
var D = function(a, b, c) {
  B.call(this, a, b);
  this.c = c;
};
goog.inherits(D, B);

/**
 * goog.defineClass based classes
 */
var E = goog.defineClass(C, {
  constructor: function(a, b) {
    C.call(this, a, b);
  }
});

var nested = {};
/** @constructor */
nested.klass = function() {};


const F = goog.defineClass(null, {
  // inline comment

  /**
   * block comment
   */
  constructor: function() {
  },

  /** Do foo! */
  foo: function() {

  },

  /**
   * Returns phone number.
   * @return {string}
   */
  bar: function() {
    return '';
  }
});

const G = goog.defineClass(null, {
  /**
   * ES6 method short hand.
   */
  method() {
  },
});

class ClassWithNoConstructorJsDocAndProperties {
  constructor(foo) {
    /** @private {string} */
    this.foo = foo;
  }
}
