goog.module('module.Foo');

class A {
  /**
   * @param {string} x
   * @param {...string} rest
   */
  constructor(x, ...rest) {}
}

exports = A;