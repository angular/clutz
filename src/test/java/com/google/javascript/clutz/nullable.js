goog.provide('nullable');

/** @type {?boolean} */
nullable.w = true;

/**
 * Explicitly non-nullable.
 * @type {!Object}
 */
nullable.x = {};

/**
 * Implicitly nullable.
 * @type {Object}
 */
nullable.y = {};

/**
 * Explicitly nullable.
 * @type {?Object}
 */
nullable.z = {};

