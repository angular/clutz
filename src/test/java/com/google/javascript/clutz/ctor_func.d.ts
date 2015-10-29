declare namespace ಠ_ಠ.clutz_internal.ctor_func {
  class Ctor < T > {
    constructor (a : string , b : number ) ;
  }
  var ctorFuncField : { new (a : string , b : number ) : Ctor < any > } ;
  function ctorFuncParam (ctor : { new (a : number ) : Ctor < any > } ) : void ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'ctor_func'): typeof ಠ_ಠ.clutz_internal.ctor_func;
}
declare module 'goog:ctor_func' {
  import alias = ಠ_ಠ.clutz_internal.ctor_func;
  export = alias;
}
