export class A {
  e: number = 8;
  f: any;
  static g: boolean = true;
  static h: any;

  b: boolean;
  z: number;

  w: any;

  n: any = 12;

  a: any;
  fieldSetFromArrowFunc: any;
  arrowFuncField: any;

  functionResultField: any;
  c: number;
  d: string;
  x: any;
  // These are undeclared fields
  u: any;
  constructor(public parameterProp: number, objectParam: {
    foo: {bar: () => number}
  }) {
    let y = 1;
    this.z = y + 1;
    this.w.bar = 'bar';
    this.n = 13;

    this.arrowFuncField = () => {
      this.fieldSetFromArrowFunc = 'f';
    };
    this.functionResultField = objectParam.foo.bar();
  }

  foo() {
    this.c = 4;

    this.n = 14;
    this.x = this.a;
  }
}
