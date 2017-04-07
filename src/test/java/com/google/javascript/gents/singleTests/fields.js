/**
 * @constructor
 * @param {number} parameterProp
 * @param {{foo: {bar: function() : number}}} objectParam
 */
var A = function(parameterProp, objectParam) {
  /** @type {number} */
  this.parameterProp = parameterProp;

  /** @type {boolean} */
  this.b;

  let y = 1;
  /** @type {number} */
  this.z = y + 1;

  this.w;
  this.w.bar = 'bar';

  this.n = 12;
  this.n = 13;

  this.a;

  this.arrowFuncField = () => {
    this.fieldSetFromArrowFunc = 'f';
  };

  this.functionResultField = objectParam.foo.bar();
};

A.prototype.foo = function() {
  /** @type {number} */
  this.c = 4;
  /** @type {string} */
  this.d;

  this.n = 14;
  this.x = this.a;
  // These are undeclared fields
  this.u;
};

/** @type {number} */
A.prototype.e = 8;
/** @type {*} */
A.prototype.f;
/** @type {boolean} */
A.g = true;
/** @type {*} */
A.h;
