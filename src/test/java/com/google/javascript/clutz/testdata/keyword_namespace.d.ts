// Generated from src/test/java/com/google/javascript/clutz/testdata/keyword_namespace.js
declare namespace ಠ_ಠ.clutz.keyword {
  export {delete_ as delete};
}
declare namespace ಠ_ಠ.clutz.keyword.delete_.namespace {
  class SomeClass {
    private noStructuralTyping_keyword_delete_namespace_SomeClass : any;
    hasKeywordNamespace ( ) : string ;
  }
  let someConstant : ಠ_ಠ.clutz.keyword.delete.namespace.SomeClass ;
}
declare module 'goog:keyword.delete.namespace' {
  import namespace = ಠ_ಠ.clutz.keyword.delete_.namespace;
  export = namespace;
}
