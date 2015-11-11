declare namespace ಠ_ಠ.clutz.priv {
  class PublicClass {
    private noStructuralTyping_: any;
    publicField : number ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'priv'): typeof ಠ_ಠ.clutz.priv;
}
declare module 'goog:priv' {
  import alias = ಠ_ಠ.clutz.priv;
  export = alias;
}
