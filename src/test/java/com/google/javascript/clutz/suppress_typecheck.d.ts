declare namespace ಠ_ಠ.clutz.suppress {
  class A {
    private noStructuralTyping_: any;
    foo ( ) : number ;
  }
  class B extends ಠ_ಠ.clutz.suppress.A {
  }
}
declare module 'goog:suppress' {
  import suppress = ಠ_ಠ.clutz.suppress;
  export = suppress;
}
