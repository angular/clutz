let num = 4;
let B = function(): number {
  return num;
};
export default B;
export {num};

export class foo { static z: number; }

foo.z = num * 2;
