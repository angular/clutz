declare namespace ಠ_ಠ.clutz.ns {
  type typedef = { foo : ಠ_ಠ.clutz.ns.typedef.E } ;
}
declare namespace ಠ_ಠ.clutz.ns.typedef {
  enum E {
    Foo = '+' ,
  }
}
declare module 'goog:ns.typedef' {
  import typedef = ಠ_ಠ.clutz.ns.typedef;
  export default typedef;
}
