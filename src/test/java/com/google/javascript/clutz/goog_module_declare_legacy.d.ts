declare namespace ಠ_ಠ.clutz.module.Foo {
  type Legacy = ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A ;
  let Legacy : typeof ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A ;
  type Legacy_Instance = ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A_Instance ;
  let Legacy_Instance : typeof ಠ_ಠ.clutz.module$contents$module$Foo$Legacy_A_Instance ;
}
declare module 'goog:module.Foo.Legacy' {
  import Legacy = ಠ_ಠ.clutz.module.Foo.Legacy;
  export default Legacy;
}
declare namespace ಠ_ಠ.clutz {
  class module$contents$module$Foo$Legacy_A extends module$contents$module$Foo$Legacy_A_Instance {
  }
  class module$contents$module$Foo$Legacy_A_Instance {
    private noStructuralTyping_: any;
  }
}
