var A = class {
  constructor(a: number) {
    this.a = a;
  }
};
class B {
  constructor(a) {
    this.a = a;
  }
}
class C extends A {
  constructor(a, b) {
    A.call(this, a);
    this.b = b;
  }
}
