// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/inner_typedef_npe.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$odd$npe$typedef {
    private noStructuralTyping_module$exports$odd$npe$typedef : any;
    foo ( ) : ಠ_ಠ.clutz.some.type < ಠ_ಠ.clutz.module$contents$odd$npe$typedef_ATypeDef > ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/inner_typedef_npe.js
declare module 'goog:odd.npe.typedef' {
  import typedef = ಠ_ಠ.clutz.module$exports$odd$npe$typedef;
  export default typedef;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/inner_typedef_npe';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/inner_typedef_npe' {
  import typedef = ಠ_ಠ.clutz.module$exports$odd$npe$typedef;
  export { typedef };
  const __clutz_strip_property: 'typedef';
  const __clutz_actual_namespace: 'odd.npe.typedef';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/inner_typedef_npe.js
declare namespace ಠ_ಠ.clutz {
  type module$contents$odd$npe$typedef_ATypeDef = { a : string } ;
}
