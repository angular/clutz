// Generated from src/test/java/com/google/javascript/clutz/testdata/index_signature_with_platform.js
declare namespace ಠ_ಠ.clutz.index_signature {
  class ImplementsIArrayLike implements ArrayLike < string > {
    private noStructuralTyping_index_signature_ImplementsIArrayLike : any;
    [ key: number ]: string ;
    length : number ;
  }
  class ImplementsIArrayLikeBare implements ArrayLike < any > {
    private noStructuralTyping_index_signature_ImplementsIArrayLikeBare : any;
    [ key: number ]: any ;
    length : number ;
  }
  class ImplementsIArrayLikeWithGeneric < T = any > implements ArrayLike < T > {
    private noStructuralTyping_index_signature_ImplementsIArrayLikeWithGeneric : [ T ];
    [ key: number ]: T ;
    length : number ;
  }
  class ImplementsIObject implements IObject < string , number > {
    private noStructuralTyping_index_signature_ImplementsIObject : any;
    [ key: string ]: number ;
  }
  class ImplementsIObjectLikeBare implements IObject < any , any > {
    private noStructuralTyping_index_signature_ImplementsIObjectLikeBare : any;
    [ /* warning: coerced from ? */ key: string ]: any ;
  }
  class ImplementsIObjectWithGeneric < T = any > implements IObject < string , T > {
    private noStructuralTyping_index_signature_ImplementsIObjectWithGeneric : [ T ];
    [ key: string ]: T ;
  }
  interface InterfaceExtendingIArrayLike extends ArrayLike < string > {
  }
  class ShouldContainIndexSignature implements ಠ_ಠ.clutz.index_signature.InterfaceExtendingIArrayLike {
    private noStructuralTyping_index_signature_ShouldContainIndexSignature : any;
    [ key: number ]: string ;
    length : number ;
  }
  class ShouldNotContainIndexSignature extends ಠ_ಠ.clutz.index_signature.ImplementsIArrayLike {
    private noStructuralTyping_index_signature_ShouldNotContainIndexSignature : any;
  }
  class SomeType {
    private noStructuralTyping_index_signature_SomeType : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/index_signature_with_platform.js
declare module 'goog:index_signature' {
  import index_signature = ಠ_ಠ.clutz.index_signature;
  export = index_signature;
}
