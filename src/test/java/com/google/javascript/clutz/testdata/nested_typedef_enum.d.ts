// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_enum.js
declare namespace ಠ_ಠ.clutz.nested_typedef_enum {
  type Bar = { a : string } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_enum.js
declare module 'goog:nested_typedef_enum.Bar' {
  import Bar = ಠ_ಠ.clutz.nested_typedef_enum.Bar;
  export default Bar;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_typedef_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/nested_typedef_enum' {
  import Bar = ಠ_ಠ.clutz.nested_typedef_enum.Bar;
  export { Bar };
  const __clutz_strip_property: 'Bar';
  const __clutz_actual_namespace: 'nested_typedef_enum.Bar';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_enum.js
declare namespace ಠ_ಠ.clutz.nested_typedef_enum.Bar {
  enum Baz {
    A = 1.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/nested_typedef_enum.js
declare module 'goog:nested_typedef_enum.Bar.Baz' {
  import Baz = ಠ_ಠ.clutz.nested_typedef_enum.Bar.Baz;
  export default Baz;
}
