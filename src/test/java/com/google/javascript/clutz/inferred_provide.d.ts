declare namespace ಠ_ಠ.clutz {
  function module$exports$inferred$fn ( ) : void ;
  var module$exports$inferred$foo : number ;
}
declare namespace ಠ_ಠ.clutz.module$exports$inferred {
  export import fn = ಠ_ಠ.clutz.module$exports$inferred$fn;
}
declare namespace ಠ_ಠ.clutz.module$exports$inferred {
  export import foo = ಠ_ಠ.clutz.module$exports$inferred$foo;
}
declare module 'goog:inferred' {
  import alias = ಠ_ಠ.clutz.module$exports$inferred;
  export = alias;
}
