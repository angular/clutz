// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.js
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class Error extends GlobalError {
    private noStructuralTyping_typesWithExterns_Error : any;
    constructor ( ) ;
  }
  interface ExtendsIThenable extends PromiseLike < any > {
  }
  class ExtendsXMLHttpRequest extends XMLHttpRequest {
    private noStructuralTyping_typesWithExterns_ExtendsXMLHttpRequest : any;
  }
  let a : { a : number } ;
  let b : IArguments ;
  let c : NodeList ;
  let d : MessageEvent ;
  let e : NamedNodeMap ;
  function elementMaybe ( ) : GlobalElement | null ;
  let myScope : ಠ_ಠ.clutz.namespace.Foo ;
  function topLevelFunction ( ...a : any [] ) : any ;
}
declare module 'goog:typesWithExterns' {
  import typesWithExterns = ಠ_ಠ.clutz.typesWithExterns;
  export = typesWithExterns;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.js
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class A {
    private noStructuralTyping_typesWithExterns_A : any;
    constructor (n : number ) ;
    apply : number ;
  }
}
declare module 'goog:typesWithExterns.A' {
  import A = ಠ_ಠ.clutz.typesWithExterns.A;
  export default A;
}
/* skipped emitting type alias typesWithExterns.ArrayLike to avoid collision with existing one in lib.d.ts. */
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.js
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class B extends ಠ_ಠ.clutz.typesWithExterns.A {
    private noStructuralTyping_typesWithExterns_B : any;
    constructor ( ) ;
  }
}
declare module 'goog:typesWithExterns.B' {
  import B = ಠ_ಠ.clutz.typesWithExterns.B;
  export default B;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.js
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class C extends ಠ_ಠ.clutz.typesWithExterns.A {
    private noStructuralTyping_typesWithExterns_C : any;
    constructor ( ) ;
  }
}
declare module 'goog:typesWithExterns.C' {
  import C = ಠ_ಠ.clutz.typesWithExterns.C;
  export default C;
}
/** Insert general_with_platform.d.ts here */
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz {
  function functionNamespace (descriptor : { is : string } ) : any ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.functionNamespace {
  function dom (nodeOrEvent : Node | null | GlobalEvent ) : functionNamespaceHelperClass ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.functionNamespace {
  class privateClass {
    private noStructuralTyping_functionNamespace_privateClass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz {
  class functionNamespaceHelperClass {
    private noStructuralTyping_functionNamespaceHelperClass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace {
  class Foo {
    private noStructuralTyping_namespace_Foo : any;
    member : string ;
    method (opt_exp ? : (a : ಠ_ಠ.clutz.namespace.Foo ) => any ) : any ;
    static staticField : string ;
    static staticMethod ( ) : string ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace {
  type atypedef = (a : string , b ? : ಠ_ಠ.clutz.namespace.atypedef.Options ) => ಠ_ಠ.clutz.namespace.atypedef.Cache < any > ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  class Cache < T > {
    private noStructuralTyping_namespace_atypedef_Cache : any;
    destroy ( ) : any ;
    get (key : string ) : T ;
    info ( ) : ಠ_ಠ.clutz.namespace.atypedef.Cache.Info ;
    put (key : string , value : T ) : any ;
    remove (key : string ) : any ;
    removeAll ( ) : any ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace.atypedef.Cache {
  type Info = { id : string , options : ಠ_ಠ.clutz.namespace.atypedef.Options , size : number } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  type Options = { capacity ? : number } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  type get = (a : string ) => ಠ_ಠ.clutz.namespace.atypedef.Cache < any > | null ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/types_externs_with_platform.externs.js
declare namespace ಠ_ಠ.clutz.namespace {
  function bootstrap (arg1 : GlobalElement | null | HTMLDocument , opt_arg2 ? : ( string | Function | null ) [] | null ) : any ;
}
