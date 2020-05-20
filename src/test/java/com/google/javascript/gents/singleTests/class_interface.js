goog.module('klass.interface');

// This file contains a mix of different ways of declaring an interface with
// methods and properties in Closure. The only commonality is that the user
// meant to write an interface, and attached it to an ES6 class out of
// convenience.
// Fields and methods are declared in three different ways:
// - in the ctor body
// - class body
// - using the prototype chain.
// Extending mechanism is both ES6 'class extends', and closure @extends.

/**
 * Some non-trivial comments.
 * @interface
 */
class IBase {
  constructor() {
    /** @const {number} */
    this.a;
  }
  /** @return {boolean} */
  method1() {}

  /** @param {boolean=} a */
  method2(a = false) {}

  /** @param {string} a */
  inferredVoidReturn(a) {}

  /**
   * @param {string} a
   * @return {string}
   */
  explicitReturn(a) {}
}

/**
 * @interface
 */
class IExtendsUsingEs6 extends IBase {}


/** @const {number} */
IExtendsUsingEs6.prototype.b;

/** @returns {boolean} */
IExtendsUsingEs6.prototype.method2 = function() {};

/**
 * @record
 */
class RExtendsUsingEs6 extends IBase {}

/**
 * @record
 */
class RecordClass {
  constructor() {
    /** @type {number} The number of attempts before giving up. */
    this.attempts;
    /** @type {boolean} */
    this.foo;
  }

  /**
   * Performs the frobnication according to the given strategy.
   * @param {!string} strategy
   * @return {boolean}
   */
  frobnicate(strategy) {}
}

/** @const {number} */
RExtendsUsingEs6.prototype.c;

/**
 * Some non-trivial comments.
 * @interface
 * @extends {IBase}
 */
class IExtendsUsingClosure {
  /** @return {boolean} */
  method3() {}
}

exports.IBase = IBase;
exports.IExtendsUsingEs6 = IExtendsUsingEs6;
exports.RExtendsUsingEs6 = RExtendsUsingEs6;
exports.IExtendsUsingClosure = IExtendsUsingClosure;
