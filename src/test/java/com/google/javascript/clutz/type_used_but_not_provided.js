goog.provide('used.not.provided.a');

/**
 * @interface
 * @template T
 */
used.not.provided.I = function() {};

/**
 * @constructor
 * @implements {used.not.provided.I<number>}
 */
used.not.provided.C = function() {};

/**
 * @type {used.not.provided.C}
 */
used.not.provided.a = null;