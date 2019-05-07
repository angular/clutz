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

  /**
   * @return {string}
   * @static
   * @abstract
   */
  myStaticAbstractMethod() {}
}

exports = AbstractClass;