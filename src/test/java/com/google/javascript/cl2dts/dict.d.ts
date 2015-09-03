declare namespace ಠ_ಠ.cl2dts_internal.dict {
  var untyped : {[key: string]: any} ;
  var typed : { a : ( ...a : any [] ) => any } ;
  class DictClass {
    constructor (n : any ) ;
    [key: string]: any;
    foo ( ) : void ;
  }
  class ClassWithDottedProperties {
    [key: string]: any;
    foo : number ;
  }
}
declare module 'goog:dict' {
  import alias = ಠ_ಠ.cl2dts_internal.dict;
  export = alias;
}
