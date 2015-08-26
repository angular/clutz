declare namespace ಠ_ಠ.cl2dts_internal.types {
  var a : number ;
  var b : boolean ;
  var c : string ;
  var d : Object ;
  var e : any [] ;
  class Foo < T > {
    get ( ) : T ;
    loop < V , W > (a : T , b : V ) : any ;
    set (a : T ) : void ;
  }
  var f : Foo < string > ;
  var g : (a : number , b : any ) => any ;
  var h : { a : string , b : any } ;
  function identity < T > (a : T ) : T ;
}
declare module 'goog:types' {
  import alias = ಠ_ಠ.cl2dts_internal.types;
  export = alias;
}
