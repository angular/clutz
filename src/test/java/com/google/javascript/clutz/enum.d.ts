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
    A = 1.0 ,
    B = 2.0 ,
  }
}
declare module 'goog:some.SomeEnum' {
  import alias = ಠ_ಠ.clutz.some.SomeEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.some {
  enum StringEnum {
    A = '1' ,
    B = '2' ,
  }
}
declare module 'goog:some.StringEnum' {
  import alias = ಠ_ಠ.clutz.some.StringEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.some {
  function setEnvironment (a : Environment ) : any ;
}
declare module 'goog:some.setEnvironment' {
  import alias = ಠ_ಠ.clutz.some.setEnvironment;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class X extends X_Instance {
  }
  class X_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  enum Environment {
    FAKE = 0.0 ,
    PROD = 4.0 ,
  }
}
