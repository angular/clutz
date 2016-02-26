declare namespace ಠ_ಠ.clutz.nested {
  var PrivateC__clutz_alias : ಠ_ಠ.clutz.PrivateType;
}
declare module 'goog:nested.PrivateC' {
  import alias = ಠ_ಠ.clutz.nested.PrivateC__clutz_alias;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested.PrivateC {
  type Enum = number ;
  var Enum : {
  };
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nested.PrivateC.Enum'): typeof ಠ_ಠ.clutz.nested.PrivateC.Enum;
}
declare module 'goog:nested.PrivateC.Enum' {
  import alias = ಠ_ಠ.clutz.nested.PrivateC.Enum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.nested {
  var foo__clutz_alias : ಠ_ಠ.clutz.PrivateType ;
}
declare namespace ಠ_ಠ.clutz.goog {
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
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nested.foo.Klass'): typeof ಠ_ಠ.clutz.nested.foo.Klass;
}
declare module 'goog:nested.foo.Klass' {
  import alias = ಠ_ಠ.clutz.nested.foo.Klass;
  export default alias;
}
