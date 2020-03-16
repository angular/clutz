goog.module('date.like')
//!! This test is match a real issue with goog.date.DateLike and the underlying
//!! issue would still appear if this were a proper goog.require().
goog.requireType('goog.date.Date');

/**
 * @typedef {(Date|goog.date.Date)}
 */
goog.date.DateLike;

/** @type {goog.date.DateLike} */
const D = null;

exports.D = D;
