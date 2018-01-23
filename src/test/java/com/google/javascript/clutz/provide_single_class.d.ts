declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$bar$Baz extends module$exports$foo$bar$Baz_Instance {
    static FUNCTION_PROP_ ( ...a : any [] ) : any ;
    static staticMethod (a : string ) : number ;
  }
  class module$exports$foo$bar$Baz_Instance {
    private noStructuralTyping_: any;
    field : string ;
    avalue : number ;
    equals (b : ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedClass ) : boolean ;
    method (a : string ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$foo.bar {
  export import Baz = ಠ_ಠ.clutz.module$exports$foo$bar$Baz;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$bar {
  export import Baz = ಠ_ಠ.clutz.module$exports$foo$bar$Baz;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$foo$bar$Baz$NestedClass extends module$exports$foo$bar$Baz$NestedClass_Instance {
  }
  class module$exports$foo$bar$Baz$NestedClass_Instance {
    private noStructuralTyping_: any;
  }
  enum module$exports$foo$bar$Baz$NestedEnum {
    A ,
    B ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$foo.bar.Baz {
  export import NestedClass = ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedClass;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$bar.Baz {
  export import NestedClass = ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedClass;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$bar$Baz {
  export import NestedClass = ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedClass;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo.bar.Baz {
  export import NestedEnum = ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedEnum;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$bar.Baz {
  export import NestedEnum = ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedEnum;
}
declare namespace ಠ_ಠ.clutz.module$exports$foo$bar$Baz {
  export import NestedEnum = ಠ_ಠ.clutz.module$exports$foo$bar$Baz$NestedEnum;
}
declare module 'goog:foo.bar.Baz' {
  import alias = ಠ_ಠ.clutz.module$exports$foo$bar$Baz;
  export default alias;
}
