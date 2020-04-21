/**
 * @fileoverview Rivoting description of the file.
 */
// This is used to test muli-level calls.
let path = {to: {someUtilFunction: function() {}}};

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
