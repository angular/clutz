goog.provide('some.SomeEnum');
goog.provide('some.ObjectValuedEnum');

/** @enum {number} */
some.SomeEnum = {
  A: 1,
  B: 2
};

/** @constructor */
function X() {}

/** @enum {X} */
some.ObjectValuedEnum = {
  A: new X(),
  B: new X()
};
