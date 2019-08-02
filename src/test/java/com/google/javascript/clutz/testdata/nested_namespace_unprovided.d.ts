declare namespace ಠ_ಠ.clutz.some.ns {
  let inner : { A : number , B : number } ;
}
declare module 'goog:some.ns' {
  import ns = ಠ_ಠ.clutz.some.ns;
  export = ns;
}
