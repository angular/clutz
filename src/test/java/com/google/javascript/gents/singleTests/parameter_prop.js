/** @typedef {string} */
var Foo;

/**
 * @constructor
 * @param {number} a
 * @param {number} b
 * @param {Foo} parameterPropWithInferredType
 */
function A(a, b, c, parameterPropWithInferredType) {
  /** @type {number} */
  this.a = a;
  /** @type {?} */
  this.b = b;
  /** @type {number} */
  this.c = c;
  /** @private @const */
  this.parameterPropWithInferredType = parameterPropWithInferredType;
}

/**
 * @constructor
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @param {number} e
 */
function B(a, b, c, d, e) {
  /** @public @type {number} */
  this.a = a;
  /** @package @type {number} */
  this.b = b;
  /** @protected @type {number} */
  this.c = c;
  /** @private @type {number} */
  this.d = d;
  /** @const {number} */
  this.e = e;
}