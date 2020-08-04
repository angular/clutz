export interface InterfaceClass {
  a?: boolean;
}

export interface RecordClass {
  foo?: number|string;
}

export class Klass {
  private foo?: string;
  private bar?: string;
  /**
   * TODO(lukemizuhashi): bar = undefined should become bar?: string
   */
  constructor(foo?: string, bar: string|undefined = undefined) {
    this.foo = foo;

    this.bar = bar;
  }
}
