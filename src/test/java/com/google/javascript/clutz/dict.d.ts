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
  let typed : { a : Function | null } ;
  let untyped : {[key: string]: any} ;
}
declare module 'goog:dict' {
  import dict = ಠ_ಠ.clutz.dict;
  export = dict;
}
