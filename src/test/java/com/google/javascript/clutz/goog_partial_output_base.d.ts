declare namespace goog {
  function inherits (childCtor : ಠ_ಠ.clutz.partial.FunctionAlias , parentCtor : ಠ_ಠ.clutz.partial.FunctionAlias ) : void ;
  function isDef (val : any ) : boolean ;
  /**
   * Like goog.bind(), except that a 'this object' is not required. Useful when
   * the target function is already bound.
   *
   * Usage:
   * var g = goog.partial(f, arg1, arg2);
   * g(arg3, arg4);
   * @param fn A function to partially apply.
   * @param var_args Additional arguments that are partially applied to fn.
   */
  function partial (fn : ಠ_ಠ.clutz.partial.FunctionAlias | null ,  ...var_args : any [] ) : ಠ_ಠ.clutz.partial.FunctionAlias ;
  function require (name : string ) : ಠ_ಠ.clutz.ClosureSymbolNotGoogProvided;
}
declare namespace ಠ_ಠ.clutz.goog {
  class Uri extends Uri_Instance {
  }
  class Uri_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:goog.Uri' {
  import alias = ಠ_ಠ.clutz.goog.Uri;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.partial {
  type FunctionAlias = Function ;
}
declare module 'goog:partial.FunctionAlias' {
  import alias = ಠ_ಠ.clutz.partial.FunctionAlias;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.partial {
  function one_arg ( ...a : any [] ) : any ;
}
declare module 'goog:partial.one_arg' {
  import alias = ಠ_ಠ.clutz.partial.one_arg;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.partial {
  function two_args ( ...a : any [] ) : any ;
}
declare module 'goog:partial.two_args' {
  import alias = ಠ_ಠ.clutz.partial.two_args;
  export default alias;
}
