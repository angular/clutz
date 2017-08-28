declare namespace ಠ_ಠ.clutz.provides {
  class C extends C_Instance {
  }
  class C_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:provides.C' {
  import alias = ಠ_ಠ.clutz.provides.C;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.provides {
  var instance : ಠ_ಠ.clutz.provides.C ;
}
declare module 'goog:provides.instance' {
  import alias = ಠ_ಠ.clutz.provides.instance;
  export default alias;
}
