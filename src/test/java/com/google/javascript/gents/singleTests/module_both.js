goog.module("both.A.B");

var num = 4;
/**
 * Note: `var` and `let` may be unsafe to export directly. 
 * @return {number} 
 */
var B = function() { return num; };

exports = B;

/** @return {number} */
const C = function() { return num; };

exports.C = C;

/**
 * Note: `let` may be unsafe to export directly.
 * @return {number}
 */
var L = function() { return num; };

exports.L = L;

exports.num = num;
/** @constructor */
exports.foo = function() { };
/** @type {number} */
exports.foo.z = num * 2;
