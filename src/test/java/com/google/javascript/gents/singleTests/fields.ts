
class A {
  e: number = 8;
  f: any;
  static g: boolean = true;
  static h: any;
  b: boolean;
  z: number;
  w: any;
  n: any = 12;
  fieldSetFromArrowFunc: any;
  arrowFuncField: any;
  functionResultField: any;
  c: number;
  d: string;

  // These are undeclared fields
  u: any;
  x: any;

  constructor(public parameterProp: number, objectParam: Object) {
    let y = 1;
    this.z = y + 1;
    this.w.bar = 'bar';
    baz.v = 1;
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
