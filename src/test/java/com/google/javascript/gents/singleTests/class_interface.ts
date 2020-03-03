/**
 * Some non-trivial comments.
 */
export interface IBase {
  a: number;

  method1(): boolean;

  inferredVoidReturn(a: string): void;

  explicitReturn(a: string): string;
}

export interface IExtendsUsingEs6 extends IBase {
  b: number;

  method2(): boolean;
}

export interface RExtendsUsingEs6 extends IBase {
  c: number;
}

interface RecordClass {
  /** The number of attempts before giving up. */
  attempts: number;
  foo: boolean;

  /**
   * Performs the frobnication according to the given strategy.
   */
  frobnicate(strategy: string): boolean;
}
/**
 * Some non-trivial comments.
 */
export interface IExtendsUsingClosure extends IBase {
  method3(): boolean;
}
