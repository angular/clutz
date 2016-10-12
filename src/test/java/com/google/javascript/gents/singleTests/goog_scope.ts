export class Foo {
  static num: number = 8;
  constructor(public n: number) {}

  // TODO: Aggressively export rather than create static methods/fields
  static foo(): number {
    return 4;
  }

  // TODO: Aggressively export rather than create static methods/fields
  static qux(): number {
    return 4;
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
