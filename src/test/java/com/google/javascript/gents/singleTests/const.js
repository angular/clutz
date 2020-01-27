goog.module('gents.const');

/** @const */
var a = 1;

/** @const {number} */
var b = 2;

/** @const */
let c = 3;

/** @const */
var foo = function() {};

class A {
  constructor() {
    this.x = function() {
      console.log('before');
      /** @type {!Object} */
      this.y;
      console.log('after');
    }
  }
}

/**
 * @param {number} n
 * @return {number}
 * @const
 */
let bar = function(n) {
  return n;
};

exports = {a, b, c, foo, bar};
