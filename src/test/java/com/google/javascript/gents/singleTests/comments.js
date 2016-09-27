/**
 * This comment describes a class
 * @constructor
 */
var A = function() {};

/**
 * This is a floating comment block
 * It stays together with anything not separated by an empty line
 */
/* Still the same block */
// Yup
// Here too

// This comment is moved with the method
/* This one too (same comment block) */
A.prototype.foo = function() {};

/**
 * @param {number} deleted
 * @param {number} notdeleted because this has a description
 * @return {number} this also has a description
 */
// This is just some extra stuff
var foo = function(deleted, notdeleted) { return deleted + notdeleted; };

// The following comment should be entirely deleted
/**
 * @constructor
 * @extends {A}
 * @type {number}
 * @private {number}
 * @protected {number}
 * @public {number}
 * @package {number}
 * @const {number}
 */
var x;

/** @export {number} */
let m = 4;
