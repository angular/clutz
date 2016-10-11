let num = 4;
/**
 * Note: `var` and `let` may be unsafe to export directly.
 */
let B = function(): number {
  return num;
};
export {B};
export function C(): number {
  return num;
};

/**
 * Note: `let` may be unsafe to export directly.
 */
let L = function(): number {
  return num;
};
export {L};

export {num};

export class foo { static z: number; }

foo.z = num * 2;

class ClassThatShouldNotBeExported {}
