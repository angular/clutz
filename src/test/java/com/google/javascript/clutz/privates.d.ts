declare namespace ಠ_ಠ.clutz_internal.priv {
  class PublicClass {
    private noStructuralTyping_: any;
    publicField : number ;
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'priv'): typeof ಠ_ಠ.clutz_internal.priv;
}
declare module 'goog:priv' {
  import alias = ಠ_ಠ.clutz_internal.priv;
  export = alias;
}
