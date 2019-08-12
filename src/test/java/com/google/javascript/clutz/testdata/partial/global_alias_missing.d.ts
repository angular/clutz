// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_alias_missing.js
declare namespace ಠ_ಠ.clutz.ns.event {
  function f (t : GlobalEventTarget | null ) : void ;
  function f2 (t : ಠ_ಠ.clutz.ns.event.EventTarget | null ) : void ;
}
declare module 'goog:ns.event' {
  import event = ಠ_ಠ.clutz.ns.event;
  export = event;
}
