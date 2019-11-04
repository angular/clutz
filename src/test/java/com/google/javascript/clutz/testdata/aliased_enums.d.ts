// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare namespace ಠ_ಠ.clutz.nested.bar {
  export import HahaEnum = nested.baz.Enum ;
}
// Generated from src/test/java/com/google/javascript/clutz/testdata/aliased_enums.js
declare module 'goog:nested.bar.HahaEnum' {
  import HahaEnum = ಠ_ಠ.clutz.nested.bar.HahaEnum;
  export default HahaEnum;
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
