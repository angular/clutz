goog.provide('foo.bar.Baz');
goog.provide('foo.bar.Baz.NestedClass');
goog.provide('foo.bar.Baz.NestedEnum');

/** @constructor */
foo.bar.Baz = function() {
  /** @type {string} */
  this.field = 'a';
};

/**
 * @param {string} a
 * @return {number}
 */
foo.bar.Baz.staticMethod = function(a) {
  return Number(a)
};

/**
 * @param {string} a
 * @return {number}
 */
foo.bar.Baz.prototype.method = function(a) {
  return Number(a)
};

/**
 * @param {foo.bar.Baz.NestedClass} b
 * @return {boolean}
 */
foo.bar.Baz.prototype.equals = function(b) {
  return false;
};

/**
 * @private
 */
foo.bar.Baz.prototype.thisIsPrivate_ = function() {};

/** @constructor */
foo.bar.Baz.NestedClass = function() {};

/** @enum */
foo.bar.Baz.NestedEnum = {
  A: 1,
  B: 2
};

/**
 * This is not goog.provided, and it would be strange to reference an enum type
 * as a static class property.
 * This is just here to assert that we gracefully ignore it.
 * @enum
 */
foo.bar.Baz.AnotherNestedEnum = {};
