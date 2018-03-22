declare namespace ಠ_ಠ.clutz.foo {
  type Bar = ಠ_ಠ.clutz.$jscomp.scope.Bar ;
  var Bar : typeof ಠ_ಠ.clutz.$jscomp.scope.Bar ;
  type Bar_Instance = ಠ_ಠ.clutz.$jscomp.scope.Bar_Instance ;
  var Bar_Instance : typeof ಠ_ಠ.clutz.$jscomp.scope.Bar_Instance ;
}
declare module 'goog:foo.Bar' {
  import alias = ಠ_ಠ.clutz.foo.Bar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  type IBar = ಠ_ಠ.clutz.$jscomp.scope.IBar ;
}
declare module 'goog:foo.IBar' {
  import alias = ಠ_ಠ.clutz.foo.IBar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  var boom : ಠ_ಠ.clutz.$jscomp.scope.Bar | null ;
}
declare module 'goog:foo.boom' {
  import alias = ಠ_ಠ.clutz.foo.boom;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  var iboom : ಠ_ಠ.clutz.$jscomp.scope.IBar | null ;
}
declare module 'goog:foo.iboom' {
  import alias = ಠ_ಠ.clutz.foo.iboom;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  class Bar extends Bar_Instance {
  }
  class Bar_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  interface IBar {
  }
}
