goog.module("foo.MyClass");

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

/**
 * @typedef {{
 *     a: {b: {c: number}},
 * }}
 */
var Typedef;

exports = MyClass;
