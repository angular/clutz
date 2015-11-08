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
  var myScope : ಠ_ಠ.clutz_internal.angular.Scope ;
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
    private noStructuralTyping_: any;
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
  class B extends ಠ_ಠ.clutz_internal.typesWithExterns.A {
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
  class C extends ಠ_ಠ.clutz_internal.typesWithExterns.A {
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
  type $cacheFactory = (a : string , b ? : { capacity : number } ) => ಠ_ಠ.clutz_internal.angular.$cacheFactory.Cache < any > ;
  class $injector {
    private noStructuralTyping_: any;
  }
  class Scope {
    private noStructuralTyping_: any;
    $$phase : string ;
    $apply (opt_exp ? : string | ( (a : ಠ_ಠ.clutz_internal.angular.Scope ) => any ) ) : any ;
    $applyAsync (opt_exp ? : string | ( (a : ಠ_ಠ.clutz_internal.angular.Scope ) => any ) ) : any ;
  }
  function bootstrap (element : Element | HTMLDocument , opt_modules ? : ( string | ( ( ...a : any [] ) => any ) ) [] ) : ಠ_ಠ.clutz_internal.angular.$injector ;
}
declare namespace ಠ_ಠ.clutz_internal.angular.$cacheFactory {
  type get = (a : string ) => ಠ_ಠ.clutz_internal.angular.$cacheFactory.Cache < any > ;
}
declare namespace ಠ_ಠ.clutz_internal.angular.$cacheFactory {
  type Options = { capacity : number } ;
}
declare namespace ಠ_ಠ.clutz_internal.angular.$cacheFactory {
  class Cache < T > {
    private noStructuralTyping_: any;
    destroy ( ) : any ;
    get (key : string ) : T ;
    info ( ) : { id : string , options : { capacity : number } , size : number } ;
    put (key : string , value : T ) : any ;
    remove (key : string ) : any ;
    removeAll ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.angular.$cacheFactory.Cache {
  type Info = { id : string , options : { capacity : number } , size : number } ;
}
