goog.module('skip_with_typedefs.uses_type');

// If the typedef from skipped_typedef was picked up, parseInt below would be emitted as
// that typedef. That's weird (e.g. base libraries using typedefs from other code), but
// generally harmless. Except that when that type is not being emitted, Clutz now
// generates a .d.ts file that references non-existent types.
// So parseInt below must be emitted as the actual type its bound to, not as
// ClosureTypedef.

/**
 * @param {function(string): number} parseInt
 * @return {number}
 */
exports.parseIntAlias = function(parseInt) { return parseInt('1'); };

