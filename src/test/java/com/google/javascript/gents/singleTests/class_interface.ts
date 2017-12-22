
/**
 * Some non-trivial comments.
 */
//!! Missing field declared in the ctor.
export interface IBase { method1(): boolean; }

export interface IExtendsUsingEs6 extends IBase {
  b: number;

  method2(): boolean;
}

export interface RExtendsUsingEs6 extends IBase { c: number; }

/**
 * Some non-trivial comments.
 */
export interface IExtendsUsingClosure extends IBase { method3(): boolean; }
