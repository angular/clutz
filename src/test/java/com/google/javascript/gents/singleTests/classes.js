/**
 * Anonymous class
 * @param {number} a
 * @constructor
 */
var A = function(a) {
  this.a = a;
};

/**
 * Named class
 * @constructor
 */
function B(a) {
  this.a = a;
}

/**
 * Named class extension
 * @constructor
 * @extends {A}
 */
function C(a, b) {
  A.call(this, a);
  this.b = b;
}

/**
 * Anonymous class extension
 * @constructor
 * @extends {B}
 */
var D = function(a, b) {
  B.call(this, a);
  this.b = b;
};
