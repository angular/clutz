declare namespace ಠ_ಠ.clutz.some {
  enum EscapedEnum {
    A = '\\' ,
  }
}
declare module 'goog:some.EscapedEnum' {
  import EscapedEnum = ಠ_ಠ.clutz.some.EscapedEnum;
  export default EscapedEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  type MixedEnum = string | number | boolean &{clutzEnumBrand: never} ;
  let MixedEnum : {
    A : MixedEnum ,
    B : MixedEnum ,
    C : MixedEnum ,
  };
}
declare module 'goog:some.MixedEnum' {
  import MixedEnum = ಠ_ಠ.clutz.some.MixedEnum;
  export default MixedEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  type NumberAsKey = string &{clutzEnumBrand: never} |'a' |'b' ;
  let NumberAsKey : {
    1 : 'a' ,
    2 : 'b' ,
  };
}
declare module 'goog:some.NumberAsKey' {
  import NumberAsKey = ಠ_ಠ.clutz.some.NumberAsKey;
  export default NumberAsKey;
}
declare namespace ಠ_ಠ.clutz.some {
  type ObjectValuedEnum = X &{clutzEnumBrand: never} ;
  let ObjectValuedEnum : {
    A : ObjectValuedEnum ,
    B : ObjectValuedEnum ,
  };
}
declare module 'goog:some.ObjectValuedEnum' {
  import ObjectValuedEnum = ಠ_ಠ.clutz.some.ObjectValuedEnum;
  export default ObjectValuedEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  type PartialLiteralStringEnum = string &{clutzEnumBrand: never} |'1' |'2' ;
  let PartialLiteralStringEnum : {
    A : '1' ,
    B : PartialLiteralStringEnum ,
    C : '2' ,
    D : PartialLiteralStringEnum ,
  };
}
declare module 'goog:some.PartialLiteralStringEnum' {
  import PartialLiteralStringEnum = ಠ_ಠ.clutz.some.PartialLiteralStringEnum;
  export default PartialLiteralStringEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  enum SomeEnum {
    A = 1.0 ,
    B = 2.0 ,
  }
}
declare module 'goog:some.SomeEnum' {
  import SomeEnum = ಠ_ಠ.clutz.some.SomeEnum;
  export default SomeEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  enum StringEnum {
    A = '1' ,
    B = '2' ,
  }
}
declare module 'goog:some.StringEnum' {
  import StringEnum = ಠ_ಠ.clutz.some.StringEnum;
  export default StringEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  type StringVariableEnum = string &{clutzEnumBrand: never} ;
  let StringVariableEnum : {
    A : StringVariableEnum ,
    B : StringVariableEnum ,
  };
}
declare module 'goog:some.StringVariableEnum' {
  import StringVariableEnum = ಠ_ಠ.clutz.some.StringVariableEnum;
  export default StringVariableEnum;
}
declare namespace ಠ_ಠ.clutz.some {
  function setEnvironment (a : Environment ) : any ;
}
declare module 'goog:some.setEnvironment' {
  import setEnvironment = ಠ_ಠ.clutz.some.setEnvironment;
  export default setEnvironment;
}
declare namespace ಠ_ಠ.clutz {
  class X {
    private noStructuralTyping_X : any;
  }
}
declare namespace ಠ_ಠ.clutz {
  enum Environment {
    FAKE = 0.0 ,
    PROD = 4.0 ,
  }
}
