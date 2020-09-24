// Generated from src/test/java/com/google/javascript/clutz/testdata/async_await_with_platform.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$asyncawait {
    private noStructuralTyping_module$exports$asyncawait : any;
    bar ( ) : Promise < undefined > ;
    foo ( ) : Promise < undefined > ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/async_await_with_platform.js
declare module 'goog:asyncawait' {
  import asyncawait = ಠ_ಠ.clutz.module$exports$asyncawait;
  export default asyncawait;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/async_await_with_platform';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/async_await_with_platform' {
  import asyncawait = ಠ_ಠ.clutz.module$exports$asyncawait;
  export { asyncawait };
  const __clutz_strip_property: 'asyncawait';
  const __clutz_actual_namespace: 'asyncawait';
}
