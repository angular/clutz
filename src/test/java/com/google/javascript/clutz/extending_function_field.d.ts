declare namespace ಠ_ಠ.clutz.a {
  function messesWithB (b : ಠ_ಠ.clutz.ns.B ) : void ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'a.messesWithB'): typeof ಠ_ಠ.clutz.a.messesWithB;
}
declare module 'goog:a.messesWithB' {
  import alias = ಠ_ಠ.clutz.a.messesWithB;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.ns {
  class A extends A_Instance {
  }
  class A_Instance {
    private noStructuralTyping_: any;
    fn ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'ns.A'): typeof ಠ_ಠ.clutz.ns.A;
}
declare module 'goog:ns.A' {
  import alias = ಠ_ಠ.clutz.ns.A;
  export default alias;
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
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'ns.B'): typeof ಠ_ಠ.clutz.ns.B;
}
declare module 'goog:ns.B' {
  import alias = ಠ_ಠ.clutz.ns.B;
  export default alias;
}
