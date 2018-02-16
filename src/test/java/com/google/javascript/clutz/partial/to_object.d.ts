declare namespace ಠ_ಠ.clutz.goog.array {
  /**
   * Creates a new object built from the provided array and the key-generation
   * function.
   * @param arr Array or array like object over which to iterate whose elements will be the values in the new object.
   * @param keyFunc The function to call for every element. This function takes 3 arguments (the element, the index and the array) and should return a string that will be used as the key for the element in the new object. If the function returns the same key for more than one element, the value for that key is implementation-defined.
   * @param opt_obj The object to be used as the value of 'this' within keyFunc.
   */
  function toObject < T = any , S = any > (arr : ArrayLike < T > | null , keyFunc : ( (a : T , b : number , c : any ) => string ) | null , opt_obj ? : S ) : { [ /* warning: coerced from ? */ key: string ]: T } ;
}
declare module 'goog:goog.array.toObject' {
  import alias = ಠ_ಠ.clutz.goog.array.toObject;
  export default alias;
}
