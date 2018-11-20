declare namespace ಠ_ಠ.clutz.priv {
  class PrivateClazz {
    private noStructuralTyping_: any;
  }
  class PublicClass {
    private noStructuralTyping_: any;
    publicField : number ;
  }
}
declare module 'goog:priv' {
  import priv = ಠ_ಠ.clutz.priv;
  export = priv;
}
declare namespace ಠ_ಠ.clutz.priv2 {
  class PublicClass {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.priv2.PublicClass {
  class PrivateNestedClass_ {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:priv2.PublicClass' {
  import PublicClass = ಠ_ಠ.clutz.priv2.PublicClass;
  export default PublicClass;
}
