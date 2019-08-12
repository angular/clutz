// Generated from src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform.js
declare namespace ಠ_ಠ.clutz.goog.ns {
  function fn (a : GlobalEventTarget ) : void ;
}
declare module 'goog:goog.ns' {
  import ns = ಠ_ಠ.clutz.goog.ns;
  export = ns;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/shadowed_global_with_platform.js
declare namespace ಠ_ಠ.clutz.goog.ns {
  class EventTarget {
    private noStructuralTyping_goog_ns_EventTarget : any;
  }
}
declare module 'goog:goog.ns.EventTarget' {
  import EventTarget = ಠ_ಠ.clutz.goog.ns.EventTarget;
  export default EventTarget;
}
