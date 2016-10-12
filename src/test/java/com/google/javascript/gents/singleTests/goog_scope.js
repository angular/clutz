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


// TODO: Aggressively export rather than create static methods/fields
/** @return {number} */
Foo.foo = function() { return 4; };

//TODO: Aggressively export rather than create static methods/fields
/** @return {number} */
Foo.qux = function() { return 4; };

/** @type {number} */
Foo.num = 8;


/** @constructor */
Foo.Bar = function() {};

/** @return {boolean} */
Foo.Bar.bar = function() { return false; };


/** @return {boolean} */
lorem.ipsum.baz = function() { return false; };

});  // goog.scope
