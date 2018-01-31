goog.module("missing.platform.externs");

//!! Don't need to provide any type for Node, since it's in lib.d.ts
//!! Note: current emit is wrong, will be fixed in next change.
/** @return {Node} */
function foo() { return null }

exports.foo = foo;
