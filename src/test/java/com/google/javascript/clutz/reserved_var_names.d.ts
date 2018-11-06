declare namespace ಠ_ಠ.clutz.ns {
  let reserved : { a : number , switch : number };
}
declare module 'goog:ns.reserved.a' {
  import a = ಠ_ಠ.clutz.ns.reserved;
  export default a.a;
}
declare module 'goog:ns.reserved.switch' {
  import switch_ = ಠ_ಠ.clutz.ns.reserved;
  export default switch_.switch;
}
