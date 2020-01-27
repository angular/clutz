/**
 * Anonymous class
 */
export class A {
  a: any;

  constructor(a: number) {
    this.a = a;
  }
}

/**
 * Named class
 */
export class B {
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
export class C extends A {
  b: any;

  constructor(a, b) {
    super(a);
    this.b = b;
  }
}

/**
 * Anonymous class extension
 */
export class D extends B {
  c: any;

  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

/**
 * goog.defineClass based classes
 */
export class E extends C {
  constructor(a, b) {
    super(a, b);
  }
}
let nested = {};
nested.klass = class {};

export class F {
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

/**
 * goog.defineClass with annotation
 */
export class GoogDefinedClassWithConstructorAnnotation {}

/**
 * goog.defineClass with deeply nested annotation
 */
export class GoogDefinedClassWithDeeplyNestedConstructorAnnotation {
  foo() {
    return new class Klass {}
    ();
  }
}

/**
 * goog.defineClass with annotation and parameters
 */
export class GoogDefinedClassWithConstructorAnnotationAndParameters {
  constructor(a: number) {}
}

export class G {
  /**
   * ES6 method short hand.
   */
  method() {}
}

export class ClassWithNoConstructorJsDocAndProperties {
  private foo: string;

  constructor(foo) {
    this.foo = foo;
  }
}

class AbstractClass {
  method() {}
}

/**
 * My abstract class.
 */
class AnotherAbstractClass {
  /**
   * My abstract method.
   */
  anotherMethod() {}
}
