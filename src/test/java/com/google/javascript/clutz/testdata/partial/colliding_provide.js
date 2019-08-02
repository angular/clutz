// This first module name is special-cased in the test framework to trigger the aliasing
// behavior.  Imagine there's some other file that has a goog.provide of
// colliding_provide.aliased.submodule.
goog.provide('colliding_provide.aliased');
// This module name is not special-cased, for comparison in the output.
goog.provide('colliding_provide.not_aliased');

colliding_provide.aliased = 1;
colliding_provide.not_aliased = 1;
