class A {
  constructor(a: number) { this.a = a; }
}
class B {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
class C extends A {
  constructor(a, b) {
    super(a);
    this.b = b;
  }
}
class D extends B {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}
class E extends C {
  constructor(a, b) { super(a, b); }
}
let nested = {};
nested.klass = class {
  constructor() {}
};
