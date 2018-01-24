declare namespace ಠ_ಠ.clutz {
  type module$exports$module$Foo$Legacy = ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A ;
  var module$exports$module$Foo$Legacy : typeof ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A ;
}
declare module 'goog:module.Foo.Legacy' {
  import alias = ಠ_ಠ.clutz.module$exports$module$Foo$Legacy;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$module$Foo$Legacy_A extends module$contents$module$Foo$Legacy_A_Instance {
  }
  class module$contents$module$Foo$Legacy_A_Instance {
    private noStructuralTyping_: any;
  }
}
