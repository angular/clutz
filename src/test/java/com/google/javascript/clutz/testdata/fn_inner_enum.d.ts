// Generated from src/test/java/com/google/javascript/clutz/testdata/fn_inner_enum.js
declare namespace ಠ_ಠ.clutz.ns {
  function foo ( ) : boolean ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/fn_inner_enum.js
declare namespace ಠ_ಠ.clutz.ns.foo {
  enum Enum {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/fn_inner_enum.js
declare module 'goog:ns.foo' {
  import foo = ಠ_ಠ.clutz.ns.foo;
  export default foo;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/fn_inner_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/fn_inner_enum' {
  import foo = ಠ_ಠ.clutz.ns.foo;
  export { foo };
  const __clutz_strip_property: 'foo';
  const __clutz_actual_namespace: 'ns.foo';
}
