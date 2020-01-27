goog.module('gents.comments');

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
 * This is a comment
 *
 * with empty line breaks that are preserved
 * @param {number} deleted
 * @param {Foo} $foo
 * @param {number} notdeleted because this has a description
 * @return {number} this also has a description
 */
// This is just some extra stuff
var foo = function(deleted, notdeleted) {
  return deleted + notdeleted;
};

// The following comments should be mostly deleted
/**
 * @type {number}
 * @private {number}
 * @protected {number}
 * @param {number} foo description of foo
 * @public {number}
 * @package {number}
 */
var x;

/**
 * @const {number}
 */
var xConst = 1;

/**
 * @constructor
 * @extends {A}
 */
var X = function() {}

class B {
  constructor() {
    /**
     * @type {{param1: (string|undefined)
     * }}
     */
    this.twoLines = {param1: 'param1'};

    /**
     * @type {{
     *   param2: (string|undefined)
     * }}
     */
    this.multipleLines = {param2: 'param2'};

    /**
     * @type {{
     *   param3: (string|undefined),
     *   param4: (string|undefined),
     * }}
     */
    this.twoParams = {param3: 'param3', param4: 'param4'};

    /**
     * @private @const {number} My special number.
     */
    this.privateConstParam = 3;
  }
}

/** @export {number} */
let m = 4;

// head comment
if (m) {
  // comment at the bottom of if block
} else {
  // comment at the bottom of else block
}

var a = function() {
  return {
    b: function() {}
  }
};
var c = function() {};

// comment before GETPROP
a(
    // comment in GETPROP
    )
    .b();

// comment after GETPROP
c();
// comment in the end

exports = {A, X, B};
