export class C {
  private a: number;
  private b: number;
  /**
   * @param c with default
   */
  constructor(
      {a}: {a: number}, {b}: {b: number} = {b: 1}, private c: number = 0,
      private d: number) {
    this.a = a;

    this.b = b;
  }
}

let {x = 0} = {};

function concat4(
    [a, b, c, d]: string[], [prefix, suffix]: string[] = ['', '']): string {
  return prefix + a + b + c + d + suffix;
}

let [y = 0] = [];
