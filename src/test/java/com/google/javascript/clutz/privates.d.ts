declare namespace ಠ_ಠ.clutz {
  class module$exports$priv$PrivateClazz extends module$exports$priv$PrivateClazz_Instance {
  }
  class module$exports$priv$PrivateClazz_Instance {
    private noStructuralTyping_: any;
  }
  class module$exports$priv$PublicClass extends module$exports$priv$PublicClass_Instance {
  }
  class module$exports$priv$PublicClass_Instance {
    private noStructuralTyping_: any;
    publicField : number ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$priv {
  export import PrivateClazz = ಠ_ಠ.clutz.module$exports$priv$PrivateClazz;
}
declare namespace ಠ_ಠ.clutz.module$exports$priv {
  export import PublicClass = ಠ_ಠ.clutz.module$exports$priv$PublicClass;
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
declare namespace ಠ_ಠ.clutz.module$exports$priv2 {
  export import PublicClass = ಠ_ಠ.clutz.module$exports$priv2$PublicClass;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$priv2$PublicClass$PrivateNestedClass_ extends module$exports$priv2$PublicClass$PrivateNestedClass__Instance {
  }
  class module$exports$priv2$PublicClass$PrivateNestedClass__Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$priv2.PublicClass {
  export import PrivateNestedClass_ = ಠ_ಠ.clutz.module$exports$priv2$PublicClass$PrivateNestedClass_;
}
declare namespace ಠ_ಠ.clutz.module$exports$priv2$PublicClass {
  export import PrivateNestedClass_ = ಠ_ಠ.clutz.module$exports$priv2$PublicClass$PrivateNestedClass_;
}
declare module 'goog:priv2.PublicClass' {
  import alias = ಠ_ಠ.clutz.module$exports$priv2$PublicClass;
  export default alias;
}
