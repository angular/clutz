declare namespace ಠ_ಠ.cl2dts_internal.types {
  var a : number ;
  var b : boolean ;
  var c : string ;
  var d : Object ;
  var e : any [] ;
  var functionAndUnion : (a : number , b : any ) => any ;
  var recordType : { a : string , b : any } ;
  var j : { [ n: number ]: string } ;
  var inferredobj : Object ;
  var inferrednum : number ;
}
declare module 'goog:types' {
  import alias = ಠ_ಠ.cl2dts_internal.types;
  export = alias;
}
