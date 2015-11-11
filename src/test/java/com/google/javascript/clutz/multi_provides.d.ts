declare namespace ಠ_ಠ.clutz.multi_provides.a {
  var val : number ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'multi_provides.a'): typeof ಠ_ಠ.clutz.multi_provides.a;
}
declare module 'goog:multi_provides.a' {
  import alias = ಠ_ಠ.clutz.multi_provides.a;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  var three : string ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'multi_provides.a.b.c'): typeof ಠ_ಠ.clutz.multi_provides.a.b.c;
}
declare module 'goog:multi_provides.a.b.c' {
  import alias = ಠ_ಠ.clutz.multi_provides.a.b.c;
  export = alias;
}
declare namespace ಠ_ಠ.clutz.multi_provides.a.b.c {
  class Two {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'multi_provides.a.b.c.Two'): typeof ಠ_ಠ.clutz.multi_provides.a.b.c.Two;
}
declare module 'goog:multi_provides.a.b.c.Two' {
  import alias = ಠ_ಠ.clutz.multi_provides.a.b.c.Two;
  export default alias;
}
