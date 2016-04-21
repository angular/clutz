/**
 * @fileoverview Test that during the conversion of platform externs, the types below
 * aren't renamed
 * @externs
 */

/**
 * @interface
 * @template KEY1, VALUE1
 */
function IObject() {}

/**
 * @record
 * @extends {IObject<number, VALUE2>}
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

/**
 * @constructor
 * @param {*=} opt_value
 * @return {!Object}
 */
function Object(opt_value) {}

/**
 * @constructor
 * @implements {IArrayLike<T>}
 * @param {...*} var_args
 * @return {!Array<?>}
 * @template T
 */
function Array(var_args) {}

/**
 * @type {number}
 */
Array.prototype.length;

