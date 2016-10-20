export function B() {}
B.Klass = class { static NUM: number = 4; };
B();
let x = B.Klass();
let y = B.Klass.NUM;
let z: B.Klass = x;
