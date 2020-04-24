
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
