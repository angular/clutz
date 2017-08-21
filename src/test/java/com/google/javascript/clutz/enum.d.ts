declare namespace ಠ_ಠ.clutz.some {
  type ObjectValuedEnum = X &{clutzEnumBrand: never} ;
  var ObjectValuedEnum : {
    A : ObjectValuedEnum ,
    B : ObjectValuedEnum ,
  };
}
declare module 'goog:some.ObjectValuedEnum' {
  import alias = ಠ_ಠ.clutz.some.ObjectValuedEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.some {
  enum SomeEnum {
    A ,
    B ,
  }
}
declare module 'goog:some.SomeEnum' {
  import alias = ಠ_ಠ.clutz.some.SomeEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class X extends X_Instance {
  }
  class X_Instance {
    private noStructuralTyping_: any;
  }
}
