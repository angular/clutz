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
