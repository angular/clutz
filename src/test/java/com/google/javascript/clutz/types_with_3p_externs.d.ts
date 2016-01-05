declare namespace ಠ_ಠ.clutz.typesWithExterns {
  type ArrayLike = NodeList | IArguments | { length : number } ;
  class Error extends Error_Instance {
  }
  class Error_Instance extends GlobalError {
  }
  interface ExtendsIThenable extends PromiseLike < any > {
  }
  var a : { a : number } ;
  var b : IArguments ;
  var c : NodeList | IArguments | { length : number } ;
  function elementMaybe ( ) : Element ;
  function id (x : NodeList | IArguments | { length : number } ) : NodeList | IArguments | { length : number } ;
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
declare namespace ಠ_ಠ.clutz.typesWithExterns {
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.typesWithExterns.A_Instance {
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
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'typesWithExterns.C'): typeof ಠ_ಠ.clutz.typesWithExterns.C;
}
declare module 'goog:typesWithExterns.C' {
  import alias = ಠ_ಠ.clutz.typesWithExterns.C;
  export default alias;
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
  type atypedef = (a : string , b ? : { capacity : number } ) => ಠ_ಠ.clutz.namespace.atypedef.Cache < any > ;
  function bootstrap (arg1 : Element | HTMLDocument , opt_arg2 ? : ( string | ( ( ...a : any [] ) => any ) ) [] ) : any ;
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  type get = (a : string ) => ಠ_ಠ.clutz.namespace.atypedef.Cache < any > ;
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  type Options = { capacity : number } ;
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef {
  class Cache < T > extends Cache_Instance < T > {
  }
  class Cache_Instance < T > {
    private noStructuralTyping_: any;
    destroy ( ) : any ;
    get (key : string ) : T ;
    info ( ) : { id : string , options : { capacity : number } , size : number } ;
    put (key : string , value : T ) : any ;
    remove (key : string ) : any ;
    removeAll ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz.namespace.atypedef.Cache {
  type Info = { id : string , options : { capacity : number } , size : number } ;
}
declare namespace ಠ_ಠ.clutz.namespace.subNamespace {
  var fieldA : string ;
}
declare namespace ಠ_ಠ.clutz.namespace.subNamespace {
  var fieldB : number ;
}
declare namespace ಠ_ಠ.clutz {
  function FunctionNamespace (descriptor : { is : string } ) : any ;
}
declare namespace ಠ_ಠ.clutz {
  class FunctionNamespaceHelperClass extends FunctionNamespaceHelperClass_Instance {
  }
  class FunctionNamespaceHelperClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.FunctionNamespace {
  function dom (nodeOrEvent : Node | Event ) : FunctionNamespaceHelperClass ;
}
declare namespace ಠ_ಠ.clutz {
  class ClassNamespace extends ClassNamespace_Instance {
    //!! Should be {num : number} instead of object. Will be fixed with #202.
    static constObj : Object ;
  }
  class ClassNamespace_Instance {
    private noStructuralTyping_: any;
  }
}
