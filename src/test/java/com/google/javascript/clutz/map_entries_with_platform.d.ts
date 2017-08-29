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
declare module 'goog:map_entries.Map' {
  import alias = ಠ_ಠ.clutz.module$exports$map_entries$Map;
  export default alias;
}
