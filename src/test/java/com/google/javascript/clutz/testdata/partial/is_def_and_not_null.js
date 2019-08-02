goog.provide('is.def.and.not.null');

goog.require('some.C');

/**
 * @param {?some.C} c
 */
is.def.and.not.null = function (c) {
  //!! isDefAndNotNull seems to affect the inferencer to start reporting
  //!! some.C as the ? type in compiler.getTopScope().getAllSymbols().
  //!! I am not sure why that happens, or how to fix it, so for now this
  //!! test is solely tracking this odd behavior.
  if (!goog.isDefAndNotNull(some.C)) {
    return c;
  }
};