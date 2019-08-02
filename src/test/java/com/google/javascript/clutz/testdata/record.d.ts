declare namespace ಠ_ಠ.clutz.namespace {
  interface I {
  }
}
declare namespace ಠ_ಠ.clutz.namespace.I {
  interface InnerR {
    foo : boolean ;
  }
}
declare module 'goog:namespace.I' {
  import I = ಠ_ಠ.clutz.namespace.I;
  export default I;
}
declare namespace ಠ_ಠ.clutz.namespace {
  interface R {
    foo : boolean ;
    optionalFoo ? : boolean ;
  }
}
declare module 'goog:namespace.R' {
  import R = ಠ_ಠ.clutz.namespace.R;
  export default R;
}
declare namespace ಠ_ಠ.clutz {
  interface externR {
    foo : boolean ;
  }
}
