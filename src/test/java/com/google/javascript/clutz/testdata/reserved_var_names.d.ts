// Generated from src/test/java/com/google/javascript/clutz/testdata/reserved_var_names.js
declare namespace ಠ_ಠ.clutz.ns {
  let reserved : { a : number , switch : number };
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/reserved_var_names.js
declare module 'goog:ns.reserved.a' {
  import a = ಠ_ಠ.clutz.ns.reserved;
  export default a.a;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/reserved_var_names';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/reserved_var_names' {
  import a = ಠ_ಠ.clutz.ns.reserved;
  export { a };
  const __clutz_strip_property: 'a';
  const __clutz_actual_namespace: 'ns.reserved.a';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/reserved_var_names.js
declare module 'goog:ns.reserved.switch' {
  import switch_ = ಠ_ಠ.clutz.ns.reserved;
  export default switch_.switch;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/reserved_var_names' {
  export {};
  const __clutz_multiple_provides: true;
}
