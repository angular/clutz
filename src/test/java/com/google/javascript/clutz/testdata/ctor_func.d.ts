// Generated from src/test/java/com/google/javascript/clutz/testdata/ctor_func.js
declare namespace ಠ_ಠ.clutz.ctor_func {
  class Ctor < T = any > {
    private noStructuralTyping_ctor_func_Ctor : [ T ];
    constructor (a : string , b : number ) ;
  }
  let ctorFuncField : { new (a : string , b : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ;
  let ctorFuncFieldAlias : { new (a : string , b : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ;
  function ctorFuncParam (ctor : { new (a : number ) : ಠ_ಠ.clutz.ctor_func.Ctor < any > } ) : void ;
  function ctorFuncParamTemplatized < T = any > (ctor : { new (a : number ) : T } ) : T ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/ctor_func.js
declare module 'goog:ctor_func' {
  import ctor_func = ಠ_ಠ.clutz.ctor_func;
  export = ctor_func;
}
