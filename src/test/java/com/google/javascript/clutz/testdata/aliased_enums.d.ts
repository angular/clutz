declare namespace ಠ_ಠ.clutz.nested.bar {
  type HahaEnum = nested.baz.Enum ;
  let HahaEnum : typeof nested.baz.Enum ;
}
declare module 'goog:nested.bar.HahaEnum' {
  import HahaEnum = ಠ_ಠ.clutz.nested.bar.HahaEnum;
  export default HahaEnum;
}
declare namespace ಠ_ಠ.clutz.nested.baz {
  enum Enum {
    A = 5.0 ,
  }
}
declare module 'goog:nested.baz.Enum' {
  import Enum = ಠ_ಠ.clutz.nested.baz.Enum;
  export default Enum;
}
