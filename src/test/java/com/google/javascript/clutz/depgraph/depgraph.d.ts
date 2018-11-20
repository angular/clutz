declare namespace ಠ_ಠ.clutz.root {
  class Z {
    private noStructuralTyping_: any;
    useTransitive ( ) : ಠ_ಠ.clutz.transitive.Y | null ;
    useTransitiveNamespaced ( ) : ಠ_ಠ.clutz.transitive.ns.Z | null ;
  }
}
declare module 'goog:root.Z' {
  import Z = ಠ_ಠ.clutz.root.Z;
  export default Z;
}
declare namespace ಠ_ಠ.clutz.transitive {
  class Y {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.transitive.ns {
  class Z {
    private noStructuralTyping_: any;
  }
}
