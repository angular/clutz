goog.module('staticprops.on.classes');

class SomeClass {}
SomeClass.staticPropNoJsDoc = 0;

/** @const {number} */
SomeClass.staticPropWithJsDoc = 0;

/** @const {number} */
SomeClass.staticPropWithJsDocAndNonTrivialInit = 1 + 1;

/** @const */
SomeClass.staticPropWithConstAndNoType = 0;

exports = {SomeClass};
