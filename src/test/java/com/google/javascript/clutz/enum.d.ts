declare namespace ಠ_ಠ.clutz_internal.some {
  type SomeEnum = number ;
  var SomeEnum : {
    A : SomeEnum ,
    B : SomeEnum ,
  };
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'some.SomeEnum'): typeof ಠ_ಠ.clutz_internal.some.SomeEnum;
}
declare module 'goog:some.SomeEnum' {
  import alias = ಠ_ಠ.clutz_internal.some.SomeEnum;
  export default alias;
}
