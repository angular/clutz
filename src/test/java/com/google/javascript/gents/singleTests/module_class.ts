class klass {
  n: number;
  static x: number = 4;
  constructor(n: number) { this.n = n; }
  foo(): boolean { return false; }
}
export const C = klass;
