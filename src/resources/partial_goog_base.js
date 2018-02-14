/**
 * This file is added to all partial clutz compilations, so that inference
 * can work across some commonly seen methods.
 *
 * Note is should be partially matching closure's base.js.
 */

/** @const */
var goog = goog || {};

/**
 * Null function used for default values of callbacks, etc.
 * @return {void} Nothing.
 */
goog.nullFunction = function() {};

/**
 * @type {!Function}
 */
goog.abstractMethod = function() {
};