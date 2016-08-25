declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class Error extends Error_Instance {
  }
  class Error_Instance extends GlobalError {
    constructor ( ) ;
  }
  interface ExtendsIThenable extends PromiseLike < any > {
  }
  class ExtendsXMLHttpRequest extends ExtendsXMLHttpRequest_Instance {
  }
  class ExtendsXMLHttpRequest_Instance extends XMLHttpRequest {
  }
  var a : { a : number } ;
  var b : IArguments ;
  var c : NodeList ;
  function elementMaybe ( ) : Element | null ;
  var myScope : ಠ_ಠ.clutz.namespace.Foo ;
  function topLevelFunction ( ...a : any [] ) : any ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'typesWithExterns'): typeof ಠ_ಠ.clutz.typesWithExterns;
}
declare module 'goog:typesWithExterns' {
  import alias = ಠ_ಠ.clutz.typesWithExterns;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    constructor (n : number ) ;
    apply : number ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'typesWithExterns.A'): typeof ಠ_ಠ.clutz.typesWithExterns.A;
}
declare module 'goog:typesWithExterns.A' {
  import alias = ಠ_ಠ.clutz.typesWithExterns.A;
  export default alias;
}
/* skipped emitting type alias typesWithExterns.ArrayLike to avoid collision with existing one in lib.d.ts. */
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.typesWithExterns.A_Instance {
    constructor ( ) ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'typesWithExterns.B'): typeof ಠ_ಠ.clutz.typesWithExterns.B;
}
declare module 'goog:typesWithExterns.B' {
  import alias = ಠ_ಠ.clutz.typesWithExterns.B;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class C extends C_Instance {
  }
  class C_Instance extends ಠ_ಠ.clutz.typesWithExterns.A_Instance {
    constructor ( ) ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'typesWithExterns.C'): typeof ಠ_ಠ.clutz.typesWithExterns.C;
}
declare module 'goog:typesWithExterns.C' {
  import alias = ಠ_ಠ.clutz.typesWithExterns.C;
  export default alias;
}
/** Insert general_with_platform.d.ts here */
declare namespace ಠ_ಠ.clutz {
  function functionNamespace (descriptor : { is : string } ) : any ;
}
declare namespace ಠ_ಠ.clutz.functionNamespace {
  function dom (nodeOrEvent : Node | null | GlobalEvent ) : functionNamespaceHelperClass ;
}
declare namespace ಠ_ಠ.clutz.functionNamespace {
  class privateClass extends privateClass_Instance {
  }
  class privateClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class functionNamespaceHelperClass extends functionNamespaceHelperClass_Instance {
  }
  class functionNamespaceHelperClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.namespace {
  class Foo extends Foo_Instance {
    static staticField : string ;
    static staticMethod ( ) : string ;
  }
  class Foo_Instance {
    private noStructuralTyping_: any;
    member : string ;
    method (opt_exp ? : (a : ಠ_ಠ.clutz.namespace.Foo ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz.namespace {
  type atypedef = (a : string , b ? : ಠ_ಠ.clutz.namespace.atypedef.Options ) => ಠ_ಠ.clutz.namespace.atypedef.Cache < any > ;
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  class Cache < T > extends Cache_Instance < T > {
  }
  class Cache_Instance < T > {
    private noStructuralTyping_: any;
    destroy ( ) : any ;
    get (key : string ) : T ;
    info ( ) : ಠ_ಠ.clutz.namespace.atypedef.Cache.Info ;
    put (key : string , value : T ) : any ;
    remove (key : string ) : any ;
    removeAll ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef.Cache {
  type Info = { id : string , options : ಠ_ಠ.clutz.namespace.atypedef.Options , size : number } ;
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  type Options = { capacity ? : number } ;
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  type get = (a : string ) => ಠ_ಠ.clutz.namespace.atypedef.Cache < any > | null ;
}
declare namespace ಠ_ಠ.clutz.namespace {
  function bootstrap (arg1 : Element | null | HTMLDocument , opt_arg2 ? : ( string | Function | null ) [] | null ) : any ;
}
