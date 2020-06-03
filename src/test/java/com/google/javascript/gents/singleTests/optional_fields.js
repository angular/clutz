goog.module('opt.fields');

/**
 * @interface
 */
class InterfaceClass {
  constructor() {
    /**
     * @type {boolean|undefined}
     */
    this.a;
  }
}

/**
 * @record
 */
class RecordClass {
  constructor() {
    /** @type {number|string|undefined} */
    this.foo;
  }
}

class Klass {
  /**
   * TODO(ahafiz): bar = undefined should become bar?: string
   * @param {string=} foo
   * @param {string=} bar
   */
  constructor(foo, bar = undefined) {
    /** @private {string|undefined} */
    this.foo = foo;

    /** @private {string|undefined} */
    this.bar = bar;
  }
}

exports = {InterfaceClass, RecordClass, Klass};
