goog.module("both.A.B");

var num = 4;
/** @return {number} */
var B = function() { return num; };

exports = B;
exports.num = num;
/** @constructor */
exports.foo = function() { };
/** @type {number} */
exports.foo.z = num * 2;
