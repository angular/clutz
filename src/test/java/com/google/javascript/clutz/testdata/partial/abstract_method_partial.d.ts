// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/abstract_method_partial.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$abst$method {
    private noStructuralTyping_module$exports$abst$method : any;
    /**
     * It appears that this one is emitted correctly without partial_goog_base.js
     */
    methodWithTypes ( ) : number ;
    methodWithoutTypes ( ...a : any [] ) : any ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/abstract_method_partial.js
declare module 'goog:abst.method' {
  import method = ಠ_ಠ.clutz.module$exports$abst$method;
  export default method;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/abstract_method_partial';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/abstract_method_partial' {
  import method = ಠ_ಠ.clutz.module$exports$abst$method;
  export { method };
  const __clutz_strip_property: 'method';
  const __clutz_actual_namespace: 'abst.method';
}
