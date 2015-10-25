declare namespace ಠ_ಠ.clutz_internal {
  function fn ( ) : fn.String ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'fn'): typeof ಠ_ಠ.clutz_internal.fn;
}
declare module 'goog:fn' {
  import alias = ಠ_ಠ.clutz_internal.fn;
  export default alias;
}
declare namespace ಠ_ಠ.clutz_internal.fn {
  class String {
  }
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'fn.String'): typeof ಠ_ಠ.clutz_internal.fn.String;
}
declare module 'goog:fn.String' {
  import alias = ಠ_ಠ.clutz_internal.fn.String;
  export default alias;
}
