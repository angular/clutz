goog.provide('typedef.C');

/**
 * @export
 * @constructor
 */
typedef.C = function() {
  /**
   * Due to https://github.com/google/closure-compiler/issues/1975
   * This js doc will be attached to the type "typedef.C.T".
   *
   * @private
   * @type {typedef.C.T}
   */
  this.privateUsage = function() {};
};

/**
 * These types should *not* be emitted as PrivateType as typedef.C.T is public.
 * If clutz picks up the jsdoc from "this.privateUsage", as closure incorrectly
 * assigns it, they will emit as PrivateType.
 *
 * @param {typedef.C.T} a
 * @param {typedef.C.T=} b
 * @param {?typedef.C.T=} c
 */
typedef.C.prototype.f = function(a, b, c) {};

/**
 * This JsDoc is the correct doc for the type "typedef.C.T", but
 * due to https://github.com/google/closure-compiler/issues/1975
 * it is not accessible.
 *
 * @typedef {function(?):?}
 */
typedef.C.T;