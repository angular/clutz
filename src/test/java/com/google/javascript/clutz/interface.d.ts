declare namespace ಠ_ಠ.clutz {
  interface module$exports$interface_exp {
    method ( ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$interface_exp {
  class SomeClazz extends SomeClazz_Instance {
  }
  class SomeClazz_Instance {
    private noStructuralTyping_: any;
  }
  function staticMethod ( ) : number ;
  var staticProp : number ;
}
declare module 'goog:interface_exp' {
  import alias = ಠ_ಠ.clutz.module$exports$interface_exp;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$interface_exp$SomeEnum {
    A ,
    B ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$interface_exp {
  export import SomeEnum =  ಠ_ಠ.clutz.module$exports$interface_exp$SomeEnum;
}
declare module 'goog:interface_exp.SomeEnum' {
  import alias = ಠ_ಠ.clutz.module$exports$interface_exp$SomeEnum;
  export default alias;
}
