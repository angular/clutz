declare namespace ಠ_ಠ.clutz.foo.bar {
  class Baz {
    private noStructuralTyping_: any;
    field : string ;
    avalue : number ;
    equals (b : ಠ_ಠ.clutz.foo.bar.Baz.NestedClass ) : boolean ;
    method (a : string ) : number ;
    static FUNCTION_PROP_ ( ...a : any [] ) : any ;
    static staticMethod (a : string ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz.foo.bar.Baz {
  class NestedClass {
    private noStructuralTyping_: any;
  }
  enum NestedEnum {
    B = 1.0 ,
    XD = 2.0 ,
  }
}
declare module 'goog:foo.bar.Baz' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export default Baz;
}
