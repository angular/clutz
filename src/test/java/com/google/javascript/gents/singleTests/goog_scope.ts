export class Foo {
  static num: number = 8;
  constructor(public n: number) {}

  static foo(): string {
    return 'this should create a static method on Foo, since it is NOT goog.provided';
  }

  // TODO: Aggressively export rather than create static methods/fields
  static qux(): string {
    return 'this should be directly exported, rather than create a static method, ' +
        'since it is goog.provided';
  }
}

const Foo = Foo;
Foo.Bar = class {
  static bar(): boolean {
    return false;
  }
};

export function baz(): boolean {
  return false;
}

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
