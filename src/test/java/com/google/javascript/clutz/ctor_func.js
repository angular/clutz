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

/** @const */
ctor_func.ctorFuncFieldAlias = ctor_func.ctorFuncField;

/** @param {function(new:ctor_func.Ctor, number)} ctor */
ctor_func.ctorFuncParam = function(ctor) {};

/**
  * @param {function(new:T, number)} ctor
  * @return {T}
  * @template T
  */
ctor_func.ctorFuncParamTemplatized = function(ctor) {
  return new ctor(0);
};
