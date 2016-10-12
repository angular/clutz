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
  return "this should create a static method on Foo, since it is NOT goog.provided"; 
};

//TODO: Aggressively export rather than create static methods/fields
/** @return {string} */
Foo.qux = function() { 
  return "this should be directly exported, rather than create a static method, " +
      "since it is goog.provided"; 
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
