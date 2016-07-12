goog.module("namespace.A.B");

/**
 * @return {boolean}
 */
var bar = function() { return true; };

/** @type {number} */
exports.x = 4;

/**
 * @return {number}
 */
exports.foo = function() { return 4; };
exports.baz = bar;
exports.baz.z = 8;
