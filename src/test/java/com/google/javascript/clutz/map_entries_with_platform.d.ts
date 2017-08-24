declare namespace ಠ_ಠ.clutz.map_entries {
  class Map < K , V > extends Map_Instance < K , V > {
  }
  class Map_Instance < K , V > {
    private noStructuralTyping_: any;
    /**
     * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
     */
    entries (): IterableIterator<[ K , V ]>;
  }
}
declare namespace goog {
  function require(name: 'map_entries.Map'): typeof ಠ_ಠ.clutz.map_entries.Map;
}
declare module 'goog:map_entries.Map' {
  import alias = ಠ_ಠ.clutz.map_entries.Map;
  export default alias;
}
