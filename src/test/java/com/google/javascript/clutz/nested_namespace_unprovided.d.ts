declare namespace ಠ_ಠ.clutz.some.ns {
  var inner : { A : number , B : number } ;
}
declare module 'goog:some.ns' {
  import alias = ಠ_ಠ.clutz.some.ns;
  export = alias;
}
