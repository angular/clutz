goog.module('skip_with_typedefs');

// This type is never emitted, but it could be picked up as an alias to use instead of
// emitting expanded type aliases (see collectTypedefs).

/** @typedef {function(string): number} */
exports.ClosureTypedef;
