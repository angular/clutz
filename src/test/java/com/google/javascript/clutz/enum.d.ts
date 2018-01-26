declare namespace ಠ_ಠ.clutz {
  type module$exports$some$ObjectValuedEnum = ಠ_ಠ.clutz.module$exports$X &{clutzEnumBrand: never} ;
  var module$exports$some$ObjectValuedEnum : {
    A : module$exports$some$ObjectValuedEnum ,
    B : module$exports$some$ObjectValuedEnum ,
  };
}
declare namespace ಠ_ಠ.clutz.module$exports$some {
  export import ObjectValuedEnum =  ಠ_ಠ.clutz.module$exports$some$ObjectValuedEnum;
}
declare module 'goog:some.ObjectValuedEnum' {
  import alias = ಠ_ಠ.clutz.module$exports$some$ObjectValuedEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$some$SomeEnum {
    A ,
    B ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$some {
  export import SomeEnum =  ಠ_ಠ.clutz.module$exports$some$SomeEnum;
}
declare module 'goog:some.SomeEnum' {
  import alias = ಠ_ಠ.clutz.module$exports$some$SomeEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$X extends module$exports$X_Instance {
  }
  class module$exports$X_Instance {
    private noStructuralTyping_: any;
  }
}
