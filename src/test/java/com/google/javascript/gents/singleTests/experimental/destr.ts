export class C {
  private a: number;
  private b: number;
  /**
   * @param c with default
   */
  constructor(
      {a}: {a: number}, {b} = {b: 1}, private c: number = 0,
      private d: number) {
    this.a = a;

    this.b = b;
  }
}

let {x = 0} = {};
