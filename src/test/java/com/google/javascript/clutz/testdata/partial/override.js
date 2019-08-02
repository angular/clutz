goog.module('override');

/**
 * @constructor
 * @extends {override.Invisible}
 */
function ExtendsInvisible() {
}

/**
 * Ordinary function, for comparison with the others.
 * @param {number} x
 */
ExtendsInvisible.prototype.nonOverride = function(x) {};

/**
 * This function has no known type, so its parameter should be optional.
 * @override
 */
ExtendsInvisible.prototype.inferredOverride = function(x) {
  x = 3;
};

/**
 * This function uses @override, but it includes type information, so that type should persist.
 * @param {number} x
 * @return {number}
 * @override
 */
ExtendsInvisible.prototype.overrideWithType = function(x) { return 3; };

/**
 * @constructor
 */
function Base() {}

/**
 * @param {number} x
 */
Base.prototype.method = function(x) {}

/**
 * @constructor
 * @extends {Base}
 */
function ExtendsBase() {}

/**
 * This function has no type information, but its base class is visible, so it should inherit
 * the types from the base.
 * @override
 */
ExtendsBase.prototype.method = function(x) {}

/**
 * @interface
 * @template T
 */
function Template() {}

/**
 * The type of T in the callback should not be marked optional.
 * @param {function(T): R} f
 * @template R
 */
Template.prototype.callbackWithTemplateArg = function(f) {}

/**
 * Note: we currently get this wrong, in that we mark the callback param as optional.
 * We can fix later if it matters.
 * @param {function(?): R} f
 * @template R
 */
Template.prototype.callbackWithUnknownArg = function(f) {}

exports.ExtendsInvisible = ExtendsInvisible;
exports.ExtendsBase = ExtendsBase;
exports.Template = Template;
