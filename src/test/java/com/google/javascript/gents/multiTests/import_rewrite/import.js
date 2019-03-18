goog.require("sideeffect.A");
goog.require("value.B");
goog.require("obj.C");
var D = goog.require("both.D");
goog.require("nested.E");
goog.require("nested.E.F");
var stuff = goog.require("nested.E.F.Z");
/** @suppress {extraRequire} My comment */
goog.require("unused.W");
/** @suppress {extraRequire}  */
goog.require("unused.V");

value.B();
var num = obj.C.x + obj.C.y;
D();
D.foo();
nested.E();
nested.E.bar();
nested.E.F();
var o = new nested.E.F.G();
nested.E.F.G.baz();
stuff();
stuff.fun();
