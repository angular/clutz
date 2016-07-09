goog.module("A.B");

/**
 * @return {number}
 */
var foo = function() { return 4; };

/**
 * @return {boolean}
 */
var bar = function() { return true; };

exports = foo;
/** @type {number} */
exports.x = 4;
exports.baz = bar;
exports.baz.z = 8;
