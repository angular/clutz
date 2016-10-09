/** Possibly outdated information about Klass. */
export class Klass {
  n: any;
  x: any = 4;
  constructor(n: number) {
    this.n = n;
  }

  foo(): boolean {
    return false;
  }

  static myStaticFunction(): string {
    return '';
  }
};
