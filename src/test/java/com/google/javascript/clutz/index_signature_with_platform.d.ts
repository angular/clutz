declare namespace ಠ_ಠ.clutz {
  class module$exports$index_signature$ImplementsIArrayLike extends module$exports$index_signature$ImplementsIArrayLike_Instance {
  }
  class module$exports$index_signature$ImplementsIArrayLike_Instance implements ArrayLike < string > {
    private noStructuralTyping_: any;
    [ key: number ]: string ;
    length : number ;
  }
  class module$exports$index_signature$ImplementsIArrayLikeBare extends module$exports$index_signature$ImplementsIArrayLikeBare_Instance {
  }
  class module$exports$index_signature$ImplementsIArrayLikeBare_Instance implements ArrayLike < any > {
    private noStructuralTyping_: any;
    [ key: number ]: any ;
    length : number ;
  }
  class module$exports$index_signature$ImplementsIArrayLikeWithGeneric < T > extends module$exports$index_signature$ImplementsIArrayLikeWithGeneric_Instance < T > {
  }
  class module$exports$index_signature$ImplementsIArrayLikeWithGeneric_Instance < T > implements ArrayLike < T > {
    private noStructuralTyping_: any;
    [ key: number ]: T ;
    length : number ;
  }
  class module$exports$index_signature$ImplementsIObject extends module$exports$index_signature$ImplementsIObject_Instance {
  }
  class module$exports$index_signature$ImplementsIObject_Instance implements ಠ_ಠ.clutz.module$exports$IObject < string , number > {
    private noStructuralTyping_: any;
    [ key: string ]: number ;
  }
  class module$exports$index_signature$ImplementsIObjectLikeBare extends module$exports$index_signature$ImplementsIObjectLikeBare_Instance {
  }
  class module$exports$index_signature$ImplementsIObjectLikeBare_Instance implements ಠ_ಠ.clutz.module$exports$IObject < any , any > {
    private noStructuralTyping_: any;
    [ /* warning: coerced from ? */ key: string ]: any ;
  }
  class module$exports$index_signature$ImplementsIObjectWithGeneric < T > extends module$exports$index_signature$ImplementsIObjectWithGeneric_Instance < T > {
  }
  class module$exports$index_signature$ImplementsIObjectWithGeneric_Instance < T > implements ಠ_ಠ.clutz.module$exports$IObject < string , T > {
    private noStructuralTyping_: any;
    [ key: string ]: T ;
  }
  interface module$exports$index_signature$InterfaceExtendingIArrayLike extends ArrayLike < string > {
  }
  class module$exports$index_signature$ShouldContainIndexSignature extends module$exports$index_signature$ShouldContainIndexSignature_Instance {
  }
  class module$exports$index_signature$ShouldContainIndexSignature_Instance implements ಠ_ಠ.clutz.module$exports$index_signature$InterfaceExtendingIArrayLike {
    private noStructuralTyping_: any;
    [ key: number ]: string ;
    length : number ;
  }
  class module$exports$index_signature$ShouldNotContainIndexSignature extends module$exports$index_signature$ShouldNotContainIndexSignature_Instance {
  }
  class module$exports$index_signature$ShouldNotContainIndexSignature_Instance extends ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIArrayLike {
  }
  class module$exports$index_signature$SomeType extends module$exports$index_signature$SomeType_Instance {
  }
  class module$exports$index_signature$SomeType_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ImplementsIArrayLike = ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIArrayLike;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ImplementsIArrayLikeBare = ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIArrayLikeBare;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ImplementsIArrayLikeWithGeneric = ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIArrayLikeWithGeneric;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ImplementsIObject = ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIObject;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ImplementsIObjectLikeBare = ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIObjectLikeBare;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ImplementsIObjectWithGeneric = ಠ_ಠ.clutz.module$exports$index_signature$ImplementsIObjectWithGeneric;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import InterfaceExtendingIArrayLike = ಠ_ಠ.clutz.module$exports$index_signature$InterfaceExtendingIArrayLike;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ShouldContainIndexSignature = ಠ_ಠ.clutz.module$exports$index_signature$ShouldContainIndexSignature;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import ShouldNotContainIndexSignature = ಠ_ಠ.clutz.module$exports$index_signature$ShouldNotContainIndexSignature;
}
declare namespace ಠ_ಠ.clutz.module$exports$index_signature {
  export import SomeType = ಠ_ಠ.clutz.module$exports$index_signature$SomeType;
}
declare module 'goog:index_signature' {
  import alias = ಠ_ಠ.clutz.module$exports$index_signature;
  export = alias;
}
