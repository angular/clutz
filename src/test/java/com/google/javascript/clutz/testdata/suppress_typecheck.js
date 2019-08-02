goog.provide('suppress');

/**
 * @constructor
 */
suppress.A = function() {};

/**
 * @return {number}
 */
suppress.A.prototype.foo = function() {return 0;};


/**
 * @constructor
 * @extends {suppress.A}
 */
suppress.B = function() {};

/**
 * @suppress {checkTypes}
 * @return {string}
 */
suppress.B.prototype.foo = function() {return 0;};