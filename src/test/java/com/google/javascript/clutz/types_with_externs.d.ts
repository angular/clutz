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
  var myScope : angular.Scope ;
  function topLevelFunction ( ...a : any [] ) : any ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'typesWithExterns'): typeof ಠ_ಠ.clutz_internal.typesWithExterns;
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
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'typesWithExterns.A'): typeof ಠ_ಠ.clutz_internal.typesWithExterns.A;
}
declare module 'goog:typesWithExterns.A' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.typesWithExterns {
  class B extends A {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'typesWithExterns.B'): typeof ಠ_ಠ.clutz_internal.typesWithExterns.B;
}
declare module 'goog:typesWithExterns.B' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns.B;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.typesWithExterns {
  class C extends A {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'typesWithExterns.C'): typeof ಠ_ಠ.clutz_internal.typesWithExterns.C;
}
declare module 'goog:typesWithExterns.C' {
  import alias = ಠ_ಠ.clutz_internal.typesWithExterns.C;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.angular {
  class $injector {
  }
  class Scope {
    $$phase : string ;
    $apply (opt_exp ? : string | ( (a : Scope ) => any ) ) : any ;
    $applyAsync (opt_exp ? : string | ( (a : Scope ) => any ) ) : any ;
  }
  function bootstrap (element : Element | HTMLDocument , opt_modules ? : string | ( ( ...a : any [] ) => any ) [] ) : $injector ;
}
