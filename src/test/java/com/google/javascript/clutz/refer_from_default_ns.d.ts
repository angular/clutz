declare namespace ಠ_ಠ.clutz {
  function fn ( ) : ಠ_ಠ.clutz.fn.String ;
}
declare module 'goog:fn' {
  import fn = ಠ_ಠ.clutz.fn;
  export default fn;
}
declare namespace ಠ_ಠ.clutz.fn {
  class String {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:fn.String' {
  import String = ಠ_ಠ.clutz.fn.String;
  export default String;
}
