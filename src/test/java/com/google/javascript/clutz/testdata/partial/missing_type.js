goog.module('missing.type');

/** @const {!Missing} */
const x = missingFunctionCall();

/** @const {!goog.missing.map<string, number>} */
const xWithGenerics = missingFunctionCall2();

/** @const {!goog.missing.map<!mod.ref.A, !mod.ref.B<!mod.ref.C>>} */
const xWithMissingGenerics = missingFunctionCall3();

exports.x = x;
exports.xWithGenerics = xWithGenerics;
exports.xWithMissingGenerics = xWithMissingGenerics;