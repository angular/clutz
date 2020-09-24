// Generated from src/test/java/com/google/javascript/clutz/testdata/privates.js
declare namespace ಠ_ಠ.clutz.priv {
  class PrivateClazz {
    private noStructuralTyping_priv_PrivateClazz : any;
  }
  class PublicClass {
    private noStructuralTyping_priv_PublicClass : any;
    publicField : number ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/privates.js
declare module 'goog:priv' {
  import priv = ಠ_ಠ.clutz.priv;
  export = priv;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/privates';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/privates' {
  import priv = ಠ_ಠ.clutz.priv;
  export = priv;
  const __clutz_actual_namespace: 'priv';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/privates.js
declare namespace ಠ_ಠ.clutz.priv2 {
  class PublicClass {
    private noStructuralTyping_priv2_PublicClass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/privates.js
declare namespace ಠ_ಠ.clutz.priv2.PublicClass {
  class PrivateNestedClass_ {
    private noStructuralTyping_priv2_PublicClass_PrivateNestedClass_ : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/privates.js
declare module 'goog:priv2.PublicClass' {
  import PublicClass = ಠ_ಠ.clutz.priv2.PublicClass;
  export default PublicClass;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/privates' {
  export {};
  const __clutz_multiple_provides: true;
}
