export class Base {
  a: string = '';
  constructor() {}
}

export class D extends Base {
  // D overwrites a property coming from the base class.
  a: any;
  constructor(a: string) {
    super();
    this.a = a + '!!!';
  }
}
