// Generated from src/test/java/com/google/javascript/clutz/testdata/static_provided.js
declare namespace ಠ_ಠ.clutz.a.b {
  class StaticHolder {
    private noStructuralTyping_a_b_StaticHolder : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_provided.js
declare module 'goog:a.b.StaticHolder' {
  import StaticHolder = ಠ_ಠ.clutz.a.b.StaticHolder;
  export default StaticHolder;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/static_provided';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/static_provided' {
  import StaticHolder = ಠ_ಠ.clutz.a.b.StaticHolder;
  export { StaticHolder };
  const __clutz_strip_property: 'StaticHolder';
  const __clutz_actual_namespace: 'a.b.StaticHolder';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_provided.js
declare namespace ಠ_ಠ.clutz.a.b.StaticHolder {
  enum AnEnum {
    X = 0.0 ,
    Y = 1.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_provided.js
declare module 'goog:a.b.StaticHolder.AnEnum' {
  import AnEnum = ಠ_ಠ.clutz.a.b.StaticHolder.AnEnum;
  export default AnEnum;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_provided.js
declare namespace ಠ_ಠ.clutz.a.b.StaticHolder {
  function aFunction ( ) : boolean ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/static_provided.js
declare module 'goog:a.b.StaticHolder.aFunction' {
  import aFunction = ಠ_ಠ.clutz.a.b.StaticHolder.aFunction;
  export default aFunction;
}
