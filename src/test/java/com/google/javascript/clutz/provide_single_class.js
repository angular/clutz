goog.provide('foo.bar.Baz');

// NestedClass and NestedEnum are not provided because this is against JS closure's
// style guide.
// https://google.github.io/styleguide/javascriptguide.xml?showone=Providing_Dependencies_With_goog.provide#Providing_Dependencies_With_goog.provide

/** @constructor */
foo.bar.Baz = function() {
  /** @type {string} */
  this.field = 'a';
  // Surprisingly, defining the same field on the prototype and in
  // the constructor with different signatures doesn't throw a type error.
  // The type of the prototype is preferred and as far as types are
  // concerned `avalue` lives on the prototype object.
  /** @type {string} */
  this.avalue = 0;
};

/**
 * @param {string} a
 * @return {number}
 */
foo.bar.Baz.staticMethod = function(a) {
  return +a;
};

/** @const {!Function} */
// A static property of type Function, not to be confused with a real ctor.
foo.bar.Baz.FUNCTION_PROP_ = foo.bar.Baz.staticMethod;

/**
 * @type {number}
 */
foo.bar.Baz.prototype.avalue = 0;

/**
 * @param {string} a
 * @return {number}
 */
foo.bar.Baz.prototype.method = function(a) {
  return +a;
};

/**
 * @param {!foo.bar.Baz.NestedClass} b
 * @return {boolean}
 */
foo.bar.Baz.prototype.equals = function(b) {
  return false;
};

/** @constructor */
foo.bar.Baz.NestedClass = function() {};

/** @enum */
foo.bar.Baz.NestedEnum = {
  A: 1,
  B: 2
};