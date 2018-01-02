/**
 * This file is added to all partial clutz compilations, so that inference
 * can work across some commonly seen methods.
 *
 * Note is should be partially matching closure's base.js.
 */

/** @const */
var goog = goog || {};

/**
 * @type {!Function}
 */
goog.abstractMethod = function() {
};

/**
 * goog.debug.Logger, goog.debug.Logger.Level, goog.debug.LogRecord are from
 * closure's log.js, and are used in a weird aliasing pattern that closure doesn't
 * handle in partial mode.
 */
/**
 * @constructor
 */
goog.debug.Logger = function () {
};

/**
 * @constructor
 */
goog.debug.Logger.Level = function () {
};

/**
 * @constructor
 */
goog.debug.LogRecord = function () {
};
