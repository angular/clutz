declare namespace ಠ_ಠ.clutz.nswindow {
  var c : ಠ_ಠ.clutz.window.C ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'nswindow.c'): typeof ಠ_ಠ.clutz.nswindow.c;
}
declare module 'goog:nswindow.c' {
  import alias = ಠ_ಠ.clutz.nswindow.c;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.window {
  class C extends C_Instance {
  }
  class C_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.window {
  var a : number ;
}
