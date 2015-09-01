goog.provide('dict');

/**
 * @const
 * @dict
 */
dict.untyped = {};

/**
 * @dict
 * @type {{a: Function}}
 */
dict.typed = {'a': function() {}};

/** @dict @constructor */
dict.DictClass = function() {};
var obj1 = new dict.DictClass();

/** @dict @constructor */
dict.ClassWithDottedProperties = function() {};
dict.ClassWithDottedProperties.prototype.foo = function() {};
