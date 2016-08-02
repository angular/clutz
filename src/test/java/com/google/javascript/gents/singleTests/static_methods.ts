var goog: any = {};
goog.A = class {
  constructor(a: number) {
    this.a = a;
  }
  static foo(n) {
    return n;
  }
  static bar(n: number): boolean {
    return n > 0;
  }
};
goog.A.B = {};
goog.A.B.baz = function(n: number): void {
};
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
class A {
  constructor() {
    goog.A.foo(4);
  }
  static anon() {
    (function() {
    })();
  }
}
