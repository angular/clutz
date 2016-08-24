let num = 4;
let B = function(): number {
  return num;
};
export {B};
export {num};
export class foo { static z: number; }
foo.z = num * 2;
