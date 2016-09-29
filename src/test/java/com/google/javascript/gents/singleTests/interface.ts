interface Interface {
  bar(a: string): number;
}
export interface Interface2 { bar(a: string): number; }

export interface Interface3 extends Interface2 { baz(a: string): number; }

class X implements Interface2 {}

class Y implements Interface2, Interface3 {}
