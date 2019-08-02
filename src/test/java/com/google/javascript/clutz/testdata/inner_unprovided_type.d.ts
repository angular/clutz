declare namespace ಠ_ಠ.clutz.ns {
  /**
   * Using the inner typedef to make sure that two different passes don't
   * emit it.
   */
  function f ( ) : ಠ_ಠ.clutz.ns.f.Inner ;
}
declare namespace ಠ_ಠ.clutz.ns.f {
  type Inner = { a : number } ;
}
declare module 'goog:ns' {
  import ns = ಠ_ಠ.clutz.ns;
  export = ns;
}
