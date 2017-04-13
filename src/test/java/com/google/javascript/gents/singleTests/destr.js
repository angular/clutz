class C {
  /**
   * @param {{a: number}} destrParam
   * @param {{b: number}} destrParamWithDefault
   * @param {number} c with default
   * @param {number} d
   */
  constructor({a}, {b} = {}, c = 0, d) {
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