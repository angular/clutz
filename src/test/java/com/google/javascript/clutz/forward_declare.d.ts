declare namespace ಠ_ಠ.cl2dts_internal.forward {
  class A {
    //!! forward.D may or may not be part of the compilation unit.
    //!! If it is part of it might be a generic at which point TS will error
    //!! if we output just forward.D, so we output any to be on the safe side.
    fn (a : any ) : any ;
  }
}
declare module 'goog:forward.A' {
  import alias = ಠ_ಠ.cl2dts_internal.forward.A;
  export default alias;
}
