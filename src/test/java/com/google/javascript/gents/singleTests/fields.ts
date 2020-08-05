export class A {
  e: number = 8;
  f: any;
  static g: boolean = true;
  static h: any;

  b: boolean;
  z: number;

  w: any;

  n = 12;

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

function f(a: {string: any}[]) {}

let bar = null;

const x = {
  foo: (/* my fun comment */
        null as string | null),
  'foo2': (null as string | null),
  ['foo3']: (null as string | null),
  0: (null as string | null),
  bar: (bar as string | null),
};
