goog.provide('foo.bar.Baz');

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
