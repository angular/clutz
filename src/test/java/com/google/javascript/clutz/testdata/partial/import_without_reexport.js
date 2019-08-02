//!! Tests that the alias map doesn't force aliases for things that aren't
//!! actually aliases
goog.module('import.without.reexport');

const {Class} = goog.require('original.module');

/** @const {type.not.present} */
const x = null;

const y = unknown.function(Class);

exports.x = x;
exports.y = y;
