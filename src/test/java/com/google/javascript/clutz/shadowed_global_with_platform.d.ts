declare namespace ಠ_ಠ.clutz.goog.ns {
  function fn (a : GlobalEventTarget ) : void ;
}
declare namespace goog {
  function require(name: 'goog.ns'): typeof ಠ_ಠ.clutz.goog.ns;
}
declare module 'goog:goog.ns' {
  import alias = ಠ_ಠ.clutz.goog.ns;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.goog.ns {
  class EventTarget extends EventTarget_Instance {
  }
  class EventTarget_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'goog.ns.EventTarget'): typeof ಠ_ಠ.clutz.goog.ns.EventTarget;
}
declare module 'goog:goog.ns.EventTarget' {
  import alias = ಠ_ಠ.clutz.goog.ns.EventTarget;
  export default alias;
}
