goog.provide("A.B");
goog.provide("A.B.qux");
goog.provide("A.B.C");
goog.provide("A.B.D")

goog.provide("path.to.someUtilFunction");

goog.require("RequiredType");

/**
 * @constructor
 * @param {number} n
 */
A.B = function(n) {
  /** @type {number} */
  this.n = n;
};

/** @return {number} */
A.B.foo = function() { return 4; };
/** @return {number} */
A.B.qux = function() { return 4; };
/** @type {number} */
A.B.num = 8;

/** @constructor */
A.B.C = function() {};

/** @return {boolean} */
A.B.C.bar = function() { return false; };

A.B.D = path.to.someUtilFunction();
A.B.D.setA(1).setB(2);
