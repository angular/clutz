declare namespace ಠ_ಠ.clutz.ctor_func {
  class Ctor < T > extends Ctor_Instance < T > {
  }
  class Ctor_Instance < T > {
    private noStructuralTyping_: any;
    constructor (a : string , b : number ) ;
  }
  let ctorFuncField : { new (a : string , b : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ;
  let ctorFuncFieldAlias : { new (a : string , b : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ;
  function ctorFuncParam (ctor : { new (a : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ) : void ;
}
declare module 'goog:ctor_func' {
  import ctor_func = ಠ_ಠ.clutz.ctor_func;
  export = ctor_func;
}
