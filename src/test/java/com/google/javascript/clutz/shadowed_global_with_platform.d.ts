declare namespace ಠ_ಠ.clutz.goog.ns {
  function fn (a : GlobalEventTarget ) : void ;
}
declare module 'goog:goog.ns' {
  import ns = ಠ_ಠ.clutz.goog.ns;
  export = ns;
}
declare namespace ಠ_ಠ.clutz.goog.ns {
  class EventTarget extends EventTarget_Instance {
  }
  class EventTarget_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:goog.ns.EventTarget' {
  import EventTarget = ಠ_ಠ.clutz.goog.ns.EventTarget;
  export default EventTarget;
}
