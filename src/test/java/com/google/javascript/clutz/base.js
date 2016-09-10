// Changing this definition to false or removing or renaming it will cause closure to remove
// goog from the list of provided symbols, thus breaking the output.
/**
 * @define {boolean}
 */
var COMPILED = false;

/**
 * @const
 */
var goog = goog || {};

/**
 * @param {string} name
 * @return {?}
 */
goog.require = function(name) {};

/**
 * @param {!Function} childCtor Child class.
 * @param {!Function} parentCtor Parent class.
 */
goog.inherits = function(childCtor, parentCtor) {};

/**
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is defined.
 */
goog.isDef = function(val) {};

goog.provide('goog.Uri');
/** @constructor */
goog.Uri =  function() {}
