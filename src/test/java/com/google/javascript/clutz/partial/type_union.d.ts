declare namespace ಠ_ಠ.clutz {
  function func (a : Foo | Bar ) : void ;
}
declare module 'goog:func' {
  import alias = ಠ_ಠ.clutz.func;
  export default alias;
}
