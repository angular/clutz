declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterable extends ImplIterable_Instance {
  }
  class ImplIterable_Instance implements Iterable < string > {
    private noStructuralTyping_: any;
    [Symbol.iterator]():  Iterator < string > ;
  }
}
declare module 'goog:implements_iterable.ImplIterable' {
  import ImplIterable = ಠ_ಠ.clutz.implements_iterable.ImplIterable;
  export default ImplIterable;
}
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableGeneric < T > extends ImplIterableGeneric_Instance < T > {
  }
  class ImplIterableGeneric_Instance < T > implements Iterable < T > {
    private noStructuralTyping_: any;
    [Symbol.iterator]():  Iterator < any > ;
  }
}
declare module 'goog:implements_iterable.ImplIterableGeneric' {
  import ImplIterableGeneric = ಠ_ಠ.clutz.implements_iterable.ImplIterableGeneric;
  export default ImplIterableGeneric;
}
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableIterator extends ImplIterableIterator_Instance {
  }
  class ImplIterableIterator_Instance implements IterableIterator < string > {
    private noStructuralTyping_: any;
    [Symbol.iterator]():  IterableIterator < string > ;
    next (a ? : any ) : IteratorResult < string > ;
  }
}
declare module 'goog:implements_iterable.ImplIterableIterator' {
  import ImplIterableIterator = ಠ_ಠ.clutz.implements_iterable.ImplIterableIterator;
  export default ImplIterableIterator;
}
