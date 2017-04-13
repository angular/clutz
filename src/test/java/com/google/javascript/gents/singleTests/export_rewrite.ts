
export function B() {}

export class Klass { static NUM: number = 4; }
B();
let x = new Klass();
let y = Klass.NUM;
let z: Klass = x;
