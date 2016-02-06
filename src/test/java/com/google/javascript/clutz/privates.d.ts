declare namespace ಠ_ಠ.clutz.priv {
  class PublicClass extends PublicClass_Instance {
  }
  class PublicClass_Instance {
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
declare namespace ಠ_ಠ.clutz.priv2 {
  class PublicClass extends PublicClass_Instance {
  }
  class PublicClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'priv2.PublicClass'): typeof ಠ_ಠ.clutz.priv2.PublicClass;
}
declare module 'goog:priv2.PublicClass' {
  import alias = ಠ_ಠ.clutz.priv2.PublicClass;
  export default alias;
}
