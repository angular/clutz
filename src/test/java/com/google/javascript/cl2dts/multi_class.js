goog.provide('multi_class');

/**
 * @constructor
 * @param {number} n
 */
multi_class.A = function(n) {
  /** @type {number} */
  this.a = n;
};

/**
 * @constructor
 * @extends {multi_class.A}
 * @implements {multi_class.I}
 * @implements {multi_class.I2}
 */
multi_class.B = function() {
  /** @type {number} */
  this.b;
};

multi_class.B.prototype.noop = function() {};

/** @interface */
multi_class.I = function() {};

/**
 * @interface
 * @extends {multi_class.I}
 */
multi_class.I2 = function() {};

/**
 * @constructor
 * @extends {multi_class.B}
 */
multi_class.C = function() {};
goog.inherits(multi_class.C, multi_class.B);

/**
 * @constructor
 * @implements {multi_class.I}
 */
multi_class.D = function() {};
