export class SomeClass {
  // TODO(ahafiz): elide the any here, leaving inference of the type to TS. If
  // we have an RHS, tsc will likely find a better type than `any`.
  static staticPropNoJsDoc: any = 0;

  static readonly staticPropWithJsDoc: number = 0;

  static readonly staticPropWithJsDocAndNonTrivialInit: number = 1 + 1;

  static readonly staticPropWithConstAndNoType: any = 0;
}
