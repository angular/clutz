goog.provide("sideeffect.A");
goog.provide("value.B");
goog.provide("obj.C");
goog.provide("both.D");
goog.provide("nested.E");
goog.provide("nested.E.F");

value.B = function () {};

/** @const */
obj.C = {};
obj.C.x = 4;
obj.C.y = 8;

both.D = function() {};
both.D.foo = function() {};

nested.E = function() {};
nested.E.bar = function() {};
/** @constructor */
nested.E.F = function () {};
nested.E.F.baz = function() {};
