declare namespace ಠ_ಠ.clutz_internal.dict {
  class ClassWithDottedProperties {
    [key: string]: any;
    foo : number ;
  }
  class DictClass {
    constructor (n : any ) ;
    [key: string]: any;
    foo ( ) : void ;
  }
  var typed : { a : ( ...a : any [] ) => any } ;
  var untyped : {[key: string]: any} ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'dict'): typeof ಠ_ಠ.clutz_internal.dict;
}
declare module 'goog:dict' {
  import alias = ಠ_ಠ.clutz_internal.dict;
  export = alias;
}
