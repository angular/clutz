declare namespace ಠ_ಠ.clutz {
  interface module$exports$namespace$I {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$namespace {
  export import I =  ಠ_ಠ.clutz.module$exports$namespace$I;
}
declare namespace ಠ_ಠ.clutz.module$exports$namespace$I {
  interface InnerR {
    foo : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$namespace.I {
  export import InnerR =  ಠ_ಠ.clutz.module$exports$namespace$I.InnerR;
}
declare module 'goog:namespace.I' {
  import alias = ಠ_ಠ.clutz.module$exports$namespace$I;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$namespace$R {
    foo : boolean ;
    optionalFoo ? : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$namespace {
  export import R =  ಠ_ಠ.clutz.module$exports$namespace$R;
}
declare module 'goog:namespace.R' {
  import alias = ಠ_ಠ.clutz.module$exports$namespace$R;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$externR {
    foo : boolean ;
  }
}
