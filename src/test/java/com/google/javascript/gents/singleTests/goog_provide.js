/**
 * @fileoverview Rivoting description of the file.
 */
goog.provide('A.B');
goog.provide('A.B.qux');
goog.provide('A.B.C');
goog.provide('A.B.D')

// This is used to test muli-level calls.
var path = {to: {someUtilFunction: function() {}}};

/**
 * @constructor
 * @param {number} n
 */
A.B = function(n) {
  /** @type {number} */
  this.n = n;
};

/** @return {number} */
A.B.foo = function() {
  return 4;
};
/** @return {number} */
A.B.qux = function() {
  return 4;
};
/** @type {number} */
A.B.num = 8;

/** @constructor */
A.B.C = function() {};

/** @return {boolean} */
A.B.C.bar = function() {
  return false;
};

A.B.D = path.to.someUtilFunction();
