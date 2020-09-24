// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_alias_missing.js
declare namespace ಠ_ಠ.clutz.ns.event {
  function f (t : GlobalEventTarget | null ) : void ;
  function f2 (t : ಠ_ಠ.clutz.ns.event.EventTarget | null ) : void ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/global_alias_missing.js
declare module 'goog:ns.event' {
  import event = ಠ_ಠ.clutz.ns.event;
  export = event;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/global_alias_missing';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/global_alias_missing' {
  import event = ಠ_ಠ.clutz.ns.event;
  export = event;
  const __clutz_actual_namespace: 'ns.event';
}
