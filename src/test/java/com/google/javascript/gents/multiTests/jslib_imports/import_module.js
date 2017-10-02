goog.module("mod");
var X = goog.require("module.exp.both");
var Y = goog.require("module.exp.def");
var Z = goog.require("module.exp.nodef");

X();
var n = X.num2;
Y();
n += Z.num;
