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
export class GoogDefinedClassWithConstructorAnnotation {
  constructor() {}
}

/**
 * goog.defineClass with deeply nested annotation
 */
export class GoogDefinedClassWithDeeplyNestedConstructorAnnotation {
  constructor() {}
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

abstract class AbstractClass {
  abstract method(): void;

  abstract methodWithReturn(): string;

  abstract methodWithParams(x: string, y: string): void;
}

/**
 * My abstract class.
 */
abstract class AnotherAbstractClass {
  /**
   * My abstract method.
   */
  abstract anotherMethod(): void;
}

abstract class AbstractGenericClass<T> {}

abstract class AbstractClassExtends extends AbstractClass {}

abstract class AbstractClassExtendsGeneric extends
    AbstractGenericClass<string> {}

class DecoratedConstructor {
  constructor() {}
}

interface Interface {}
interface GenericInterface<T> {}
class Class {}

export class GenericClass<T> extends Class implements Interface,
                                                      GenericInterface<T> {}

export class NormalClass extends Class implements Interface {}

class ExtendsGenericClass extends GenericClass<string> {}
