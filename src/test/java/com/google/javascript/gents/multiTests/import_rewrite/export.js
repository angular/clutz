/**
 * @fileoverview test comment about this file to ensure comments are 
 * appropriately placed
 */

goog.provide("sideeffect.A");
goog.provide("value.B");
goog.provide("obj.C");
goog.provide("both.D");
goog.provide("nested.E");
goog.provide("nested.E.F");
goog.provide("nested.E.F.Z");
goog.provide("unused.W");
goog.provide("unused.V");

/** test comment about value to ensure that comments are appropriately placed */ 
value.B = function() {};

/** test comment about value to ensure that comments are appropriately placed */ 
obj.C.x = 4;
obj.C.y = 8;

both.D = function() {};
both.D.foo = function() {};

nested.E = function() {};
nested.E.bar = function() {};
nested.E.F = function() {};

/** @constructor */
nested.E.F.G = function () {};
nested.E.F.G.baz = function() {};

nested.E.F.Z = function() {};
nested.E.F.Z.fun = function() {};

unused.W = function() {};
unused.V = function() {};
