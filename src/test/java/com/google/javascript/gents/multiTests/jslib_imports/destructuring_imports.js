goog.module("des");

var {num} = goog.require("module.exp.nodef");
var n = num;

const X = goog.require("module.exp.both");
const {num2} = goog.require("module.exp.both");

X();
n += num2;
