declare namespace ಠ_ಠ.clutz.foo.bar {
  class Baz extends GlobalEvent {
    constructor ( ) ;
  }
}
declare module 'goog:foo.bar.Baz' {
  import Baz = ಠ_ಠ.clutz.foo.bar.Baz;
  export default Baz;
}
