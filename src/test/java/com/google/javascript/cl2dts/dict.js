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
dict.DictClass = function(n) {};
dict.DictClass.prototype.foo = function() {};

var obj1 = new dict.DictClass(123);

/** @dict @constructor */
dict.ClassWithDottedProperties = function() {};
/** @type number */
dict.ClassWithDottedProperties.prototype.foo = 123;
