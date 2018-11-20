//!! a.b.ShouldNotAppear must be absent here, it is provide'd in a non-root
declare namespace ಠ_ಠ.clutz.a.b {
  class Thing {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:a.b' {
  import b = ಠ_ಠ.clutz.a.b;
  export = b;
}
