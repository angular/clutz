declare namespace ಠ_ಠ.cl2dts_internal.typesWithExterns {
  class A {
    constructor (n : number ) ;
    apply : number ;
  }
}
declare module 'goog:typesWithExterns.A' {
  import alias = ಠ_ಠ.cl2dts_internal.typesWithExterns.A;
  export default alias;
}
declare namespace ಠ_ಠ.cl2dts_internal.typesWithExterns {
  function elementMaybe ( ) : Element ;
  var a : { a : number } ;
  var b : IArguments ;
  type ArrayLike = NodeList | IArguments | { length : number } ;
  var c : NodeList | IArguments | { length : number } ;
  function id (x : NodeList | IArguments | { length : number } ) : NodeList | IArguments | { length : number } ;
  function topLevelFunction ( ...a : any [] ) : any ;
  interface extendsIThenable extends PromiseLike < any > {
  }
}
declare module 'goog:typesWithExterns' {
  import alias = ಠ_ಠ.cl2dts_internal.typesWithExterns;
  export = alias;
}
declare namespace ಠ_ಠ.cl2dts_internal.typesWithExterns {
  class B extends A {
  }
}
declare module 'goog:typesWithExterns.B' {
  import alias = ಠ_ಠ.cl2dts_internal.typesWithExterns.B;
  export default alias;
}
declare namespace ಠ_ಠ.cl2dts_internal.typesWithExterns {
  class C extends A {
  }
}
declare module 'goog:typesWithExterns.C' {
  import alias = ಠ_ಠ.cl2dts_internal.typesWithExterns.C;
  export default alias;
}
