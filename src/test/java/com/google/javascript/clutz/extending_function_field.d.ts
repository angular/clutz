declare namespace ಠ_ಠ.clutz.a {
  function messesWithB (b : ಠ_ಠ.clutz.ns.B ) : void ;
}
declare module 'goog:a.messesWithB' {
  import messesWithB = ಠ_ಠ.clutz.a.messesWithB;
  export default messesWithB;
}
declare namespace ಠ_ಠ.clutz.ns {
  class A {
    private noStructuralTyping_: any;
    fn ( ) : void ;
  }
}
declare module 'goog:ns.A' {
  import A = ಠ_ಠ.clutz.ns.A;
  export default A;
}
declare namespace ಠ_ಠ.clutz.ns {
  class B extends ಠ_ಠ.clutz.ns.A {
    fn ( ) : void ;
  }
}
declare module 'goog:ns.B' {
  import B = ಠ_ಠ.clutz.ns.B;
  export default B;
}
