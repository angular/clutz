class A {
  e: number = 8;
  f: any;
  static g: boolean = true;
  static h: any;
  b: boolean;
  z: number;
  c: number = 4;
  d: string;
  // These are undeclared fields
  u: any;
  n: any = 12;
  x: any;
  constructor(public a: number) {
    let y = 1;
    this.z = y + 1;
  }
  foo() { this.x = this.a; }
}
