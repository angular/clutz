declare namespace ಠ_ಠ.clutz.innerEnumNs {
  interface Foo {
    bar : ಠ_ಠ.clutz.innerEnumNs.Foo.Bar ;
  }
}
declare namespace ಠ_ಠ.clutz.innerEnumNs.Foo {
  type Bar = string &{clutzEnumBrand: never} ;
  var Bar : {
    BAZ : Bar ,
  };
}
