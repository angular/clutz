//!! a.b.ShouldNotAppear must be absent here, it is provide'd in a non-root
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldPruneProvidesFromNonrootFile/provide.js
declare namespace ಠ_ಠ.clutz.a.b {
  class Thing {
    private noStructuralTyping_a_b_Thing : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shouldPruneProvidesFromNonrootFile/provide.js
declare module 'goog:a.b' {
  import b = ಠ_ಠ.clutz.a.b;
  export = b;
}
