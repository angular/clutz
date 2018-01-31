declare namespace ಠ_ಠ.clutz {
  function func (a : ಠ_ಠ.clutz.Foo | ಠ_ಠ.clutz.Bar ) : void ;
}
declare module 'goog:func' {
  import alias = ಠ_ಠ.clutz.func;
  export default alias;
}
