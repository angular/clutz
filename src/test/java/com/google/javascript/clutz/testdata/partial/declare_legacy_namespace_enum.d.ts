// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/declare_legacy_namespace_enum.js
declare namespace ಠ_ಠ.clutz.declare.legacy {
  let namespace : { enum : { E : module$contents$declare$legacy$namespace$enum_E } };
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/declare_legacy_namespace_enum.js
declare module 'goog:declare.legacy.namespace.enum' {
  import enum_ = ಠ_ಠ.clutz.declare.legacy.namespace;
  export default enum_.enum;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/declare_legacy_namespace_enum';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/partial/declare_legacy_namespace_enum' {
  import enum_ = ಠ_ಠ.clutz.declare.legacy.namespace;
  export { enum_ as enum };
  const __clutz_strip_property: 'enum';
  const __clutz_actual_namespace: 'declare.legacy.namespace.enum';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/declare_legacy_namespace_enum.js
declare namespace ಠ_ಠ.clutz {
  enum module$contents$declare$legacy$namespace$enum_E {
    A = 1.0 ,
    B = 2.0 ,
    C = 3.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/partial/declare_legacy_namespace_enum.js
declare namespace ಠ_ಠ.clutz.module$exports$declare$legacy$namespace$enum {
  export import E = ಠ_ಠ.clutz.module$contents$declare$legacy$namespace$enum_E ;
}
