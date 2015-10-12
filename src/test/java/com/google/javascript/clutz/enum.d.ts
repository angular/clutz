declare namespace ಠ_ಠ.cl2dts_internal.some {
  type SomeEnum = number ;
  var SomeEnum : {
    A : SomeEnum ,
    B : SomeEnum ,
  };
}
declare module 'goog:some.SomeEnum' {
  import alias = ಠ_ಠ.cl2dts_internal.some.SomeEnum;
  export default alias;
}
