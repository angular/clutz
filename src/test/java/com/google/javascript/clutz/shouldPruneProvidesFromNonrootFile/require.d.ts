//!! a.b.ShouldNotAppear must be absent here, it is provide'd in a non-root
declare namespace ಠ_ಠ.clutz.a.b {
  class Thing extends Thing_Instance {
  }
  class Thing_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'a.b'): typeof ಠ_ಠ.clutz.a.b;
}
declare module 'goog:a.b' {
  import alias = ಠ_ಠ.clutz.a.b;
  export = alias;
}
