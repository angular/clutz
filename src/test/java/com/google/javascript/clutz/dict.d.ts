declare namespace ಠ_ಠ.clutz.dict {
  class ClassWithDottedProperties {
    private noStructuralTyping_: any;
    [key: string]: any;
    foo : number ;
  }
  class DictClass {
    private noStructuralTyping_: any;
    constructor (n : any ) ;
    [key: string]: any;
    foo ( ) : void ;
  }
  var typed : { a : ( ...a : any [] ) => any } ;
  var untyped : {[key: string]: any} ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'dict'): typeof ಠ_ಠ.clutz.dict;
}
declare module 'goog:dict' {
  import alias = ಠ_ಠ.clutz.dict;
  export = alias;
}
