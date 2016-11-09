
class A {
  e: number = 8;
  f: any;
  static g: boolean = true;
  static h: any;
  b: boolean;
  z: number;
  w: any;
  n: any = 12;
  o: any;
  m: any;
  c: number;
  d: string;

  // These are undeclared fields
  u: any;
  x: any;

  constructor(public a: number) {
    let y = 1;
    this.z = y + 1;
    this.w.bar = 'bar';
    baz.v = 1;
    this.n = 13;
    this.m = () => {
      this.o = 'ooo';
    };
  }

  foo() {
    this.c = 4;
    this.n = 14;
    this.x = this.a;
  }
}
