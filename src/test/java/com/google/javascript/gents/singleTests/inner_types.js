goog.module('foo.MyClass');

class MyClass {
  /**
   * Constructor for MyClass
   * @param {{type: !MyClass.InnerTypedefWithAssignment}} data
   */
  constructor(data) {
    /** @export {!MyClass.InnerTypedefWithAssignment} type property*/
    this.type = data.type;
  }

  /**
   * equal function
   * @param {!MyClass} otherData
   * @return {boolean}
   * @export
   */
  equals(otherData) {
    return this.type.a === otherData.type.a;
  }
}

/**
 * @typedef {{
 *     a: number,
 *     b: number,
 * }}
 */
MyClass.InnerTypedefWithAssignment = {};

/**
 * @typedef {!{
 *     a: number,
 *     b: number,
 * }}
 */
MyClass.InnerTypedefNonNullable = {};

// Intentionally loose the nullability.
/**
 * @typedef {?{
 *     a: number,
 *     b: number,
 * }}
 */
MyClass.InnerTypedefNullable = {};

/**
 * @typedef {{
 *     a: number,
 * }}
 */
MyClass.InnerTypedef;

/**
 * @typedef {{
 *     a: {b: {c: number}},
 *     d: string,
 *     e: function(string, number): number,
 * }}
 */
MyClass.InnerTypedefWithNestedTypes;

/** @typedef {string} */
MyClass.InnerMyStringType;

/** @typedef {!string} */
MyClass.InnerMyStringTypeNonNullable;

/** @typedef {?string} */
MyClass.InnerMyStringTypeNullable;

/** @typedef {?} */
MyClass.InnerMyAny1;

/** @typedef {*} */
MyClass.InnerMyAny2;

/** @typedef {boolean|number|string} */
MyClass.InnerUnionType;

/** @typedef {!Array<number>} */
MyClass.InnerNumberArrayType;

/**
 * @typedef {{
 *     a: {b: {c: number}},
 * }}
 */
var Typedef;

/** @typedef {string} */
var MyStringType;

/** @typedef {!string} */
var MyStringTypeNonNullable;

/** @typedef {?string} */
var MyStringTypeNullable;

/** @typedef {?} */
var MyAny;

exports = MyClass;
