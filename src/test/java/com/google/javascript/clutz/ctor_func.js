goog.provide('ctor_func');

/**
 * @param {string} a
 * @param {number} b
 * @template T
 * @constructor
 */
ctor_func.Ctor = function(a, b) {};

/** @type {function(new:ctor_func.Ctor,string,number)} */
ctor_func.ctorFuncField = ctor_func.Ctor;

/** @param {function(new:ctor_func.Ctor, number)} ctor */
ctor_func.ctorFuncParam = function(ctor) {};
