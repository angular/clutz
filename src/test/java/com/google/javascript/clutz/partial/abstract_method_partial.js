goog.module('abst.method');

/** @constructor */
let C = function () {};

/**
 * It appears that this one is emitted correctly without partial_goog_base.js
 * @return {number}
 */
C.prototype.methodWithTypes = goog.abstractMethod;

/**
 * But this one needs partial_goog_base.js
 */
C.prototype.methodWithoutTypes = goog.abstractMethod;

exports = C;