/**
 * @constructor
 * @param {number} a
 */
var A = function(a) {
  /** @type {number} */
  this.a = a;
  /** @type {boolean} */
  this.b;

  let y = 1;
  /** @type {number} */
  this.z = y + 1;

  this.w;
  this.w.bar = 'bar';

  baz.v = 1;
};

A.prototype.foo = function() {
  /** @type {number} */
  this.c = 4;
  /** @type {string} */
  this.d;

  // These are undeclared fields
  this.u;
  this.n = 12;
  this.x = this.a;
};

/** @type {number} */
A.prototype.e = 8;
/** @type {*} */
A.prototype.f;
/** @type {boolean} */
A.g = true;
/** @type {*} */
A.h;
