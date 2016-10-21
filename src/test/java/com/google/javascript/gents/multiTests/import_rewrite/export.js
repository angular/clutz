goog.provide("sideeffect.A");
goog.provide("value.B");
goog.provide("obj.C");
goog.provide("both.D");
goog.provide("nested.E");
goog.provide("nested.E.F");
goog.provide("nested.E.F.Z");

value.B = function() {};

obj.C = {
 x: 4,
 y: 8,
}

/** @constructor */
both.D = function() {};
both.D.foo = function() {};

/** @constructor */
nested.E = function() {};
nested.E.prototype.bar = function() {};

/** @constructor */
var G = function () {};
G.baz = function() {};

nested.E.F = {
  G: G,
};

/** @constructor */
nested.E.F.Z = function() {};
nested.E.F.Z.fun = function() {};
