interface Interface {
  bar(a: string): number;
}
export interface Interface2 {
  bar(a: string): number;
}

export interface Interface3 extends Interface2 {
  baz(a: string): number;
}

class X implements Interface2 {
  bar(a: string): number {
    return 1;
  }
}

class Y implements Interface2, Interface3 {
  bar(a: string): number {
    return 1;
  }
  baz(a: string): number {
    return 1;
  }
}

export interface StructuralInterface {
  bar(a: string): number;
}

const structInterfaceImpl: StructuralInterface = {
  bar: function(a: string): number {
    return 1;
  }
};

interface Item<T> {}
interface EmptyGenericRecord<U> {}
interface List<T> extends Item<T>, EmptyGenericRecord<T> {
  push(obj: T): void;

  /**
   * `List` usage to make TS checks happy
   */
  self(): List<T>;
}

/**
 * In Closure, extends and implements clauses have optional braces.
 */
export interface NoBraceExtends extends Interface2,
                                        EmptyGenericRecord<number> {}
