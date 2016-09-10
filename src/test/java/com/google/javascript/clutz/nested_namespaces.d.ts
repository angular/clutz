declare namespace ಠ_ಠ.clutz.nested {
  type NotNested = number ;
  var NotNested : {
  };
}
declare namespace goog {
  function require(name: 'nested.NotNested'): typeof ಠ_ಠ.clutz.nested.NotNested;
}
declare module 'goog:nested.NotNested' {
  import alias = ಠ_ಠ.clutz.nested.NotNested;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested {
  type NotNestedEither = number ;
  var NotNestedEither : {
  };
}
declare namespace goog {
  function require(name: 'nested.NotNestedEither'): typeof ಠ_ಠ.clutz.nested.NotNestedEither;
}
declare module 'goog:nested.NotNestedEither' {
  import alias = ಠ_ಠ.clutz.nested.NotNestedEither;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested {
  class PrivateC extends PrivateC_Instance {
  }
  class PrivateC_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'nested.PrivateC'): typeof ಠ_ಠ.clutz.nested.PrivateC;
}
declare module 'goog:nested.PrivateC' {
  import alias = ಠ_ಠ.clutz.nested.PrivateC;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested.PrivateC {
  type Enum = number ;
  var Enum : {
  };
}
declare namespace goog {
  function require(name: 'nested.PrivateC.Enum'): typeof ಠ_ಠ.clutz.nested.PrivateC.Enum;
}
declare module 'goog:nested.PrivateC.Enum' {
  import alias = ಠ_ಠ.clutz.nested.PrivateC.Enum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested {
  var foo__clutz_alias : ಠ_ಠ.clutz.nested.PrivateC ;
}
declare namespace goog {
  function require(name: 'nested.foo'): typeof ಠ_ಠ.clutz.nested.foo__clutz_alias;
}
declare module 'goog:nested.foo' {
  import alias = ಠ_ಠ.clutz.nested.foo__clutz_alias;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested.foo {
  class Klass extends Klass_Instance {
  }
  class Klass_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'nested.foo.Klass'): typeof ಠ_ಠ.clutz.nested.foo.Klass;
}
declare module 'goog:nested.foo.Klass' {
  import alias = ಠ_ಠ.clutz.nested.foo.Klass;
  export default alias;
}
