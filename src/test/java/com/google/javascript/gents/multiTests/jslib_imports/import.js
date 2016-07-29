goog.module("mod");
goog.require("notlib.A");
goog.require("lib.B");
var X = goog.require("lib.C");

notlib.A();
notlib.A.foo();

lib.B();
var n = lib.B.num + lib.B.num;

X();
n += X.num;
