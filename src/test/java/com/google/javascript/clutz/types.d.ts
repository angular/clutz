declare namespace ಠ_ಠ.clutz_internal.types {
  var a : number ;
  var b : boolean ;
  var c : string ;
  var d : Object ;
  var e : any [] ;
  var f : ( ( ) => string ) [] ;
  var functionAndUnion : (a : number , b : any ) => any ;
  /**
   * marked const to appear in `compiler.getTopScope().getAllSymbols()`
   */
  var inferrednum : number ;
  /**
   * marked const to appear in `compiler.getTopScope().getAllSymbols()`
   */
  var inferredobj : Object ;
  var j : { [ n: number ]: string } ;
  var recordType : { a : string , b : any } ;
}
declare namespace ಠ_ಠ.clutz_internal.goog {
  function require(name: 'types'): typeof ಠ_ಠ.clutz_internal.types;
}
declare module 'goog:types' {
  import alias = ಠ_ಠ.clutz_internal.types;
  export = alias;
}
