// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/extends_global_event.js
declare namespace ಠ_ಠ.clutz.foo.bar {
  class Baz extends GlobalEvent {
    private noStructuralTyping_foo_bar_Baz : any;
    constructor ( ) ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/extends_global_event.js
declare module 'goog:foo.bar.Baz' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export default Baz;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/extends_global_event';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/extends_global_event' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export { Baz };
  const __clutz_strip_property: 'Baz';
  const __clutz_actual_namespace: 'foo.bar.Baz';
}
