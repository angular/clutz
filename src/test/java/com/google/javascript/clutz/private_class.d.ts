declare namespace ಠ_ಠ.clutz.privateclass {
  class A extends A_Instance {
  }
  class A_Instance extends ಠ_ಠ.clutz.privateclass.P_Instance {
  }
  class B extends B_Instance {
  }
  class B_Instance implements ಠ_ಠ.clutz.PrivateInterface {
    private noStructuralTyping_: any;
  }
  interface I extends ಠ_ಠ.clutz.PrivateInterface {
  }
  class P extends P_Instance {
  }
  class P_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'privateclass'): typeof ಠ_ಠ.clutz.privateclass;
}
declare module 'goog:privateclass' {
  import alias = ಠ_ಠ.clutz.privateclass;
  export = alias;
}
