/**
 * @fileoverview Rivoting description of the file.
 */
goog.module("A.B.Klass");

/** Possibly outdated information about Klass. */
const Klass = goog.defineClass(null, {

  /** @param {number} n */
  constructor: function(n) {
    this.n = n;

    this.x = 4;
  },

  /** @return {boolean} */
  foo: function() {
    return false;
  }
});

/** @return {string} */
Klass.myStaticFunction = function() {
  return ""
}

exports = Klass;
