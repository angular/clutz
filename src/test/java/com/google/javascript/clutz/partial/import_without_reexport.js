//!! Tests that the alias map doesn't force aliases for things that aren't
//!! actually aliases
//!! TODO(lucassloan): actually parse the `exports = foo` or `exports.foo = foo`
//!! statements, to actually solve this problem
goog.module('import.without.reexport');

const {Class} = goog.require('original.module');

/** @const {type.not.present} */
const x = null;

exports = x;
