declare namespace ಠ_ಠ.clutz.lends {
}
declare module 'goog:lends' {
  import alias = ಠ_ಠ.clutz.lends;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.lends {
  class A {
    private noStructuralTyping_: any;
    a : string ;
    c : boolean ;
    static b : number ;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'lends.A'): typeof ಠ_ಠ.clutz.lends.A;
}
declare module 'goog:lends.A' {
  import alias = ಠ_ಠ.clutz.lends.A;
  export default alias;
}
