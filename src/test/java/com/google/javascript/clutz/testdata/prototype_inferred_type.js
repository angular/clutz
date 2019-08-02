goog.provide('foo.Klass');

/** @constructor */
foo.Klass = function() {};

/** Crazy pattern, I have only seen it used by jquery.fn = jquery.prototype */
foo.Klass.foo = foo.Klass.prototype;