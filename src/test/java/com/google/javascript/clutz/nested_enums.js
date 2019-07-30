goog.module('iterated.nestedenums');

/**
 * @struct
 */
class A {}

/**
 * Some enum
 * @enum{number}
 */
A.SomeEnum = {
  FIRST: 1,
  SECOND: 2,
}

/**
 * @struct
 */
A.B = class {};

/**
 * Another enum
 * @enum{string}
 */
A.B.AnotherEnum = {
  FIRST: 'first',
  SECOND: 'second',
}


exports = A;
