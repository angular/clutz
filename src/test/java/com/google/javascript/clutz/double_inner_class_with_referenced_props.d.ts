declare namespace ಠ_ಠ.clutz {
  class module$exports$ns$DoubleInnerClassWithRef {
    private noStructuralTyping_module$exports$ns$DoubleInnerClassWithRef : any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$ns$DoubleInnerClassWithRef {
  interface Inner {
    baz (e1 : ಠ_ಠ.clutz.module$exports$ns$DoubleInnerClassWithRef.Inner.Enum1 , e2 : ಠ_ಠ.clutz.module$exports$ns$DoubleInnerClassWithRef.Inner.Enum2 ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$ns$DoubleInnerClassWithRef.Inner {
  enum Enum1 {
    FOO = 'foo' ,
  }
  enum Enum2 {
    BAR = 'bar' ,
  }
}
declare module 'goog:ns.DoubleInnerClassWithRef' {
  import DoubleInnerClassWithRef = ಠ_ಠ.clutz.module$exports$ns$DoubleInnerClassWithRef;
  export default DoubleInnerClassWithRef;
}
