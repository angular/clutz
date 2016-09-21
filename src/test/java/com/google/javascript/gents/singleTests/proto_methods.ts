let goog: any = {};
/**
 * Nested anonymous class in ES6 syntax
 */
goog.A = class {
  a: any;
  constructor(a: number) {
    this.a = a;
  }
  /**
 * Untyped method
 */
  foo(n) {
    return n;
  }
};

/**
 * Named class extension
 */
class B extends goog.A {
  b: any;
  constructor(a: number, b: boolean) {
    super(a);
    this.b = b;
  }
  /**
 * Typed method
 */
  bar(n: number): boolean {
    return super.foo(n) > 0;
  }
  /**
 * Another typed method
 */
  baz(n: number): boolean {
    return super.foo(n) > 0;
  }
}

/**
 * Unconverted method
 */
C.prototype.baz = function(n: number): void {};

/**
 * goog.defineClass based classes
 */
goog.B = class extends goog.A {
  constructor(a) {
    super(a);
  }
  foo(): number {
    return 0;
  }
};
