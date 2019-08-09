// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/iterator_iterable.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$map_entries$Map < K = any , V = any > {
    private noStructuralTyping_module$exports$map_entries$Map : any;
    /**
     * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
     */
    entries (): IterableIterator<[ K , V ]>;
  }
}
declare module 'goog:map_entries.Map' {
  import Map = ಠ_ಠ.clutz.module$exports$map_entries$Map;
  export default Map;
}
