goog.provide("lorem.ipsum.Foo");
goog.provide("lorem.ipsum.Foo.qux");
goog.provide("lorem.ipsum.Foo.Bar");
goog.provide("lorem.ipsum.baz");
goog.provide("lorem.ipsum.exportedValue");

goog.require("path.to.someUtilFunction");

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
Foo.Bar.prototype.instanceFunction = function() { return false; };

/**
 * @param {number} a 
 * @return {lorem.ipsum.Foo.Bar} 
 */
Foo.Bar.prototype.setA = function(a) { return this; };

/**
 * @param {number} b 
 * @return {lorem.ipsum.Foo.Bar} 
 */
Foo.Bar.prototype.setB = function(b) { return this; };


/** @return {boolean} */
Foo.Bar.staticBar = function() { return false; };

lorem.ipsum.exportedValue = path.to.someUtilFunction();
lorem.ipsum.exportedValue.setA(1).setB(2);


/** @return {boolean} */
lorem.ipsum.baz = function() { return false; };

});  // goog.scope

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
