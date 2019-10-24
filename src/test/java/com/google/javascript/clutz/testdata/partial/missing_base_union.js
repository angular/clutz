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
 * @param {!Derived} a
 * @param {Derived} b
 * @param {!Derived=} c
 */
function fn(a, b, c = {}) {}

exports = {
  fn,
  Derived
};
