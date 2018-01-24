declare namespace ಠ_ಠ.clutz.module$exports$typesWithExterns {
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
  var myScope : ಠ_ಠ.clutz.module$exports$namespace$Foo ;
  function topLevelFunction ( ...a : any [] ) : any ;
}
declare module 'goog:typesWithExterns' {
  import alias = ಠ_ಠ.clutz.module$exports$typesWithExterns;
  export = alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$typesWithExterns$A extends module$exports$typesWithExterns$A_Instance {
  }
  class module$exports$typesWithExterns$A_Instance {
    private noStructuralTyping_: any;
    constructor (n : number ) ;
    apply : number ;
  }
}
declare module 'goog:typesWithExterns.A' {
  import alias = ಠ_ಠ.clutz.module$exports$typesWithExterns$A;
  export default alias;
}
/* skipped emitting type alias typesWithExterns.ArrayLike to avoid collision with existing one in lib.d.ts. */
declare namespace ಠ_ಠ.clutz {
  class module$exports$typesWithExterns$B extends module$exports$typesWithExterns$B_Instance {
  }
  class module$exports$typesWithExterns$B_Instance extends ಠ_ಠ.clutz.module$exports$typesWithExterns$A_Instance {
    constructor ( ) ;
  }
}
declare module 'goog:typesWithExterns.B' {
  import alias = ಠ_ಠ.clutz.module$exports$typesWithExterns$B;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$typesWithExterns$C extends module$exports$typesWithExterns$C_Instance {
  }
  class module$exports$typesWithExterns$C_Instance extends ಠ_ಠ.clutz.module$exports$typesWithExterns$A_Instance {
    constructor ( ) ;
  }
}
declare module 'goog:typesWithExterns.C' {
  import alias = ಠ_ಠ.clutz.module$exports$typesWithExterns$C;
  export default alias;
}
/** Insert general_with_platform.d.ts here */
declare namespace ಠ_ಠ.clutz {
  function module$exports$functionNamespace (descriptor : { is : string } ) : any ;
}
declare namespace ಠ_ಠ.clutz {
  function module$exports$functionNamespace$dom (nodeOrEvent : Node | null | GlobalEvent ) : ಠ_ಠ.clutz.module$exports$functionNamespaceHelperClass ;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$functionNamespace$privateClass extends module$exports$functionNamespace$privateClass_Instance {
  }
  class module$exports$functionNamespace$privateClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$functionNamespaceHelperClass extends module$exports$functionNamespaceHelperClass_Instance {
  }
  class module$exports$functionNamespaceHelperClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$namespace$Foo extends module$exports$namespace$Foo_Instance {
    static staticField : string ;
    static staticMethod ( ) : string ;
  }
  class module$exports$namespace$Foo_Instance {
    private noStructuralTyping_: any;
    member : string ;
    method (opt_exp ? : (a : ಠ_ಠ.clutz.module$exports$namespace$Foo ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$namespace$atypedef = (a : string , b ? : ಠ_ಠ.clutz.module$exports$namespace$atypedef$Options ) => ಠ_ಠ.clutz.module$exports$namespace$atypedef$Cache < any > ;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$namespace$atypedef$Cache < T > extends module$exports$namespace$atypedef$Cache_Instance < T > {
  }
  class module$exports$namespace$atypedef$Cache_Instance < T > {
    private noStructuralTyping_: any;
    destroy ( ) : any ;
    get (key : string ) : T ;
    info ( ) : ಠ_ಠ.clutz.module$exports$namespace$atypedef$Cache$Info ;
    put (key : string , value : T ) : any ;
    remove (key : string ) : any ;
    removeAll ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$namespace$atypedef$Cache$Info = { id : string , options : ಠ_ಠ.clutz.module$exports$namespace$atypedef$Options , size : number } ;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$namespace$atypedef$Options = { capacity ? : number } ;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$namespace$atypedef$get = (a : string ) => ಠ_ಠ.clutz.module$exports$namespace$atypedef$Cache < any > | null ;
}
declare namespace ಠ_ಠ.clutz {
  function module$exports$namespace$bootstrap (arg1 : Element | null | HTMLDocument , opt_arg2 ? : ( string | Function | null ) [] | null ) : any ;
}
