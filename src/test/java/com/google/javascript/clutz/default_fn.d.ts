declare namespace ಠ_ಠ.clutz_internal {
  function default_fn ( ) : number ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'default_fn'): typeof ಠ_ಠ.clutz_internal.default_fn;
}
declare module 'goog:default_fn' {
  import alias = ಠ_ಠ.clutz_internal.default_fn;
  export default alias;
}
