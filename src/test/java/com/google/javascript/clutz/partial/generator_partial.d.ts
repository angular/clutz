declare namespace ಠ_ಠ.clutz.module$exports$generators {
  //!! AFAIKT, closure just infers ? and we faithfully translate that to 'any'.
  function inferredG ( ) : any ;
  function templateG < T = any > (iter : Iterator < T > ) : IterableIterator < T > ;
  function typedG ( ) : IterableIterator < number > ;
}
declare module 'goog:generators' {
  import alias = ಠ_ಠ.clutz.module$exports$generators;
  export = alias;
}
