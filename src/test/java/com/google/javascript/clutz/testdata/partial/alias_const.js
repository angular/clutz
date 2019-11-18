goog.module('alias_const');

const OtherType = goog.require('not_visible.OtherType');

// This is currently broken: the exported type below should produce a type
// reference/an alias to not_visible.OtherType, but in practice it ends up
// being just "any".
/** @const */
const MyType = OtherType;

exports = MyType;
