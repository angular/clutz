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

/**
 * Like goog.bind(), except that a 'this object' is not required. Useful when
 * the target function is already bound.
 *
 * Usage:
 * var g = goog.partial(f, arg1, arg2);
 * g(arg3, arg4);
 *
 * @param {Function} fn A function to partially apply.
 * @param {...*} var_args Additional arguments that are partially applied to fn.
 * @return {!Function} A partially-applied form of the function goog.partial()
 *     was invoked as a method of.
 */
goog.partial = function(fn, var_args) {
  // var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    // // Clone the array (with slice()) and append additional arguments
    // // to the existing arguments.
    // var newArgs = args.slice();
    // newArgs.push.apply(newArgs, arguments);
    // return fn.apply(this, newArgs);
  };
};
