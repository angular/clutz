declare namespace ಠ_ಠ.clutz_internal.ctor_func {
  class Ctor {
    constructor (a : string , b : number ) ;
  }
  var ctorFuncField : { new (a : string , b : number ) : Ctor } ;
  function ctorFuncParam (ctor : { new (a : number ) : Ctor } ) : void ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'ctor_func'): typeof ಠ_ಠ.clutz_internal.ctor_func;
}
declare module 'goog:ctor_func' {
  import alias = ಠ_ಠ.clutz_internal.ctor_func;
  export = alias;
}
