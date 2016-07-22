goog.module("both.A.B");

var num = 4;
/** @return {number} */
exports = function() { return num; };
/** @constructor */
exports.foo = function() { };
/** @type {number} */
exports.foo.z = num * 2;
