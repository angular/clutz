declare namespace ಠ_ಠ.clutz {
  interface interface_exp {
    method ( ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz.interface_exp {
  class SomeClazz extends SomeClazz_Instance {
  }
  class SomeClazz_Instance {
    private noStructuralTyping_: any;
  }
  function staticMethod ( ) : number ;
  var staticProp : number ;
}
declare module 'goog:interface_exp' {
  import alias = ಠ_ಠ.clutz.interface_exp;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.interface_exp {
  enum SomeEnum {
    A = 1.0 ,
    B = 2.0 ,
  }
}
declare module 'goog:interface_exp.SomeEnum' {
  import alias = ಠ_ಠ.clutz.interface_exp.SomeEnum;
  export default alias;
}
