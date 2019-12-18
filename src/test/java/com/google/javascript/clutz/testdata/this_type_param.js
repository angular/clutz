goog.provide('nsThis.C');
goog.provide('nsThis.D');
goog.provide('nsThis.arrayMap');

/**
 * @constructor
 */
nsThis.C = function() {};

/**
 * @return {THIS}
 * @this {THIS}
 * @template THIS
 */
nsThis.C.prototype.foo = function() {
  return this;
};

/**
 * @param {string} str
 * @return {THIS}
 * @this {THIS}
 * @template THIS
 */
nsThis.C.prototype.foo2 = function(str) {
  return this;
};

/**
 * @param {!Array<THIS>} arr
 * @return {THIS}
 * @this {THIS}
 * @template THIS
 */
nsThis.C.prototype.foo3 = function(arr) {
  return this;
};

/**
 * @return {!nsThis.C}
 */
nsThis.C.prototype.bar = function() {
  return new nsThis.C();
};


/**
 * @constructor
 * @extends {nsThis.C}
 */
nsThis.D = function() {};

/**
 * @param {?function(this: THIS, VALUE, number)} callback
 * @param {THIS=} reciever
 * @template THIS, VALUE
 */
nsThis.arrayMap = function(callback, reciever) {};
