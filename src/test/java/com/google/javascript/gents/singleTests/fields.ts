class A {
  e: number = 8;
  f: any;
  static g: boolean = true;
  static h: any;
  b: boolean;
  z: number;
  c: number = 4;
  d: string;
  constructor(public a: number) {
    let y = 1;
    this.z = y + 1;
  }
  foo() {
    // These are undeclared fields
    this.u;
    this.n = 12;
    this.x = this.a;
  }
}
