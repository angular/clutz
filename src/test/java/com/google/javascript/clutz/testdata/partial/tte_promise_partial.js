goog.module('tte.Promise.Partial');

/**
 * @constructor
 * @extends {Base<VALUE>}
 * @template VALUE
 */
function PartialDeferred() {}

// See horribleAsyncHack in DeclarationGenerator.
/** @override */
PartialDeferred.prototype.then = function() {}

exports.PartialDeferred = PartialDeferred;
