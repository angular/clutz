declare namespace ಠ_ಠ.clutz.module$exports$array_like {
  function useArrayLikeWithArg < T = any > (arr : ಠ_ಠ.clutz.IArrayLike < T > | null ) : void ;
  function useArrayLikeWithoutArg (arr : ಠ_ಠ.clutz.IArrayLike | null ) : void ;
}
declare module 'goog:array_like' {
  import alias = ಠ_ಠ.clutz.module$exports$array_like;
  export = alias;
}
