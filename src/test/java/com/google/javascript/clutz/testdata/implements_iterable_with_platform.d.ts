// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterable implements Iterable < string > {
    private noStructuralTyping_implements_iterable_ImplIterable : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare module 'goog:implements_iterable.ImplIterable' {
  import ImplIterable = ಠ_ಠ.clutz.implements_iterable.ImplIterable;
  export default ImplIterable;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableGeneric < T = any > implements Iterable < T > {
    private noStructuralTyping_implements_iterable_ImplIterableGeneric : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare module 'goog:implements_iterable.ImplIterableGeneric' {
  import ImplIterableGeneric = ಠ_ಠ.clutz.implements_iterable.ImplIterableGeneric;
  export default ImplIterableGeneric;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableIterator implements IterableIterator < string > {
    private noStructuralTyping_implements_iterable_ImplIterableIterator : any;
    [Symbol.iterator]():  IterableIterator < string > ;
    next (a ? : any ) : IteratorResult < string > ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare module 'goog:implements_iterable.ImplIterableIterator' {
  import ImplIterableIterator = ಠ_ಠ.clutz.implements_iterable.ImplIterableIterator;
  export default ImplIterableIterator;
}
