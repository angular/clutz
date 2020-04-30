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

/**
 * This is a comment. It should not go away. It should stay here.
 *   So should this line of overflow text.
 *
 * @typedef {{
 *     a: string,
 *     b: string
 * }}
 */
let TypeDefWithComment;

/**
 * @typedef {{
 *  key1: string,
 *  key2,
 *  key3: number
 * }}
 */
let TypeDefWithTypeMissing;

exports = {MyExportedInterface, TypeDefWithComment};
