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
  import A = ಠ_ಠ.clutz.extend.arraylike.A;
  export default A;
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
  import B = ಠ_ಠ.clutz.extend.arraylike.B;
  export default B;
}
declare namespace ಠ_ಠ.clutz.extend.arraylike {
  interface I extends ArrayLike < any > {
  }
}
declare module 'goog:extend.arraylike.I' {
  import I = ಠ_ಠ.clutz.extend.arraylike.I;
  export default I;
}
