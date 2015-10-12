declare namespace ಠ_ಠ.cl2dts_internal.multi_provides.a {
  var val : number ;
}
declare module 'goog:multi_provides.a' {
  import alias = ಠ_ಠ.cl2dts_internal.multi_provides.a;
  export = alias;
}
declare namespace ಠ_ಠ.cl2dts_internal.multi_provides.a.b.c {
  var three : string ;
}
declare module 'goog:multi_provides.a.b.c' {
  import alias = ಠ_ಠ.cl2dts_internal.multi_provides.a.b.c;
  export = alias;
}
declare namespace ಠ_ಠ.cl2dts_internal.multi_provides.a.b.c {
  class Two {
  }
}
declare module 'goog:multi_provides.a.b.c.Two' {
  import alias = ಠ_ಠ.cl2dts_internal.multi_provides.a.b.c.Two;
  export default alias;
}
