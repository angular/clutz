goog.module("both.A.B");

/**
 * Note: As written in .js if num is reassigned by a consumer of the goog.module
 * L and C will still return the original value of '4'.
 * During translation to .ts, according to ES6 module semantics, the
 * reassignment will be reflected because the bindings are live.
 *
 * This is an intentional semantic mismatch, because most of the time the
 * bindings are immutable and 'export let L' is syntactically preferable.
 */
var num = 4;
/**
 * @return {number}
 */
var B = function() { return num; };

exports = B;

/** @return {number} */
const C = function() { return num; };

exports.C = C;

/**
 * @return {number}
 */
var L = function() { return num; };

exports.L = L;

exports.num = num;
/** @constructor */
exports.foo = function() { };
/** @type {number} */
exports.foo.z = num * 2;

class ClassThatShouldNotBeExported {}
