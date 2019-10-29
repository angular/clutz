// Generated from src/test/java/com/google/javascript/clutz/testdata/inherit_visibility.js
declare namespace ಠ_ಠ.clutz.module$exports$inherit_visibility {
  export import Child = ಠ_ಠ.clutz.module$contents$inherit_visibility_Child ;
  export import GrandChild = ಠ_ಠ.clutz.module$contents$inherit_visibility_GrandChild ;
  export import Parent = ಠ_ಠ.clutz.module$contents$inherit_visibility_Parent ;
}
declare module 'goog:inherit_visibility' {
  import inherit_visibility = ಠ_ಠ.clutz.module$exports$inherit_visibility;
  export = inherit_visibility;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inherit_visibility.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$inherit_visibility_Parent {
    private noStructuralTyping_module$contents$inherit_visibility_Parent : any;
    protected protected ( ) : void ;
    protected protectedNoJSDoc ( ) : void ;
    publicExplicit ( ) : void ;
    publicImplicit ( ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inherit_visibility.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$inherit_visibility_Child extends module$contents$inherit_visibility_Parent {
    private noStructuralTyping_module$contents$inherit_visibility_Child : any;
    protected protected ( ) : void ;
    protected protectedNoJSDoc ( ) : void ;
    publicExplicit ( ) : void ;
    publicImplicit ( ) : void ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/inherit_visibility.js
declare namespace ಠ_ಠ.clutz {
  class module$contents$inherit_visibility_GrandChild extends module$contents$inherit_visibility_Child {
    private noStructuralTyping_module$contents$inherit_visibility_GrandChild : any;
    protected protected ( ) : void ;
    protected protectedNoJSDoc ( ) : void ;
    publicExplicit ( ) : void ;
    publicImplicit ( ) : void ;
  }
}
