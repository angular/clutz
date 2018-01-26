declare namespace ಠ_ಠ.clutz {
  class module$exports$implements_iterable$ImplIterable extends module$exports$implements_iterable$ImplIterable_Instance {
  }
  class module$exports$implements_iterable$ImplIterable_Instance implements Iterable < string > {
    private noStructuralTyping_: any;
    [Symbol.iterator]():  Iterator < string > ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$implements_iterable {
  export import ImplIterable =  ಠ_ಠ.clutz.module$exports$implements_iterable$ImplIterable;
}
declare module 'goog:implements_iterable.ImplIterable' {
  import alias = ಠ_ಠ.clutz.module$exports$implements_iterable$ImplIterable;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$implements_iterable$ImplIterableGeneric < T > extends module$exports$implements_iterable$ImplIterableGeneric_Instance < T > {
  }
  class module$exports$implements_iterable$ImplIterableGeneric_Instance < T > implements Iterable < T > {
    private noStructuralTyping_: any;
    [Symbol.iterator]():  Iterator < any > ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$implements_iterable {
  export import ImplIterableGeneric =  ಠ_ಠ.clutz.module$exports$implements_iterable$ImplIterableGeneric;
}
declare module 'goog:implements_iterable.ImplIterableGeneric' {
  import alias = ಠ_ಠ.clutz.module$exports$implements_iterable$ImplIterableGeneric;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$implements_iterable$ImplIterableIterator extends module$exports$implements_iterable$ImplIterableIterator_Instance {
  }
  class module$exports$implements_iterable$ImplIterableIterator_Instance implements IterableIterator < string > {
    private noStructuralTyping_: any;
    [Symbol.iterator]():  IterableIterator < string > ;
    next (a ? : string ) : IteratorResult < string > ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$implements_iterable {
  export import ImplIterableIterator =  ಠ_ಠ.clutz.module$exports$implements_iterable$ImplIterableIterator;
}
declare module 'goog:implements_iterable.ImplIterableIterator' {
  import alias = ಠ_ಠ.clutz.module$exports$implements_iterable$ImplIterableIterator;
  export default alias;
}
