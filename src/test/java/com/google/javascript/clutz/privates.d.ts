declare namespace ಠ_ಠ.clutz.priv {
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
declare namespace goog {
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
declare namespace ಠ_ಠ.clutz.priv2.PublicClass {
  class PrivateNestedClass_ extends PrivateNestedClass__Instance {
  }
  class PrivateNestedClass__Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'priv2.PublicClass'): typeof ಠ_ಠ.clutz.priv2.PublicClass;
}
declare module 'goog:priv2.PublicClass' {
  import alias = ಠ_ಠ.clutz.priv2.PublicClass;
  export default alias;
}
