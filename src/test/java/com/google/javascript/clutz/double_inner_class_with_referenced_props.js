goog.module('ns.DoubleInnerClassWithRef');

class A {}

/**
 * @interface
 */
A.Inner = function() {};

/**
 * @enum {string}
 */
A.Inner.Enum1 = {
  FOO: 'foo'
};

/**
 * @enum {string}
 */
A.Inner.Enum2 = {
  BAR: 'bar'
};

/**
 * @param {A.Inner.Enum1} e1
 * @param {A.Inner.Enum2} e2
 */
A.Inner.prototype.baz = function(e1, e2) {};

exports = A;