goog.require('RequiredType');

export class B {
  static num: number = 8;

  constructor(public n: number) {}

  static foo(): number {
    return 4;
  }
}

export function qux(): number {
  return 4;
}

export class C {
  static bar(): boolean {
    return false;
  }
}

export const D = path.to.someUtilFunction();
D.setA(1).setB(2);
