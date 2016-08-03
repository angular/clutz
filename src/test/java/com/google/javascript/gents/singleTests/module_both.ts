var num = 4;
var B = function(): number {
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
