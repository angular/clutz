goog.module('exports.complex.obj');

/** a constant num */
const a = 1;
/**
  * a function that does something
  * @param {number} a
  * @param {string} b
  */
function s(a, b) {}

exports = {
  a,
  s,

  /** a complicated constant */
  x: 5 + 5 / 10 * 4,

  /**
   * A complicated string
   * @type {string}
   */
  'abc_def': isFinite(Infinity) ? 'finite' : 'infinite',


  /**
   * Function that does something
   * @param {number|undefined} a
   */
  fn: function(a) {},


  /**
   * This function sums two numbers.
   * @param {number} a first number to sum
   * @param {number} b second number to sum
   * @return {number} summed numbers
   */
  sum(a, b) {
    return a + b;
  },

  /** NB: This is translated incorrectly, as `this.a` no longer exists. */
  bad() {
    // @ts-ignore `this.a` is implicitly `any`
    return this.a;
  }
};
