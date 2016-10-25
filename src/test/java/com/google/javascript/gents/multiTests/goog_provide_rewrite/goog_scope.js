goog.provide("lorem.ipsum.Foo");
goog.provide("lorem.ipsum.Foo.qux");
goog.provide("lorem.ipsum.Foo.Bar");
goog.provide("lorem.ipsum.baz");
goog.provide("lorem.ipsum.exportedValue");

goog.require('goog_provide_rewrite.exports.aFunction');
goog.require('long.namespace.requiring.an.alias_for.ImportedClass');
goog.require('long.namespace.requiring.an.alias_for.ImportedClass.ProvidedSubclass');

goog.scope(function() {

var ImportedClass = long.namespace.requiring.an.alias_for.ImportedClass;
var instanceOfAlias = new ImportedClass();

var instanceofProvidedAlias = new ImportedClass.ProvidedSubclass();
var instanceofNotProvidedAlias = new ImportedClass.NotProvidedSubclass();



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
Foo.staticFunction = function() {
  return 'this is a static method on Foo, since it is NOT goog.provided';
};

Foo.prototype.instanceMethod = function() {}


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

lorem.ipsum.exportedValue = goog_provide_rewrite.exports.aFunction();
lorem.ipsum.exportedValue.setA(1).setB(2);


/** @return {boolean} */
lorem.ipsum.baz = function() { return false; };


/** @typedef {{key: number, value: string}} */
Foo.InnerTypedef;


/**
 * @typedef {{
 *   myFunction: function(?): PrivateTypedef_,
 * }}
 */
var PrivateTypedef_;


/** @enum {number} */
Foo.FruitType = {
  UNKNOWN: 0,
  APPLE: 1,
  ORANGE: 2,
};

// Manually export enum keys.
Foo.FruitType['UNKNOWN'] = Foo.Container.UNKNOWN;
Foo.FruitType['APPLE'] = Foo.Container.APPLE;
Foo.FruitType['ORANGE'] = Foo.Container.ORANGE;

});  // goog.scope

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
