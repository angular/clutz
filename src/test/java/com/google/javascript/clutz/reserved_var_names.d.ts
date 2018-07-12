declare namespace ಠ_ಠ.clutz.ns {
  var reserved : { a : number , switch : number };
}
declare module 'goog:ns.reserved.a' {
  import a = ಠ_ಠ.clutz.ns.reserved;
  export default a.a;
}
declare module 'goog:ns.reserved.switch' {
  import switch = ಠ_ಠ.clutz.ns.reserved;
  export default switch.switch;
}
