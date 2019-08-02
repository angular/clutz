goog.module('partial.aliased_interface');

/** @interface */
class AliasedInterface {
  constructor() { /** @type {string} */ this.x; }
  /** @return {string} */
  static staticMethod() {}
}

exports = AliasedInterface;
