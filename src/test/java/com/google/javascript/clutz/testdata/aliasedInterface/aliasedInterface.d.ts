// Generated from src/test/java/com/google/javascript/clutz/testdata/aliasedInterface/alias_for_interface.js
declare namespace ಠ_ಠ.clutz {
  export import module$exports$alias_for_interface = ಠ_ಠ.clutz.module$exports$aliased_interface ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliasedInterface/alias_for_interface.js
declare module 'goog:alias_for_interface' {
  import alias_for_interface = ಠ_ಠ.clutz.module$exports$alias_for_interface;
  export default alias_for_interface;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliasedInterface/aliased_interface_with_static.js
declare namespace ಠ_ಠ.clutz {
  namespace module$exports$aliased_interface {
    function staticMethod ( ) : string ;
  }
  interface module$exports$aliased_interface {
    x : string ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliasedInterface/aliased_interface_with_static.js
declare module 'goog:aliased_interface' {
  import aliased_interface = ಠ_ಠ.clutz.module$exports$aliased_interface;
  export default aliased_interface;
}
