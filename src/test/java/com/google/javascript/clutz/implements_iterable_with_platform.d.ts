declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterable extends ImplIterable_Instance {
  }
  class ImplIterable_Instance implements Iterable < string > {
    private noStructuralTyping_: any;
    // Symbol.iterator inserted by Clutz for Iterable subtype
    [Symbol.iterator]():  Iterator < string > ;
  }
}
declare namespace goog {
  function require(name: 'implements_iterable.ImplIterable'): typeof ಠ_ಠ.clutz.implements_iterable.ImplIterable;
}
declare module 'goog:implements_iterable.ImplIterable' {
  import alias = ಠ_ಠ.clutz.implements_iterable.ImplIterable;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableGeneric < T > extends ImplIterableGeneric_Instance < T > {
  }
  class ImplIterableGeneric_Instance < T > implements Iterable < T > {
    private noStructuralTyping_: any;
    // Symbol.iterator inserted by Clutz for Iterable subtype
    [Symbol.iterator]():  Iterator < any > ;
  }
}
declare namespace goog {
  function require(name: 'implements_iterable.ImplIterableGeneric'): typeof ಠ_ಠ.clutz.implements_iterable.ImplIterableGeneric;
}
declare module 'goog:implements_iterable.ImplIterableGeneric' {
  import alias = ಠ_ಠ.clutz.implements_iterable.ImplIterableGeneric;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableIterator extends ImplIterableIterator_Instance {
  }
  class ImplIterableIterator_Instance implements IterableIterator < string > {
    private noStructuralTyping_: any;
    // Symbol.iterator inserted by Clutz for Iterable subtype
    [Symbol.iterator]():  IterableIterator < string > ;
    next (a ? : string ) : IteratorResult < string > ;
  }
}
declare namespace goog {
  function require(name: 'implements_iterable.ImplIterableIterator'): typeof ಠ_ಠ.clutz.implements_iterable.ImplIterableIterator;
}
declare module 'goog:implements_iterable.ImplIterableIterator' {
  import alias = ಠ_ಠ.clutz.implements_iterable.ImplIterableIterator;
  export default alias;
}
