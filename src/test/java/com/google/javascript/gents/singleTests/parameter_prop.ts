type Foo = string;

class A {
  b: any;
  c: number;

  constructor(
      public a: number, b: number, c,
      private readonly parameterPropWithInferredType: Foo) {
    this.b = b;
    this.c = c;
  }
}

class B {
  constructor(
      public a: number, public b: number, protected c: number,
      private d: number, public readonly e: number) {}
}
