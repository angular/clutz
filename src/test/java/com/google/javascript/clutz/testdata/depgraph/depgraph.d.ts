// Generated from src/test/java/com/google/javascript/clutz/testdata/depgraph/root.js
declare namespace ಠ_ಠ.clutz.root {
  class Z {
    private noStructuralTyping_root_Z : any;
    useTransitive ( ) : ಠ_ಠ.clutz.transitive.Y | null ;
    useTransitiveNamespaced ( ) : ಠ_ಠ.clutz.transitive.ns.Z | null ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/depgraph/root.js
declare module 'goog:root.Z' {
  import Z = ಠ_ಠ.clutz.root.Z;
  export default Z;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/depgraph/transitive.js
declare namespace ಠ_ಠ.clutz.transitive {
  class Y {
    private noStructuralTyping_transitive_Y : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/depgraph/transitive_namespace.js
declare namespace ಠ_ಠ.clutz.transitive.ns {
  class Z {
    private noStructuralTyping_transitive_ns_Z : any;
  }
}
