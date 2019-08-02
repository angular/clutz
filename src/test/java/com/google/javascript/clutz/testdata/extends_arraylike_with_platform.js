goog.provide('extend.arraylike.A');
goog.provide('extend.arraylike.I');
goog.provide('extend.arraylike.B');

/**
 * @constructor
 * @implements {IArrayLike<?>}
 */
extend.arraylike.A = function() {};

/** @type {number} */
extend.arraylike.A.prototype.length;

/**
 * @interface
 * @extends {IArrayLike<?>}
 */
extend.arraylike.I = function() {};

/**
 * @constructor
 * @implements {extend.arraylike.I}
 */
extend.arraylike.B = function() {};

/** @type {number} */
extend.arraylike.B.prototype.length;