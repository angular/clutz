goog.require("lorem.ipsum.Foo");

const Foo = lorem.ipsum.Foo;

/** @type {Foo.InnerTypedef} */
var a = {key: 1, value: "bar"};

/**
 * @param {Foo.InnerTypedef} arg
 * @return {Foo.InnerTypedefWithAssignment}
 */
Foo.func = function(arg) { return {key: 3, value: "bar3"}; };

const b = Foo.func(a);

/**
 * @typedef {{
 *   t: Foo.InnerTypedefWithAssignment
 * }}
 */
var PrivateTypedef_;
