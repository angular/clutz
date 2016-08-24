/**
 * Anonymous class
 */
class A {
  constructor(a: number) { this.a = a; }
}
/**
 * Named class
 */
class B {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
/**
 * Named class extension
 */
class C extends A {
  constructor(a, b) {
    super(a);
    this.b = b;
  }
}
/**
 * Anonymous class extension
 */
class D extends B {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}
/**
 * goog.defineClass based classes
 */
class E extends C {
  constructor(a, b) { super(a, b); }
}
let nested = {};
nested.klass = class {};
