export class A {
  // Static field access
  protected static sa: number;
  private static sb: number;
  // Field access
  a: number = 0;
  b: number = 0;
  c: number = 0;
  protected d: number = 0;
  private e: number = 0;
  // Method access
  foo() {}

  protected bar() {}

  private baz() {}
  // Static method access
  static fizzbuzz() {}

  protected static fizz() {}

  private static buzz() {}
}
