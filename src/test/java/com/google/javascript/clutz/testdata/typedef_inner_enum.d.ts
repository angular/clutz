// Generated from src/test/java/com/google/javascript/clutz/testdata/typedef_inner_enum.js
declare namespace ಠ_ಠ.clutz.ns {
  type typedef = { foo : ಠ_ಠ.clutz.ns.typedef.E } ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/typedef_inner_enum.js
declare namespace ಠ_ಠ.clutz.ns.typedef {
  enum E {
    Foo = '+' ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/typedef_inner_enum.js
declare module 'goog:ns.typedef' {
  import typedef = ಠ_ಠ.clutz.ns.typedef;
  export default typedef;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/typedef_inner_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/typedef_inner_enum' {
  import typedef = ಠ_ಠ.clutz.ns.typedef;
  export { typedef };
  const __clutz_strip_property: 'typedef';
  const __clutz_actual_namespace: 'ns.typedef';
}
