declare namespace ಠ_ಠ.clutz.types {
  var a : number ;
  var b : boolean ;
  var c : string ;
  var d : GlobalObject | null ;
  var e : any [] | null ;
  var f : ( ( ) => string ) [] | null ;
  function fn (f : Function ) : Function | null ;
  var functionAndUnion : null | ( (a : number , b : any ) => any ) ;
  /**
   * marked const to appear in `compiler.getTopScope().getAllSymbols()`
   */
  var inferrednum : number ;
  /**
   * marked const to appear in `compiler.getTopScope().getAllSymbols()`
   */
  var inferredobj : GlobalObject ;
  var j : { [ key: number ]: string } | null ;
  var recordType : { a : string , b : any } ;
  var recordTypeOptional : { a : string , optional ? : string } ;
}
declare module 'goog:types' {
  import alias = ಠ_ಠ.clutz.types;
  export = alias;
}
