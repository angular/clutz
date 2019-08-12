// Generated from src/test/java/com/google/javascript/clutz/testdata/inherit_visibility.js
declare namespace ಠ_ಠ.clutz.module$exports$inherit_visibility {
  class Child extends ಠ_ಠ.clutz.module$exports$inherit_visibility.Parent {
    private noStructuralTyping_module$exports$inherit_visibility_Child : any;
    protected protected ( ) : void ;
    protected protectedNoJSDoc ( ) : void ;
    publicExplicit ( ) : void ;
    publicImplicit ( ) : void ;
  }
  class GrandChild extends ಠ_ಠ.clutz.module$exports$inherit_visibility.Child {
    private noStructuralTyping_module$exports$inherit_visibility_GrandChild : any;
    protected protected ( ) : void ;
    protected protectedNoJSDoc ( ) : void ;
    publicExplicit ( ) : void ;
    publicImplicit ( ) : void ;
  }
  class Parent {
    private noStructuralTyping_module$exports$inherit_visibility_Parent : any;
    protected protected ( ) : void ;
    protected protectedNoJSDoc ( ) : void ;
    publicExplicit ( ) : void ;
    publicImplicit ( ) : void ;
  }
}
declare module 'goog:inherit_visibility' {
  import inherit_visibility = ಠ_ಠ.clutz.module$exports$inherit_visibility;
  export = inherit_visibility;
}
