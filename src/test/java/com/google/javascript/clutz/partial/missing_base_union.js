goog.module('missing.base.union');

const {Base} = goog.require('some.base');

/**
 * @record
 */
class Derived extends Base {
  constructor() {
    super();
    /**
     * @type {string|undefined}
     */
    this.someField;
  }
}

/**
 * This is currently broken and we are waiting on a fix in Closure, since it
 * cannot be simply fixed in Clutz.
 *
 * Right now, only a is emitted correctly, because it is not an union with
 * null or undefined, the rest are collapsed into null or undefined, without a
 * mention of Derived.
 *
 * @param {!Derived} a
 * @param {Derived} b
 * @param {!Derived=} c
 */
function fn(a, b, c = {}) {}

exports = {
  fn,
  Derived
};