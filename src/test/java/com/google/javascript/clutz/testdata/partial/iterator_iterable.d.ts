// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/iterator_iterable.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$map_entries$Map < K = any , V = any > {
    private noStructuralTyping_module$exports$map_entries$Map : [ K,V ];
    /**
     * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
     */
    entries (): IterableIterator<[ K , V ]>;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/iterator_iterable.js
declare module 'goog:map_entries.Map' {
  import Map = ಠ_ಠ.clutz.module$exports$map_entries$Map;
  export default Map;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/iterator_iterable';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/iterator_iterable' {
  import Map = ಠ_ಠ.clutz.module$exports$map_entries$Map;
  export { Map };
  const __clutz_strip_property: 'Map';
  const __clutz_actual_namespace: 'map_entries.Map';
}
