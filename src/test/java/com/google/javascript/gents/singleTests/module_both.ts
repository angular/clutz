/**
 * Note: As written in .js if num is reassigned by a consumer of the goog.module
 * L and C will still return the original value of '4'.
 * During translation to .ts, according to ES6 module semantics, the
 * reassignment will be reflected because the bindings are live.
 *
 * This is an intentional semantic mismatch, because most of the time the
 * bindings are immutable and 'export let L' is syntactically preferable.
 */
export let num = 4;

export let B = function(): number {
  return num;
};

export function C(): number {
  return num;
}

export let L = function(): number {
  return num;
};

export class foo {
  static z: number;
}
foo.z = num * 2;

class ClassThatShouldNotBeExported {}
