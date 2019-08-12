// Generated from src/test/java/com/google/javascript/clutz/testdata/async_await_with_platform.js
declare namespace ಠ_ಠ.clutz {
  class module$exports$asyncawait {
    private noStructuralTyping_module$exports$asyncawait : any;
    bar ( ) : Promise < undefined > ;
    foo ( ) : Promise < undefined > ;
  }
}
declare module 'goog:asyncawait' {
  import asyncawait = ಠ_ಠ.clutz.module$exports$asyncawait;
  export default asyncawait;
}
