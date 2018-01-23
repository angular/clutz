declare namespace ಠ_ಠ.clutz {
  type module$exports$ns$typedef = { foo : ಠ_ಠ.clutz.module$exports$ns$typedef$E } ;
}
declare namespace ಠ_ಠ.clutz.module$exports$ns {
  export import typedef = ಠ_ಠ.clutz.module$exports$ns$typedef;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$ns$typedef$E = string &{clutzEnumBrand: never} ;
  var module$exports$ns$typedef$E : {
    Foo : module$exports$ns$typedef$E ,
  };
}
declare namespace ಠ_ಠ.clutz.module$exports$ns.typedef {
  export import E = ಠ_ಠ.clutz.module$exports$ns$typedef$E;
}
declare namespace ಠ_ಠ.clutz.module$exports$ns$typedef {
  export import E = ಠ_ಠ.clutz.module$exports$ns$typedef$E;
}
declare module 'goog:ns.typedef' {
  import alias = ಠ_ಠ.clutz.module$exports$ns$typedef;
  export default alias;
}
