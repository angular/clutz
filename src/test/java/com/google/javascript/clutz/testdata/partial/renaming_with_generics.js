goog.module('renaming.with.generics');

const C = goog.require('other.module');
const {D} = goog.require('other.module.destruct');

/** @type {angular.IPromise<!C>} */
exports.x = null;

/** @type {angular.IPromise<!D>} */
exports.y = null;