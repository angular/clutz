goog.provide("foo.boom");
goog.provide("foo.Bar");

goog.scope(function() {
  /** @constructor */ var Bar = function() { };
  /** @const */ foo.Bar = Bar;
});

//!! The cannonical type for foo.Bar in closure is $jscomp.scope.
/** @type {foo.Bar} */ foo.boom = null;