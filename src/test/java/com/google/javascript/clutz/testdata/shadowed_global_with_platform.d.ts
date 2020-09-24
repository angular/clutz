// Generated from src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform.js
declare namespace ಠ_ಠ.clutz.goog.ns {
  function fn (a : GlobalEventTarget ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform.js
declare module 'goog:goog.ns' {
  import ns = ಠ_ಠ.clutz.goog.ns;
  export = ns;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform' {
  import ns = ಠ_ಠ.clutz.goog.ns;
  export = ns;
  const __clutz_actual_namespace: 'goog.ns';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform.js
declare namespace ಠ_ಠ.clutz.goog.ns {
  class EventTarget {
    private noStructuralTyping_goog_ns_EventTarget : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform.js
declare module 'goog:goog.ns.EventTarget' {
  import EventTarget = ಠ_ಠ.clutz.goog.ns.EventTarget;
  export default EventTarget;
}
