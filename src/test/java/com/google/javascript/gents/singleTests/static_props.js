goog.module('staticprops.on.classes');

class SomeClass {}
  // TODO(ahafiz): elide the any here, leaving inference of the type to TS. If
  // we have an RHS, tsc will likely find a better type than `any`.
SomeClass.staticPropNoJsDoc = 0;

/** @const {number} */
SomeClass.staticPropWithJsDoc = 0;

/** @const {number} */
SomeClass.staticPropWithJsDocAndNonTrivialInit = 1 + 1;

/** @const */
SomeClass.staticPropWithConstAndNoType = 0;

exports = {SomeClass};
