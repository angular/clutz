declare namespace ಠ_ಠ.clutz {
  class module$exports$multi_class$A extends module$exports$multi_class$A_Instance {
  }
  class module$exports$multi_class$A_Instance {
    private noStructuralTyping_: any;
    constructor (n : number ) ;
    a : number ;
  }
  class module$exports$multi_class$B extends module$exports$multi_class$B_Instance {
  }
  class module$exports$multi_class$B_Instance extends ಠ_ಠ.clutz.module$exports$multi_class$A_Instance implements ಠ_ಠ.clutz.module$exports$multi_class$I , ಠ_ಠ.clutz.module$exports$multi_class$I2 {
    constructor ( ) ;
    b : number ;
    noop ( ) : void ;
  }
  class module$exports$multi_class$C extends module$exports$multi_class$C_Instance {
  }
  class module$exports$multi_class$C_Instance extends ಠ_ಠ.clutz.module$exports$multi_class$B_Instance {
    constructor ( ) ;
  }
  class module$exports$multi_class$D extends module$exports$multi_class$D_Instance {
  }
  class module$exports$multi_class$D_Instance implements ಠ_ಠ.clutz.module$exports$multi_class$I {
    private noStructuralTyping_: any;
  }
  interface module$exports$multi_class$I {
  }
  interface module$exports$multi_class$I2 extends ಠ_ಠ.clutz.module$exports$multi_class$I {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$multi_class {
  export import A = ಠ_ಠ.clutz.module$exports$multi_class$A;
}
declare namespace ಠ_ಠ.clutz.module$exports$multi_class {
  export import B = ಠ_ಠ.clutz.module$exports$multi_class$B;
}
declare namespace ಠ_ಠ.clutz.module$exports$multi_class {
  export import C = ಠ_ಠ.clutz.module$exports$multi_class$C;
}
declare namespace ಠ_ಠ.clutz.module$exports$multi_class {
  export import D = ಠ_ಠ.clutz.module$exports$multi_class$D;
}
declare namespace ಠ_ಠ.clutz.module$exports$multi_class {
  export import I = ಠ_ಠ.clutz.module$exports$multi_class$I;
}
declare namespace ಠ_ಠ.clutz.module$exports$multi_class {
  export import I2 = ಠ_ಠ.clutz.module$exports$multi_class$I2;
}
declare module 'goog:multi_class' {
  import alias = ಠ_ಠ.clutz.module$exports$multi_class;
  export = alias;
}
