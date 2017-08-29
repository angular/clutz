declare namespace ಠ_ಠ.clutz {
  class module$exports$map_entries$Map < K , V > extends module$exports$map_entries$Map_Instance < K , V > {
  }
  class module$exports$map_entries$Map_Instance < K , V > {
    private noStructuralTyping_: any;
    /**
     * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
     */
    entries (): IterableIterator<[ K , V ]>;
  }
}
declare namespace goog {
  function require(name: 'module$exports$map_entries$Map'): typeof ಠ_ಠ.clutz.module$exports$map_entries$Map;
}
declare module 'goog:map_entries.Map' {
  import alias = ಠ_ಠ.clutz.module$exports$map_entries$Map;
  export default alias;
}
