declare namespace ಠ_ಠ.clutz {
  type module$exports$alias_for_interface = ಠ_ಠ.clutz.module$exports$aliased_interface ;
  let module$exports$alias_for_interface : typeof ಠ_ಠ.clutz.module$exports$aliased_interface ;
}
declare module 'goog:alias_for_interface' {
  import alias_for_interface = ಠ_ಠ.clutz.module$exports$alias_for_interface;
  export default alias_for_interface;
}
declare namespace ಠ_ಠ.clutz {
  namespace module$exports$aliased_interface {
    function staticMethod ( ) : string ;
  }
  interface module$exports$aliased_interface {
    x : string ;
  }
}
declare module 'goog:aliased_interface' {
  import aliased_interface = ಠ_ಠ.clutz.module$exports$aliased_interface;
  export default aliased_interface;
}
