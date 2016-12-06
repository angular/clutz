
/** Possibly outdated information about Klass. */
export class Klass {
  n: any;
  list: any[];
  x: any = 4;

  constructor(n: number, list = []) {
    this.n = n;
    this.list = list;
  }

  foo(): boolean {
    return false;
  }

  static myStaticFunction(): string {
    return '';
  }
}
