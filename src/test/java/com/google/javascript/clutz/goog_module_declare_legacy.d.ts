declare namespace ಠ_ಠ.clutz.module.Foo {
  type Legacy = ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A ;
  var Legacy : typeof ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A ;
}
declare module 'goog:module.Foo.Legacy' {
  import alias = ಠ_ಠ.clutz.module.Foo.Legacy;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$module$Foo$Legacy_A extends module$contents$module$Foo$Legacy_A_Instance {
  }
  class module$contents$module$Foo$Legacy_A_Instance {
    private noStructuralTyping_: any;
  }
}
