declare namespace ಠ_ಠ.cl2dts_internal.types {
  var a : number ;
  var b : boolean ;
  var c : string ;
  var d : Object ;
  var e : any [] ;
  var functionAndUnion : (a : number , b : any ) => any ;
  var inferrednum : number ;
  var inferredobj : Object ;
  var j : { [ n: number ]: string } ;
  var recordType : { a : string , b : any } ;
}
declare module 'goog:types' {
  import alias = ಠ_ಠ.cl2dts_internal.types;
  export = alias;
}
