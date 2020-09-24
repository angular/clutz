// Generated from src/test/java/com/google/javascript/clutz/testdata/record.js
declare namespace ಠ_ಠ.clutz.namespace {
  interface I {
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/record.js
declare namespace ಠ_ಠ.clutz.namespace.I {
  interface InnerR {
    foo : boolean ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/record.js
declare module 'goog:namespace.I' {
  import I = ಠ_ಠ.clutz.namespace.I;
  export default I;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/record';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/record' {
  import I = ಠ_ಠ.clutz.namespace.I;
  export { I };
  const __clutz_strip_property: 'I';
  const __clutz_actual_namespace: 'namespace.I';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/record.js
declare namespace ಠ_ಠ.clutz.namespace {
  interface R {
    foo : boolean ;
    optionalFoo ? : boolean ;
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/record.js
declare module 'goog:namespace.R' {
  import R = ಠ_ಠ.clutz.namespace.R;
  export default R;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/record' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/record.externs.js
declare namespace ಠ_ಠ.clutz {
  interface externR {
    foo : boolean ;
  }
}
