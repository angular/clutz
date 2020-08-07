goog.module('gents.destr');

class C {
  /**
   * @param {{a: number}} destrParam
   * @param {{b: number}} destrParamWithDefault
   * @param {number} c with default
   * @param {number} d
   */
  constructor({a}, {b} = {b: 1}, c = 0, d) {
    /** @private {number} */
    this.a = a;

    /** @private {number} */
    this.b = b;

    /** @private {number} */
    this.c = c;

    /** @private {number} */
    this.d = d;
  }
}

let {x = 0} = {};

/**
 * @param {!Array<string>} abcd
 * @param {!Array<string>} prefixSuffix
 * @return {string}
 */
function concat4([a, b, c, d], [prefix, suffix] = ['', '']) {
  return prefix + a + b + c + d + suffix;
}

let [y = 0] = [];

exports = {C};
