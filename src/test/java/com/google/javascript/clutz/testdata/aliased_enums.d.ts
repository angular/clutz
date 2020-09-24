// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare namespace ಠ_ಠ.clutz.nested.bar {
  export import ConstAliasEnum = nested.baz.Enum ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare module 'goog:nested.bar.ConstAliasEnum' {
  import ConstAliasEnum = ಠ_ಠ.clutz.nested.bar.ConstAliasEnum;
  export default ConstAliasEnum;
  const __clutz_actual_path: 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/aliased_enums';
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/aliased_enums' {
  import ConstAliasEnum = ಠ_ಠ.clutz.nested.bar.ConstAliasEnum;
  export { ConstAliasEnum };
  const __clutz_strip_property: 'ConstAliasEnum';
  const __clutz_actual_namespace: 'nested.bar.ConstAliasEnum';
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare namespace ಠ_ಠ.clutz.nested.bar {
  export import HahaEnum = nested.baz.Enum ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare module 'goog:nested.bar.HahaEnum' {
  import HahaEnum = ಠ_ಠ.clutz.nested.bar.HahaEnum;
  export default HahaEnum;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/aliased_enums' {
  export {};
  const __clutz_multiple_provides: true;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare namespace ಠ_ಠ.clutz.nested.baz {
  enum Enum {
    A = 5.0 ,
  }
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare module 'goog:nested.baz.Enum' {
  import Enum = ಠ_ಠ.clutz.nested.baz.Enum;
  export default Enum;
}
declare module 'google3/third_party/java_src/clutz/src/test/java/com/google/javascript/clutz/testdata/aliased_enums' {
  export {};
  const __clutz_multiple_provides: true;
}
