goog.module('alias_for_interface');

var AliasedInterface = goog.require('partial.aliased_interface');
// Make sure that alias_for_interface creates both a type and a var alias.
exports = AliasedInterface;
