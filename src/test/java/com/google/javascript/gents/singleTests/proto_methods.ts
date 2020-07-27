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
export class B extends goog.A {
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

// Methods on C are not collapsed into a ES6 class declaration because the
// definition of C itself does not exist in this file.

/**
 * Unconverted method
 */
C.prototype.baz = function(this: C, n: number): void {};

C.prototype.baq = function(this: C) {};

C.prototype.faz = function(this: B, n: number) {};

C.staticMember = function() {};

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
