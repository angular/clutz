export class SomeClass {
  static staticPropWithJsDoc: number = 0;
  static staticPropWithJsDocAndNonTrivialInit: number;
}
SomeClass.staticPropNoJsDoc = 0;
SomeClass.staticPropWithJsDocAndNonTrivialInit = 1 + 1;
SomeClass.inferred = 0;
