goog.provide('nsThis.C');
goog.provide('nsThis.D');

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
