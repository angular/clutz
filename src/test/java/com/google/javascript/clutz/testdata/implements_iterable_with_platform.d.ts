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
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform' {
  import ImplIterable = ಠ_ಠ.clutz.implements_iterable.ImplIterable;
  export { ImplIterable };
  const __clutz_strip_property: 'ImplIterable';
  const __clutz_actual_namespace: 'implements_iterable.ImplIterable';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare namespace ಠ_ಠ.clutz.implements_iterable {
  class ImplIterableGeneric < T = any > implements Iterable < T > {
    private noStructuralTyping_implements_iterable_ImplIterableGeneric : [ T ];
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform.js
declare module 'goog:implements_iterable.ImplIterableGeneric' {
  import ImplIterableGeneric = ಠ_ಠ.clutz.implements_iterable.ImplIterableGeneric;
  export default ImplIterableGeneric;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform' {
  export {};
  const __clutz_multiple_provides: true;
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
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/implements_iterable_with_platform' {
  export {};
  const __clutz_multiple_provides: true;
}
