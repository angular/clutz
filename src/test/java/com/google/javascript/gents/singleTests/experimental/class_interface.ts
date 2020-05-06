// This file contains a mix of different ways of declaring an interface with
// methods and properties in Closure. The only commonality is that the user
// meant to write an interface, and attached it to an ES6 class out of
// convenience.
// Fields and methods are declared in three different ways:
// - in the ctor body
// - class body
// - using the prototype chain.
// Extending mechanism is both ES6 'class extends', and closure @extends.

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
  readonly b: number;

  method2(): boolean;
}

export interface RExtendsUsingEs6 extends IBase {
  readonly c: number;
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
