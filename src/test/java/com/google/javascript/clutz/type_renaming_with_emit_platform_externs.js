/**
 * @fileoverview Test that during the conversion of platform externs, the types below
 * aren't renamed
 * @externs
 */

/**
 * @record
 * @template VALUE2
 */
function IArrayLike() {}

/** @type {number} */
IArrayLike.prototype.length;

/**
 * @constructor
 * @implements {IArrayLike<T>}
 * @template T
 */
function Arguments() {}

/**
 * @type {number}
 */
Arguments.prototype.length;

/**
 * @constructor
 * @implements {IArrayLike<T>}
 * @template T
 */
function NodeList() {}

/**
 * @type {number}
 */
NodeList.prototype.length;

/**
 * @param {number} index
 * @return {T|null}
 */
NodeList.prototype.item = function(index) {};

/**
 * @constructor
 * @template T
 */
function MessageEvent() {}

/**
 * @type {T}
 */
MessageEvent.prototype.data;


/**
 * @interface
 * @template TYPE
 */
function IThenable() {}