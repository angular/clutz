declare namespace ಠ_ಠ.clutz.some {
  enum EscapedEnum {
    A = '\\' ,
  }
}
declare module 'goog:some.EscapedEnum' {
  import alias = ಠ_ಠ.clutz.some.EscapedEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.some {
  type MixedEnum = string | number | boolean &{clutzEnumBrand: never} ;
  var MixedEnum : {
    A : MixedEnum ,
    B : MixedEnum ,
    C : MixedEnum ,
  };
}
declare module 'goog:some.MixedEnum' {
  import alias = ಠ_ಠ.clutz.some.MixedEnum;
  export default alias;
}
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
  type PartialLiteralStringEnum = string &{clutzEnumBrand: never} |'1' |'2' ;
  var PartialLiteralStringEnum : {
    A : '1' ,
    B : PartialLiteralStringEnum ,
    C : '2' ,
    D : PartialLiteralStringEnum ,
  };
}
declare module 'goog:some.PartialLiteralStringEnum' {
  import alias = ಠ_ಠ.clutz.some.PartialLiteralStringEnum;
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
  type StringVariableEnum = string &{clutzEnumBrand: never} ;
  var StringVariableEnum : {
    A : StringVariableEnum ,
    B : StringVariableEnum ,
  };
}
declare module 'goog:some.StringVariableEnum' {
  import alias = ಠ_ಠ.clutz.some.StringVariableEnum;
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
