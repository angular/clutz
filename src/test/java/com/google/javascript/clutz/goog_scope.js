goog.provide("foo.boom");
goog.provide("foo.iboom");
goog.provide("foo.Bar");
goog.provide("foo.IBar");

goog.scope(function() {
  /** @constructor */ var Bar = function() { };
  /** @const */ foo.Bar = Bar;
  /** @interface */ var IBar = function() { }
  /** @const */ foo.IBar = IBar;
});

//!! The cannonical type for foo.Bar in closure is $jscomp.scope.Bar.
/** @type {foo.Bar} */ foo.boom = null;
/** @type {foo.IBar} */ foo.iboom = null;
