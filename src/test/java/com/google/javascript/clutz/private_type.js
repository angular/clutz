goog.provide('privatetype');
goog.provide('privatetype.enumUser');
goog.provide('privatetype.user');

/**
 * @enum {string}
 * @private
 */
privatetype.PrivateEnum_ = { VALUE: '' };

/** @type {privatetype.PrivateEnum_} */
privatetype.enumUser = privatetype.PrivateEnum_.VALUE;

/** @type {privatetype.X_} */
privatetype.user = new foo.X_();

/** @constructor @private */
privatetype.X_ = function() {};
