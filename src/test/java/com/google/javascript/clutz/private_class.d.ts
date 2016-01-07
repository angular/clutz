declare namespace ಠ_ಠ.clutz.privateclass {
  class A extends A_Instance {
  }
  class A_Instance extends ಠ_ಠ.clutz.PrivateClass {
  }
  class B extends B_Instance {
  }
  class B_Instance implements ಠ_ಠ.clutz.PrivateInterface {
    private noStructuralTyping_: any;
  }
  interface I extends ಠ_ಠ.clutz.PrivateInterface {
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'privateclass'): typeof ಠ_ಠ.clutz.privateclass;
}
declare module 'goog:privateclass' {
  import alias = ಠ_ಠ.clutz.privateclass;
  export = alias;
}
