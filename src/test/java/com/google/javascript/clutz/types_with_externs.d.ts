declare namespace ಠ_ಠ.clutz_internal.typesWithExterns {
  type ArrayLike = NodeList | IArguments | { length : number } ;
  class Error extends GlobalError {
  }
  interface ExtendsIThenable extends PromiseLike < any > {
  }
  var a : { a : number } ;
  var b : IArguments ;
  var c : NodeList | IArguments | { length : number } ;
  function elementMaybe ( ) : Element ;
  function id (x : NodeList | IArguments | { length : number } ) : NodeList | IArguments | { length : number } ;
  function topLevelFunction ( ...a : any [] ) : any ;
}
declare module 'goog:typesWithExterns' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns;
  export = alias;
}
declare namespace ಠ_ಠ.clutz_internal.typesWithExterns {
  class A {
    constructor (n : number ) ;
    apply : number ;
  }
}
declare module 'goog:typesWithExterns.A' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.typesWithExterns {
  class B extends A {
  }
}
declare module 'goog:typesWithExterns.B' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns.B;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.typesWithExterns {
  class C extends A {
  }
}
declare module 'goog:typesWithExterns.C' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns.C;
  export default alias;
}
