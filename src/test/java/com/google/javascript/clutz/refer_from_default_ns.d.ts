declare namespace ಠ_ಠ.clutz {
  function fn ( ) : ಠ_ಠ.clutz.fn.String ;
}
declare namespace goog {
  function require(name: 'fn'): typeof ಠ_ಠ.clutz.fn;
}
declare module 'goog:fn' {
  import alias = ಠ_ಠ.clutz.fn;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.fn {
  class String extends String_Instance {
  }
  class String_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'fn.String'): typeof ಠ_ಠ.clutz.fn.String;
}
declare module 'goog:fn.String' {
  import alias = ಠ_ಠ.clutz.fn.String;
  export default alias;
}
