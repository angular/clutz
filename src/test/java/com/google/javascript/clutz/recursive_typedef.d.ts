declare namespace ಠ_ಠ.clutz.rec.ns {
  //!! It would be preferable to have type Arr = El [] here
  //!! But that requires a preprocessing step, or evern better
  //!! access to Closures' typeRegistry private namesToTypes map.
  type Arr = { arr : rec.ns.Arr } [] ;
  type El = { arr : rec.ns.Arr } ;
  type T = { t : any } ;
  var foo : rec.ns.Arr ;
  var foo2 : rec.ns.El ;
  var tvar : rec.ns.T ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'rec.ns'): typeof ಠ_ಠ.clutz.rec.ns;
}
declare module 'goog:rec.ns' {
  import alias = ಠ_ಠ.clutz.rec.ns;
  export = alias;
}
