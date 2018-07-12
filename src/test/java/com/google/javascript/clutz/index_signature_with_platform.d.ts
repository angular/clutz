declare namespace ಠ_ಠ.clutz.index_signature {
  class ImplementsIArrayLike extends ImplementsIArrayLike_Instance {
  }
  class ImplementsIArrayLike_Instance implements ArrayLike < string > {
    private noStructuralTyping_: any;
    [ key: number ]: string ;
    length : number ;
  }
  class ImplementsIArrayLikeBare extends ImplementsIArrayLikeBare_Instance {
  }
  class ImplementsIArrayLikeBare_Instance implements ArrayLike < any > {
    private noStructuralTyping_: any;
    [ key: number ]: any ;
    length : number ;
  }
  class ImplementsIArrayLikeWithGeneric < T > extends ImplementsIArrayLikeWithGeneric_Instance < T > {
  }
  class ImplementsIArrayLikeWithGeneric_Instance < T > implements ArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    length : number ;
  }
  class ImplementsIObject extends ImplementsIObject_Instance {
  }
  class ImplementsIObject_Instance implements IObject < string , number > {
    private noStructuralTyping_: any;
    [ key: string ]: number ;
  }
  class ImplementsIObjectLikeBare extends ImplementsIObjectLikeBare_Instance {
  }
  class ImplementsIObjectLikeBare_Instance implements IObject < any , any > {
    private noStructuralTyping_: any;
    [ /* warning: coerced from ? */ key: string ]: any ;
  }
  class ImplementsIObjectWithGeneric < T > extends ImplementsIObjectWithGeneric_Instance < T > {
  }
  class ImplementsIObjectWithGeneric_Instance < T > implements IObject < string , T > {
    private noStructuralTyping_: any;
    [ key: string ]: T ;
  }
  interface InterfaceExtendingIArrayLike extends ArrayLike < string > {
  }
  class ShouldContainIndexSignature extends ShouldContainIndexSignature_Instance {
  }
  class ShouldContainIndexSignature_Instance implements ಠ_ಠ.clutz.index_signature.InterfaceExtendingIArrayLike {
    private noStructuralTyping_: any;
    [ key: number ]: string ;
    length : number ;
  }
  class ShouldNotContainIndexSignature extends ShouldNotContainIndexSignature_Instance {
  }
  class ShouldNotContainIndexSignature_Instance extends ಠ_ಠ.clutz.index_signature.ImplementsIArrayLike {
  }
  class SomeType extends SomeType_Instance {
  }
  class SomeType_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:index_signature' {
  import index_signature = ಠ_ಠ.clutz.index_signature;
  export = index_signature;
}
