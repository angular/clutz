declare namespace ಠ_ಠ.clutz_internal.a.b {
  class StaticHolder {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz_internal.a.b.StaticHolder {
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'a.b.StaticHolder'): typeof ಠ_ಠ.clutz_internal.a.b.StaticHolder;
}
declare module 'goog:a.b.StaticHolder' {
  import alias = ಠ_ಠ.clutz_internal.a.b.StaticHolder;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.a.b.StaticHolder {
  type AnEnum = number ;
  var AnEnum : {
    X : AnEnum ,
    Y : AnEnum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'a.b.StaticHolder.AnEnum'): typeof ಠ_ಠ.clutz_internal.a.b.StaticHolder.AnEnum;
}
declare module 'goog:a.b.StaticHolder.AnEnum' {
  import alias = ಠ_ಠ.clutz_internal.a.b.StaticHolder.AnEnum;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.a.b.StaticHolder {
  function aFunction ( ) : boolean ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'a.b.StaticHolder.aFunction'): typeof ಠ_ಠ.clutz_internal.a.b.StaticHolder.aFunction;
}
declare module 'goog:a.b.StaticHolder.aFunction' {
  import alias = ಠ_ಠ.clutz_internal.a.b.StaticHolder.aFunction;
  export default alias;
}
