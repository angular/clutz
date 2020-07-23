goog.module('inner.enum');

class MyClass {}

/**
 * Current emit loses the enum-ness of E.
 * @enum
 */
MyClass.E = {
  A: 0,
  B: 1
};

exports = MyClass;
