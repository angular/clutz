declare namespace ಠ_ಠ.clutz {
  interface module$exports$interface_exp {
    method ( ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$interface_exp$SomeClazz extends module$exports$interface_exp$SomeClazz_Instance {
  }
  class module$exports$interface_exp$SomeClazz_Instance {
    private noStructuralTyping_: any;
  }
  function module$exports$interface_exp$staticMethod ( ) : number ;
  var module$exports$interface_exp$staticProp : number ;
}
declare namespace ಠ_ಠ.clutz.module$exports$interface_exp {
  export import SomeClazz = ಠ_ಠ.clutz.module$exports$interface_exp$SomeClazz;
}
declare namespace ಠ_ಠ.clutz.module$exports$interface_exp {
  export import staticMethod = ಠ_ಠ.clutz.module$exports$interface_exp$staticMethod;
}
declare namespace ಠ_ಠ.clutz.module$exports$interface_exp {
  export import staticProp = ಠ_ಠ.clutz.module$exports$interface_exp$staticProp;
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
  export import SomeEnum = ಠ_ಠ.clutz.module$exports$interface_exp$SomeEnum;
}
declare module 'goog:interface_exp.SomeEnum' {
  import alias = ಠ_ಠ.clutz.module$exports$interface_exp$SomeEnum;
  export default alias;
}
