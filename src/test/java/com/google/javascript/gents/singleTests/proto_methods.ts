var goog: any = {};
goog.A = class {
  constructor(a: number) {
    this.a = a;
  }
  foo(n) {
    return n;
  }
};
class B extends goog.A {
  constructor(a: number, b: boolean) {
    A.call(this, a);
    this.b = b;
  }
  bar(n: number): boolean {
    return n > 0;
  }
}
C.prototype.baz = function(n: number): void {
};
