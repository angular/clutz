declare namespace ಠ_ಠ.clutz {
  function default_fn ( ) : number ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'default_fn'): typeof ಠ_ಠ.clutz.default_fn;
}
declare module 'goog:default_fn' {
  import alias = ಠ_ಠ.clutz.default_fn;
  export default alias;
}
