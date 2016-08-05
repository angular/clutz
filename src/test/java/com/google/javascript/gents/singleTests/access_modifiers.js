/**
 * @constructor
 */
function A() {
  // Field access
  /** @type {number} */
  this.a;
  /** @public {number} */
  this.b;
  /** @package {number} */
  this.c;
  /** @protected {number} */
  this.d;
  /** @private {number} */
  this.e;
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
