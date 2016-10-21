goog.require('path.to.someUtilFunction');

export class Foo {
  constructor(public n: number) {}

  static foo(): string {
    return 'this is a static method on Foo, since it is NOT goog.provided';
  }
}

export function qux(): string {
  return 'this is directly exported since it is goog.provided';
}

export const num: number = 8;

export class Bar {
  instanceFunction(): boolean {
    return false;
  }

  setA(a: number): Bar {
    return this;
  }

  setB(b: number): Bar {
    return this;
  }
}

export function staticBar(): boolean {
  return false;
}

export const exportedValue = path.to.someUtilFunction();
exportedValue.setA(1).setB(2);

export function baz(): boolean {
  return false;
}

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
