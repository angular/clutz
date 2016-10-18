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

export class Bar {}
Foo.Bar.bar = function(): boolean {
  return false;
};

export function baz(): boolean {
  return false;
}

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
