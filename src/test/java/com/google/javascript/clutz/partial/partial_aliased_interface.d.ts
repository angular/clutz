declare namespace ಠ_ಠ.clutz {
  namespace module$exports$partial$aliased_interface {
    function staticMethod ( ) : string ;
  }
  interface module$exports$partial$aliased_interface {
    x : string ;
  }
}
declare module 'goog:partial.aliased_interface' {
  import alias = ಠ_ಠ.clutz.module$exports$partial$aliased_interface;
  export default alias;
}
