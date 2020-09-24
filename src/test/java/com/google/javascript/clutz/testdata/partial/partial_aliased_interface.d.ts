// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/partial_aliased_interface.js
declare namespace ಠ_ಠ.clutz {
  namespace module$exports$partial$aliased_interface {
    function staticMethod ( ) : string ;
  }
  interface module$exports$partial$aliased_interface {
    x : string ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/partial_aliased_interface.js
declare module 'goog:partial.aliased_interface' {
  import aliased_interface = ಠ_ಠ.clutz.module$exports$partial$aliased_interface;
  export default aliased_interface;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/partial_aliased_interface';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/partial_aliased_interface' {
  import aliased_interface = ಠ_ಠ.clutz.module$exports$partial$aliased_interface;
  export { aliased_interface };
  const __clutz_strip_property: 'aliased_interface';
  const __clutz_actual_namespace: 'partial.aliased_interface';
}
