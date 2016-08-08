goog.module("mod.C");
/** @constructor */
function foo() {}

exports = foo;
exports.typC = foo;
exports.valC = new foo();
