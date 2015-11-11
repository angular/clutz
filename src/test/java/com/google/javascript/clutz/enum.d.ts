declare namespace ಠ_ಠ.clutz.some {
  type SomeEnum = number ;
  var SomeEnum : {
    A : SomeEnum ,
    B : SomeEnum ,
  };
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'some.SomeEnum'): typeof ಠ_ಠ.clutz.some.SomeEnum;
}
declare module 'goog:some.SomeEnum' {
  import alias = ಠ_ಠ.clutz.some.SomeEnum;
  export default alias;
}
