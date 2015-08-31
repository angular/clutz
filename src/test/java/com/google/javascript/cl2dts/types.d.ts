declare namespace ಠ_ಠ.cl2dts_internal.types {
  var a : number ;
  var b : boolean ;
  var c : string ;
  var d : Object ;
  var e : any [] ;
  var arrayMissingTypeParam : any [] ;
  var functionAndUnion : (a : number , b : any ) => any ;
  var recordType : { a : string , b : any } ;
  function genericFunction < T > (a : T ) : T ;
  var j : { [ n: number ]: string } ;
  function objectWithGenericKeyType < K , V > (obj : { [ /* warning: coerced from K */ s: string ]: V } ) : void ;
}
declare module 'goog:types' {
  import alias = ಠ_ಠ.cl2dts_internal.types;
  export = alias;
}
