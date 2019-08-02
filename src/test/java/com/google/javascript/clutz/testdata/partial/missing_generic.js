goog.module('missing.gen');

//!! When emitting with missing sources, we have to emit T = any, to
//!! support downsteam consumers that use missing.gen.C without passing
//!! any type parameters.
/**
 * @constructor
 * @template T
 */
function GenericClassDefaultsTypeParamToAny(){}

//!! This is here to test how is a missing generic class emitted.
//!! Assume that missing.GenericClass has a generic param.
/** @const {!missing.GenericClass} */
const genericClassUse = new GenericClass();

exports.GenericClassDefaultsTypeParamToAny = GenericClassDefaultsTypeParamToAny;
exports.genericClassUse = genericClassUse;