goog.module("mod.A");
/** @constructor */
function foo() {}

exports = foo;
exports.typA = foo;
exports.valA = new foo();
