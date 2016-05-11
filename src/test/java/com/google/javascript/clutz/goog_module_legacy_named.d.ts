declare namespace ಠ_ಠ.clutz.module.legacy.named {
  function f (a : number ) : void ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'module.legacy.named'): typeof ಠ_ಠ.clutz.module.legacy.named;
}
declare module 'goog:module.legacy.named' {
  import alias = ಠ_ಠ.clutz.module.legacy.named;
  export = alias;
}
