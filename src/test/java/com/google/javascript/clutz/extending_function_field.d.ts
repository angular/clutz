declare namespace ಠ_ಠ.clutz.a {
  function messesWithB (b : ಠ_ಠ.clutz.ns.B ) : void ;
}
declare module 'goog:a.messesWithB' {
  import messesWithB = ಠ_ಠ.clutz.a.messesWithB;
  export default messesWithB;
}
declare namespace ಠ_ಠ.clutz.ns {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    fn ( ) : void ;
  }
}
declare module 'goog:ns.A' {
  import A = ಠ_ಠ.clutz.ns.A;
  export default A;
}
declare namespace ಠ_ಠ.clutz.ns {
  class B extends B_Instance {
  }
  class B_Instance extends ಠ_ಠ.clutz.ns.A_Instance {
    //!! IMHO, it is a bug in closure that this property even appears.
    //!! But we have to emit a field here, instead of method, to match
    //!! the super type.
    fn ( ) : void ;
  }
}
declare module 'goog:ns.B' {
  import B = ಠ_ಠ.clutz.ns.B;
  export default B;
}
