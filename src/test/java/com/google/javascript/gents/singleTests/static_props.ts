export class SomeClass {
  static staticPropNoJsDoc = 0;

  static readonly staticPropWithJsDoc: number = 0;

  static readonly staticPropWithJsDocAndNonTrivialInit: number = 1 + 1;

  static readonly staticPropWithConstAndNoType = 0;
}
