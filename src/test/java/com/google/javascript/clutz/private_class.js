goog.provide('privateclass');

/**
 * @constructor
 * @private
 */
privateclass.P = function() {};

/**
 * @interface
 * @private
 */
privateclass.PI = function() {};


/**
 * @constructor
 * @extends privateclass.P
 */
privateclass.A = function() {};

/**
 * @constructor
 * @implements privateclass.PI
 */
privateclass.B = function() {};

/**
 * @interface
 * @extends privateclass.PI
 */
privateclass.I = function() {};
