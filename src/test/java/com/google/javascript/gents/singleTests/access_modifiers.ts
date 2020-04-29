export class A {
  // Static field access
  protected static sa: number;
  private static sb: number;
  static readonly constStatic: number = 0;

  // Field access
  a: number = 0;
  b: number = 0;
  c: number = 0;
  protected d: number = 0;
  private e: number = 0;

  // Const versions
  readonly justConst: number = 0;
  readonly publicConst: number = 0;
  protected readonly protectedConst: number = 0;
  private readonly privateConst: number = 0;

  // Method access
  foo() {}

  protected bar() {}

  private baz() {}

  // Static method access
  static fizzbuzz() {}

  protected static fizz() {}

  private static buzz() {}
}
