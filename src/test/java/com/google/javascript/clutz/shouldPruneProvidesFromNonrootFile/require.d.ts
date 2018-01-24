//!! a.b.ShouldNotAppear must be absent here, it is provide'd in a non-root
declare namespace ಠ_ಠ.clutz.module$exports$a$b {
  class Thing extends Thing_Instance {
  }
  class Thing_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:a.b' {
  import alias = ಠ_ಠ.clutz.module$exports$a$b;
  export = alias;
}
