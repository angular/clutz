declare namespace ಠ_ಠ.clutz.index_signature {
  class ImplementsIArrayLike implements ArrayLike < string > {
    private noStructuralTyping_: any;
    [ key: number ]: string ;
    length : number ;
  }
  class ImplementsIArrayLikeBare implements ArrayLike < any > {
    private noStructuralTyping_: any;
    [ key: number ]: any ;
    length : number ;
  }
  class ImplementsIArrayLikeWithGeneric < T > implements ArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    length : number ;
  }
  class ImplementsIObject implements IObject < string , number > {
    private noStructuralTyping_: any;
    [ key: string ]: number ;
  }
  class ImplementsIObjectLikeBare implements IObject < any , any > {
    private noStructuralTyping_: any;
    [ /* warning: coerced from ? */ key: string ]: any ;
  }
  class ImplementsIObjectWithGeneric < T > implements IObject < string , T > {
    private noStructuralTyping_: any;
    [ key: string ]: T ;
  }
  interface InterfaceExtendingIArrayLike extends ArrayLike < string > {
  }
  class ShouldContainIndexSignature implements ಠ_ಠ.clutz.index_signature.InterfaceExtendingIArrayLike {
    private noStructuralTyping_: any;
    [ key: number ]: string ;
    length : number ;
  }
  class ShouldNotContainIndexSignature extends ಠ_ಠ.clutz.index_signature.ImplementsIArrayLike {
  }
  class SomeType {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:index_signature' {
  import index_signature = ಠ_ಠ.clutz.index_signature;
  export = index_signature;
}
