
/**
 * Anonymous class
 */
class A {
  a: any;
  constructor(a: number) {
    this.a = a;
  }
}

/**
 * Named class
 */
class B {
  a: any;
  b: any;
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

/**
 * Named class extension
 */
class C extends A {
  b: any;
  constructor(a, b) {
    super(a);
    this.b = b;
  }
}

/**
 * Anonymous class extension
 */
class D extends B {
  c: any;
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

/**
 * goog.defineClass based classes
 */
class E extends C {
  constructor(a, b) {
    super(a, b);
  }
}
let nested = {};
nested.klass = class {};

class F {
  // inline comment


  /**
     * block comment
     */
  constructor() {}

  /** Do foo! */
  foo() {}

  /**
     * Returns phone number.
     */
  bar(): string {
    return '';
  }
}

class G {
  /**
     * ES6 method short hand.
     */
  method() {}
}
