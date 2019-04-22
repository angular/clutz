goog.module('foo.AbstractClass');

/**
 * @abstract
 */
class AbstractClass {
  /**
   * @return {string}
   * @protected
   * @abstract
   */
  myAbstractMethod() {}
}

exports = AbstractClass;