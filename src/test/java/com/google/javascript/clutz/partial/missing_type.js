goog.module('missing.type');

/** @const {!Missing} */
const x = missingFunctionCall();

/** @const {!goog.missing.map<string, number>} */
const xWithGenerics = missingFunctionCall2();

exports.x = x;
exports.xWithGenerics = xWithGenerics;