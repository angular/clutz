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

Promise.resolve().then(/** before `() =>` but after `.then(` */ () => {
  a();
});

Promise.resolve().then(() => 'a')
                 .then(() => 'b'); // on the same line as `.then(() => 'b');`

if (true) {
  if (true) {
    if (true) {
    }   //  on the same line as innermost }
  }     //  on the same line as the middle }
}       //  on the same line as the outermost }

// ob1 comment
const ob1 = {
  a: 'a', // on the same line as `a: 'a'`
  b: 'b' /* on the same line as `b: 'b'` */,
  // on the line after `b: 'b'`
  c: 'c', // on the same line as `c: 'c'`
  // on the line after `c: 'c'`
  d: [
    1, // one the same line as `1,`
    2,
    3, // one the same line as `3,`
       // on the line after `3,`
  ],
  e: new RegExp(
      'pattern',
      'g' // on the same line as `'g'` in the RegExp constructor
  )
};

function f1() {
} // no blank line separating
function f2() {
} // no blank line separating
let x1; // no blank line separating
let x2;

function f3() {
} // one blank line separating

function f4() {
} // two blank lines separating


let x3;  // three blank lines separating



let x4;

let p;// no space before comment
let q; // one space before comment
let r;  // two spaces before comment

exports = {A, X, B};
