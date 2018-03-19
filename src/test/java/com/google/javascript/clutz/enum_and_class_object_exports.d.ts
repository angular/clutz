declare namespace ಠ_ಠ.clutz.foo.bar {
  class Class extends Class_Instance {
  }
  class Class_Instance {
    private noStructuralTyping_: any;
  }
  var Enum : ಠ_ಠ.clutz.module$contents$foo$bar_ExportObject.Enum ;
}
declare module 'goog:foo.bar' {
  import alias = ಠ_ಠ.clutz.foo.bar;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.module$contents$foo$bar_ExportObject {
  type Enum = string &{clutzEnumBrand: never} ;
  var Enum : {
    A : Enum ,
  };
}
