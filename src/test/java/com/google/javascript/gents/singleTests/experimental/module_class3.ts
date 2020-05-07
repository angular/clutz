/** Possibly outdated information about Klass. */
export class Klass {
  n: any;
  x: any = 4;
  constructor(n: number, public readonly list: any[] = []) {
    this.n = n;
  }

  foo(): boolean {
    return false;
  }

  static myStaticFunction(): string {
    return '';
  }
}
