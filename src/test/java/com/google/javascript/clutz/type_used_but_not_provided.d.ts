declare namespace ಠ_ಠ.clutz.used.not.provided {
  var a : ಠ_ಠ.clutz.used.not.provided.C ;
}
declare namespace goog {
  function require(name: 'used.not.provided.a'): typeof ಠ_ಠ.clutz.used.not.provided.a;
}
declare module 'goog:used.not.provided.a' {
  import alias = ಠ_ಠ.clutz.used.not.provided.a;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.used.not.provided {
  class C extends C_Instance {
  }
  class C_Instance implements ಠ_ಠ.clutz.used.not.provided.I < number > {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.used.not.provided {
  interface I < T > {
  }
}
