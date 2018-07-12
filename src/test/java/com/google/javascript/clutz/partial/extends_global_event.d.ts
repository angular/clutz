declare namespace ಠ_ಠ.clutz.foo.bar {
  class Baz extends Baz_Instance {
  }
  //!! GlobalEvent isn't a closure type, so it doesn't have an _Instance half
  class Baz_Instance extends GlobalEvent {
    constructor ( ) ;
  }
}
declare module 'goog:foo.bar.Baz' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export default Baz;
}
