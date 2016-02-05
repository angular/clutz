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
  import alias = ಠ_ಠ.clutz.namespace.I;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.namespace {
  interface R {
    foo : boolean ;
  }
}
declare module 'goog:namespace.R' {
  import alias = ಠ_ಠ.clutz.namespace.R;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  interface externR {
    foo : boolean ;
  }
}
