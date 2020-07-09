goog.provide('x.Y');

/**
 * Docs on a ctor.
 *
 * Across multiple paragraphs.
 *
 * @constructor
 * @param {number} x Ctor param.
 */
x.Y = function(x) {
  /**
   * Docs on a field.
   *
   * @type {string}
   */
  this.field = '';
};

/**
 * Docs on a method!
 * @param {string} foo This is a param doc.
 */
x.Y.prototype.method = function(foo) {};

/**
 * Docs on a deprecated method.
 * @param {string} foo This is a param doc.
 * @deprecated
 */
x.Y.prototype.deprecatedMethod1 = function(foo) {};

/**
 * Docs on a deprecated method, with a reason.
 * @param {string} foo This is a param doc.
 * @deprecated This is really deprecated - do not use!
 */
x.Y.prototype.deprecatedMethod2 = function(foo) {};
