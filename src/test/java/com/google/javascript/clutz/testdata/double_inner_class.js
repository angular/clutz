goog.module('iterated.innerclass');

/**
 * @struct
 */
class A {}

/**
 * @struct
 */
A.B = class {};

/**
 * @struct
 */
A.B.C = class {};

/**
 * @struct
 */
A.B.C.D = class {
};


exports = A;