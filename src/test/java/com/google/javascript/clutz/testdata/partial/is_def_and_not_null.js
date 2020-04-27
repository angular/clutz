goog.provide('is.def.and.not.null');

goog.require('some.C');

/**
 * @param {?some.C} c
 */
is.def.and.not.null = function (c) {
  //!! isDefAndNotNull causes the inferencer to start reporting
  //!! some.C as the ? type in compiler.getTopScope().getAllSymbols().
  //!! This is because the when the inferencer narrows a qualified name's type
  //!! inside a flow scope, it creates a symbol for that name even if it never
  //!! saw an explicit declaration for that name.
  //!! This test tracks that Clutz skips emitting a namespace "some.C".
  if (!goog.isDefAndNotNull(some.C)) {
    return c;
  }
};
