declare namespace ಠ_ಠ.clutz.ns {
  type typedef = { foo : ಠ_ಠ.clutz.ns.typedef.E } ;
}
declare namespace ಠ_ಠ.clutz.ns.typedef {
  type E = string &{brand: never} ;
  var E : {
    Foo : E ,
  };
}
declare module 'goog:ns.typedef' {
  import alias = ಠ_ಠ.clutz.ns.typedef;
  export default alias;
}
