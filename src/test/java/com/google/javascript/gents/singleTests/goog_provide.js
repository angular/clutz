goog.provide("A.B");
goog.provide("A.B.C");

/**
 * @constructor
 * @param {number} n
 */
A.B = function(n) {
  /** @type {number} */
  this.n = n;
};

// Aggressively export rather than create static methods/fields
/** @return {number} */
A.B.foo = function() { return 4; };
/** @type {number} */
A.B.num = 8;

/** @constructor */
A.B.C = function() {};

/** @return {boolean} */
A.B.C.bar = function() { return false; };
