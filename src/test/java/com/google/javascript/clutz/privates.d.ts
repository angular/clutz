declare namespace ಠ_ಠ.clutz.module$exports$priv {
  class PrivateClazz extends PrivateClazz_Instance {
  }
  class PrivateClazz_Instance {
    private noStructuralTyping_: any;
  }
  class PublicClass extends PublicClass_Instance {
  }
  class PublicClass_Instance {
    private noStructuralTyping_: any;
    publicField : number ;
  }
}
declare module 'goog:priv' {
  import alias = ಠ_ಠ.clutz.module$exports$priv;
  export = alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$priv2$PublicClass extends module$exports$priv2$PublicClass_Instance {
  }
  class module$exports$priv2$PublicClass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$priv2$PublicClass {
  class PrivateNestedClass_ extends PrivateNestedClass__Instance {
  }
  class PrivateNestedClass__Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:priv2.PublicClass' {
  import alias = ಠ_ಠ.clutz.module$exports$priv2$PublicClass;
  export default alias;
}
