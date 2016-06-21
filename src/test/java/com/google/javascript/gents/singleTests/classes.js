/**
 * @param {number} a
 * @constructor
 */
var A = function(a) {
  this.a = a;
};

/**
 * @constructor
 */
function B(a) {
  this.a = a;
}

/**
 * @constructor
 * @extends {A}
 */
function C(a, b) {
  A.call(this, a);
  this.b = b;
}
