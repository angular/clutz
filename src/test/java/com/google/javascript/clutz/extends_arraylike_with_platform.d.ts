declare namespace ಠ_ಠ.clutz.extend.arraylike {
  class A extends A_Instance {
  }
  class A_Instance implements ArrayLike < any > {
    private noStructuralTyping_: any;
    [ key: number ]: any ;
    length : number ;
  }
}
declare module 'goog:extend.arraylike.A' {
  import alias = ಠ_ಠ.clutz.extend.arraylike.A;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.extend.arraylike {
  class B extends B_Instance {
  }
  class B_Instance implements ಠ_ಠ.clutz.extend.arraylike.I {
    private noStructuralTyping_: any;
    [ key: number ]: any ;
    length : number ;
  }
}
declare module 'goog:extend.arraylike.B' {
  import alias = ಠ_ಠ.clutz.extend.arraylike.B;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.extend.arraylike {
  interface I extends ArrayLike < any > {
  }
}
declare module 'goog:extend.arraylike.I' {
  import alias = ಠ_ಠ.clutz.extend.arraylike.I;
  export default alias;
}
