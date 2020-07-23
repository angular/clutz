export class MyClass {
  static I: any;

  static IEs6: any;

  static IEs5: any;
}

MyClass.I = class {
  a: string;
  constructor() {}
};
/**
 * Inner interface writen in ES6 style.
 * Currently not translated well.
 */
MyClass.IEs6 = class {
  a: string;
  constructor() {}
};
/**
 * Inner interface writen in ES5 style.
 * Currently not translated well.
 */
MyClass.IEs5 = interface {
  a: string;
};
