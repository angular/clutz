declare namespace ಠ_ಠ.clutz.types {
  let a : number ;
  let b : boolean ;
  let c : string ;
  let d : GlobalObject | null ;
  let e : any [] | null ;
  let f : ( ( ) => string ) [] | null ;
  function fn (f : Function ) : Function | null ;
  let functionAndUnion : null | ( (a : number , b : any ) => any ) ;
  /**
   * marked const to appear in `compiler.getTopScope().getAllSymbols()`
   */
  let inferrednum : number ;
  /**
   * marked const to appear in `compiler.getTopScope().getAllSymbols()`
   */
  let inferredobj : { } ;
  let j : { [ key: number ]: string } | null ;
  let recordType : { a : string , b : any } ;
  let recordTypeOptional : { a : string , optional ? : string } ;
}
declare module 'goog:types' {
  import types = ಠ_ಠ.clutz.types;
  export = types;
}
