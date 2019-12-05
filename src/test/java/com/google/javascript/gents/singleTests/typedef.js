goog.module('typedefs.test');

/**
 * Comment
 * @typedef {string}
 */
let MyString;

/**
 * @typedef {{
 *   x: string,
 *   y: number
 * }}
 */
let MyInterface;

/**
 * @typedef {{
 *   x: string,
 *   y: number
 * }}
 */
let MyExportedInterface;


/** @type {MyString} */
const x = 'x';

exports = {MyExportedInterface};