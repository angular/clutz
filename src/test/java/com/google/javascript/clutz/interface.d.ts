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
}
declare module 'goog:interface_exp' {
  import interface_exp = ಠ_ಠ.clutz.interface_exp;
  export default interface_exp;
}
declare namespace ಠ_ಠ.clutz.interface_exp {
  enum SomeEnum {
    A = 1.0 ,
    B = 2.0 ,
  }
}
declare module 'goog:interface_exp.SomeEnum' {
  import SomeEnum = ಠ_ಠ.clutz.interface_exp.SomeEnum;
  export default SomeEnum;
}
