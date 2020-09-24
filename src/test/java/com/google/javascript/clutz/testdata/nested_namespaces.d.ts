// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare namespace ಠ_ಠ.clutz.nested {
  enum NotNested {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare module 'goog:nested.NotNested' {
  import NotNested = ಠ_ಠ.clutz.nested.NotNested;
  export default NotNested;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces' {
  import NotNested = ಠ_ಠ.clutz.nested.NotNested;
  export { NotNested };
  const __clutz_strip_property: 'NotNested';
  const __clutz_actual_namespace: 'nested.NotNested';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare namespace ಠ_ಠ.clutz.nested {
  enum NotNestedEither {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare module 'goog:nested.NotNestedEither' {
  import NotNestedEither = ಠ_ಠ.clutz.nested.NotNestedEither;
  export default NotNestedEither;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare namespace ಠ_ಠ.clutz.nested {
  class PrivateC {
    private noStructuralTyping_nested_PrivateC : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare module 'goog:nested.PrivateC' {
  import PrivateC = ಠ_ಠ.clutz.nested.PrivateC;
  export default PrivateC;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare namespace ಠ_ಠ.clutz.nested.PrivateC {
  enum Enum {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare module 'goog:nested.PrivateC.Enum' {
  import Enum = ಠ_ಠ.clutz.nested.PrivateC.Enum;
  export default Enum;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare namespace ಠ_ಠ.clutz.nested {
  let foo__clutz_alias : ಠ_ಠ.clutz.nested.PrivateC ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare module 'goog:nested.foo' {
  import foo = ಠ_ಠ.clutz.nested.foo__clutz_alias;
  export default foo;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare namespace ಠ_ಠ.clutz.nested.foo {
  class Klass {
    private noStructuralTyping_nested_foo_Klass : any;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_namespaces.js
declare module 'goog:nested.foo.Klass' {
  import Klass = ಠ_ಠ.clutz.nested.foo.Klass;
  export default Klass;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_namespaces' {
  export {};
  const __clutz_multiple_provides: true;
}
