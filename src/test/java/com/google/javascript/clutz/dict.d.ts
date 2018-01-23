declare namespace ಠ_ಠ.clutz {
  class module$exports$dict$ClassWithDottedProperties extends module$exports$dict$ClassWithDottedProperties_Instance {
  }
  class module$exports$dict$ClassWithDottedProperties_Instance {
    private noStructuralTyping_: any;
    [ key: string ]: any ;
    foo : number ;
  }
  class module$exports$dict$DictClass extends module$exports$dict$DictClass_Instance {
  }
  class module$exports$dict$DictClass_Instance {
    private noStructuralTyping_: any;
    constructor (n : any ) ;
    [ key: string ]: any ;
    foo ( ) : void ;
  }
  var module$exports$dict$typed : { a : Function | null } ;
  var module$exports$dict$untyped : {[key: string]: any} ;
}
declare namespace ಠ_ಠ.clutz.module$exports$dict {
  export import ClassWithDottedProperties = ಠ_ಠ.clutz.module$exports$dict$ClassWithDottedProperties;
}
declare namespace ಠ_ಠ.clutz.module$exports$dict {
  export import DictClass = ಠ_ಠ.clutz.module$exports$dict$DictClass;
}
declare namespace ಠ_ಠ.clutz.module$exports$dict {
  export import typed = ಠ_ಠ.clutz.module$exports$dict$typed;
}
declare namespace ಠ_ಠ.clutz.module$exports$dict {
  export import untyped = ಠ_ಠ.clutz.module$exports$dict$untyped;
}
declare module 'goog:dict' {
  import alias = ಠ_ಠ.clutz.module$exports$dict;
  export = alias;
}
