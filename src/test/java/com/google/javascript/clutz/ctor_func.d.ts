declare namespace ಠ_ಠ.clutz.ctor_func {
  class Ctor < T > {
    private noStructuralTyping_: any;
    constructor (a : string , b : number ) ;
  }
  var ctorFuncField : { new (a : string , b : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ;
  function ctorFuncParam (ctor : { new (a : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ) : void ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'ctor_func'): typeof ಠ_ಠ.clutz.ctor_func;
}
declare module 'goog:ctor_func' {
  import alias = ಠ_ಠ.clutz.ctor_func;
  export = alias;
}
