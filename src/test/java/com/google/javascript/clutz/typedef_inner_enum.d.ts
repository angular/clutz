declare namespace ಠ_ಠ.clutz {
  type module$exports$ns$typedef = { foo : ಠ_ಠ.clutz.module$exports$ns$typedef.E } ;
}
declare namespace ಠ_ಠ.clutz.module$exports$ns$typedef {
  type E = string &{clutzEnumBrand: never} ;
  var E : {
    Foo : E ,
  };
}
declare module 'goog:ns.typedef' {
  import alias = ಠ_ಠ.clutz.module$exports$ns$typedef;
  export default alias;
}
