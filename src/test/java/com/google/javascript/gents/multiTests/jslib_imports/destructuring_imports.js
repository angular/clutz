goog.module("des");

var {num} = goog.require("module.exp.nodef");
var n = num;

const X = goog.require("module.exp.both");
const {num2} = goog.require("module.exp.both");

X();
n += num2;

const already_converted_to_ts_keep_module = goog.require("google3.src.test.java.com.google.javascript.gents.multiTests.converts_ts_module_require.already_converted_to_ts_keep");
const {foo, bar} = already_converted_to_ts_keep_module;
