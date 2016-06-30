declare namespace ಠ_ಠ.clutz.dict {
  class ClassWithDottedProperties extends ClassWithDottedProperties_Instance {
  }
  class ClassWithDottedProperties_Instance {
    private noStructuralTyping_: any;
    [ key: string ]: any ;
    foo : number ;
  }
  class DictClass extends DictClass_Instance {
  }
  class DictClass_Instance {
    private noStructuralTyping_: any;
    constructor (n : any ) ;
    [ key: string ]: any ;
    foo ( ) : void ;
  }
  var typed : { a : Function | null } ;
  var untyped : {[key: string]: any} ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'dict'): typeof ಠ_ಠ.clutz.dict;
}
declare module 'goog:dict' {
  import alias = ಠ_ಠ.clutz.dict;
  export = alias;
}
