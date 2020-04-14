goog.module('staticprops.on.classes');

class SomeClass {}
// This is broken, we should at least declare the field like
SomeClass.staticPropNoJsDoc = 0;

/** @const {number} */
SomeClass.staticPropWithJsDoc = 0;

// Not sure why simple initiliazers get inlined, but more
// complicated ones are left behind.
/** @const {number} */
SomeClass.staticPropWithJsDocAndNonTrivialInit = 1 + 1;

// Using @const inference does not help.
/** @const */
SomeClass.inferred = 0;

exports = {SomeClass};
