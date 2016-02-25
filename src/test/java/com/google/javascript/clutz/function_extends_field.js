goog.provide('fn.field');

/** @constructor */
fn.field.A = function() {
  //!! This pattern is non-sense, because base instance functions will shadow functions
  //!! from the prototype. However, we still need to generate non-erring TS code.
  this.f = null;
  this.g = null;
  /** @type {function(): number} */
  this.h = function() {return 0;};
};

fn.field.A.prototype.pf = null;
fn.field.A.prototype.pg = null;
/** @type {function(): number} */
fn.field.A.prototype.ph = function() {return 0;};

/**
 * @constructor
 * @extends {fn.field.A}
 */
fn.field.B = function() {
}

/** @return {number} */
fn.field.B.prototype.f = function() { return 0; }

/** @return {number} */
fn.field.B.prototype.h = function() { return 0; }

/** @return {number} */
fn.field.B.prototype.pf = function() { return 0; }

/** @return {number} */
fn.field.B.prototype.ph = function() { return 0; }
/**
 * @constructor
 * @extends {fn.field.B}
 */
fn.field.C = function() {
}

/** @return {number} */
fn.field.C.prototype.g = function() { return 0; }

/** @return {number} */
fn.field.C.prototype.pg = function() { return 0; }