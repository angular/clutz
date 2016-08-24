/**
 * @constructor
 * @param {number} a
 * @param {number} b
 */
function A(a, b, c) {
  /** @type {number} */
  this.a = a;
  /** @type {?} */
  this.b = b;
  /** @type {number} */
  this.c = c;
}

/**
 * @constructor
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 */
function B(a, b, c, d) {
  /** @public @type {number} */
  this.a = a;
  /** @package @type {number} */
  this.b = b;
  /** @protected @type {number} */
  this.c = c;
  /** @private @type {number} */
  this.d = d;
}