let num = 4;
let B = function(): number {
  return num;
};
export{B};
export{num};
export const foo = class {
  static z: number;
  constructor() {
  }
};
foo.z = num * 2;
