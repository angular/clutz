goog.module('some.module');

// Verify that both destructuring and non-destructuring requireType'd symbols
// are detected as aliases
const AType = goog.requireType('some.other.module.aType');
const {BType} = goog.requireType('some.other.module.bType');

/**
 * @param {!AType} a
 */
exports.f = function(a) {};

/**
 * @param {!BType} b
 */
exports.g = function(b) {};
