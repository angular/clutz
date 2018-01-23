declare namespace ಠ_ಠ.clutz {
  interface module$exports$generics$ExtendGenericInterface < TYPE > extends ಠ_ಠ.clutz.module$exports$generics$GenericInterface < TYPE > {
  }
  class module$exports$generics$ExtendsGenericClass < TYPE > extends module$exports$generics$ExtendsGenericClass_Instance < TYPE > {
  }
  class module$exports$generics$ExtendsGenericClass_Instance < TYPE > extends ಠ_ಠ.clutz.module$exports$generics$Foo_Instance < TYPE , number > {
    constructor ( ) ;
  }
  class module$exports$generics$Foo < T , U > extends module$exports$generics$Foo_Instance < T , U > {
  }
  class module$exports$generics$Foo_Instance < T , U > {
    private noStructuralTyping_: any;
    constructor (a : number ) ;
    get ( ) : T ;
    loop < V , W > (t : T , v : V ) : any ;
    set (t : T ) : void ;
  }
  interface module$exports$generics$GenericInterface < TYPE > {
  }
  class module$exports$generics$ImplementsGenericInterface < TYPE > extends module$exports$generics$ImplementsGenericInterface_Instance < TYPE > {
  }
  class module$exports$generics$ImplementsGenericInterface_Instance < TYPE > implements ಠ_ಠ.clutz.module$exports$generics$GenericInterface < TYPE > {
    private noStructuralTyping_: any;
  }
  var module$exports$generics$arrayMissingTypeParam : any [] ;
  var module$exports$generics$fooMissingAllTypeParams : ಠ_ಠ.clutz.module$exports$generics$Foo < any , any > ;
  var module$exports$generics$fooMissingOneTypeParam : ಠ_ಠ.clutz.module$exports$generics$Foo < string , any > ;
  function module$exports$generics$genericFunction < T > (a : T ) : T ;
  function module$exports$generics$identity < T > (a : T ) : T ;
  function module$exports$generics$objectWithGenericKeyType < K , V > (obj : { [ /* warning: coerced from K */ key: string ]: V } ) : void ;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import ExtendGenericInterface = ಠ_ಠ.clutz.module$exports$generics$ExtendGenericInterface;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import ExtendsGenericClass = ಠ_ಠ.clutz.module$exports$generics$ExtendsGenericClass;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import Foo = ಠ_ಠ.clutz.module$exports$generics$Foo;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import GenericInterface = ಠ_ಠ.clutz.module$exports$generics$GenericInterface;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import ImplementsGenericInterface = ಠ_ಠ.clutz.module$exports$generics$ImplementsGenericInterface;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import arrayMissingTypeParam = ಠ_ಠ.clutz.module$exports$generics$arrayMissingTypeParam;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import fooMissingAllTypeParams = ಠ_ಠ.clutz.module$exports$generics$fooMissingAllTypeParams;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import fooMissingOneTypeParam = ಠ_ಠ.clutz.module$exports$generics$fooMissingOneTypeParam;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import genericFunction = ಠ_ಠ.clutz.module$exports$generics$genericFunction;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import identity = ಠ_ಠ.clutz.module$exports$generics$identity;
}
declare namespace ಠ_ಠ.clutz.module$exports$generics {
  export import objectWithGenericKeyType = ಠ_ಠ.clutz.module$exports$generics$objectWithGenericKeyType;
}
declare module 'goog:generics' {
  import alias = ಠ_ಠ.clutz.module$exports$generics;
  export = alias;
}
