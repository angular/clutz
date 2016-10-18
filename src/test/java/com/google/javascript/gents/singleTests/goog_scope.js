goog.provide("lorem.ipsum.Foo");
goog.provide("lorem.ipsum.Foo.qux");
goog.provide("lorem.ipsum.Foo.Bar");
goog.provide("lorem.ipsum.baz");

goog.scope(function() {

/**
 * @constructor
 * @param {number} n
 */
lorem.ipsum.Foo = function(n) {
  /** @type {number} */
  this.n = n;
};

const Foo = lorem.ipsum.Foo;


/** @return {string} */
Foo.foo = function() { 
	return 'this is a static method on Foo, since it is NOT goog.provided'; 
};

/** @return {string} */
Foo.qux = function() { 
  return 'this is directly exported since it is goog.provided';
};

/** @type {number} */
Foo.num = 8;


/** @constructor */
Foo.Bar = function() {};

/** @return {boolean} */
Foo.Bar.bar = function() { return false; };


/** @return {boolean} */
lorem.ipsum.baz = function() { return false; };

});  // goog.scope

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
