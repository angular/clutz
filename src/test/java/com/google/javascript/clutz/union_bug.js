goog.module('union.collapse');

/**
 * @typedef {{
 *   u: U,
 * }}
 */
let Top;

/**
 * @typedef {(
 *   A | B
 * )}
 */
let U;

/**
 * @typedef {{
 *  type: string,
 *  b: (string | undefined)
 * }}
 */
let A;

/**
 * @typedef {{
 *  type: string,
 *  a: (string | undefined)
 * }}
 */
let B;

exports.Top = Top;
exports.U = U;
exports.A = A;
exports.B = B;
