goog.module('goog.access_modifiers');

/**
 * @constructor
 */
function A() {
  // Field access
  /** @type {number} */
  this.a = 0;
  /** @public {number} */
  this.b = 0;
  /** @package {number} */
  this.c = 0;
  /** @protected {number} */
  this.d = 0;
  /** @private {number} */
  this.e = 0;
}

// Static field access
/** @protected {number} */
A.sa;
/** @private {number} */
A.sb;

// Method access
/** @public */
A.prototype.foo = function() {};
/** @protected */
A.prototype.bar = function() {};
/** @private */
A.prototype.baz = function() {};

// Static method access
/** @public */
A.fizzbuzz = function() {};
/** @protected */
A.fizz = function() {};
/** @private */
A.buzz = function() {};

exports = {A};
