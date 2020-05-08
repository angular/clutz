let goog: any = {};

goog.A = class {
  a: any;
  constructor(a: number) {
    this.a = a;
  }

  /**
   * Untyped method
   */
  static foo(n) {
    return n;
  }

  /**
   * Typed method
   */
  static bar(n: number): boolean {
    return n > 0;
  }
};

goog.A.B = {};

/**
 * Unconverted method
 */
goog.A.B.baz = function(n: number): void {};

/**
 * goog.defineClass based classes
 */
goog.B = class extends goog.A {
  static num: number = 4;
  constructor(a) {
    super(a);
  }
  static foo(): boolean {
    return false;
  }
  static bar(): boolean {
    return true;
  }
};

export class A {
  constructor() {
    goog.A.foo(4);
  }

  static anon() {
    // Anonymous function call
    (function() {})();
  }
}
