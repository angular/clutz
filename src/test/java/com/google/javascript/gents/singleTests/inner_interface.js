goog.module('inner.interface');

class MyClass {}

/** @interface */
MyClass.I = class {
  constructor() {
    /** @type {string} */
    this.a;
  }
}

/**
 * Inner interface writen in ES6 style.
 * Currently not translated well.
 * @interface
 */
MyClass.IEs6 = class {
  constructor() {
    /** @type {string} */
    this.a;
  }
};

/**
 * Inner interface writen in ES5 style.
 * Currently not translated well.
 * @interface
 */
MyClass.IEs5 = function() {};

/** @type {string} */
MyClass.IEs5.prototype.a;

exports = MyClass;
